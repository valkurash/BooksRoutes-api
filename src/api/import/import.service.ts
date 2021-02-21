import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../book/entities/book.entity';
import { Repository } from 'typeorm';
import { RouteEntity } from '../route/entities/route.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DOMParser = require('xmldom').DOMParser;
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as kmlParse from 'kml-parse';
import { PointEntity } from '../route/entities/point.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeEntityRepository: Repository<RouteEntity>,
  ) {}
  public async importKml(mid: string) {
    const result = await this.fetchKml(mid);
    console.log(result);
    const routes = [];
    result.folders.forEach(folder => {
      const route = new RouteEntity();
      route.book = new BookEntity();
      route.book.id = 88;
      route.name = folder.name;
      const featuresInRoute = result.geoJSON.features.filter(
        feature => feature.properties.folder === folder.key,
      );

      route.points = featuresInRoute.map((featureInRoute, index) => {
        const pointEntity = new PointEntity();
        pointEntity.name = featureInRoute.properties.name;
        pointEntity.order = index;
        pointEntity.description = featureInRoute.properties.description;
        pointEntity.shape = featureInRoute.geometry;
        return pointEntity;
      });

      routes.push(route);
    });
    await this.routeEntityRepository.save(routes);
    return result;
  }

  private async fetchKml(mid: string) {
    return fetch(`https://www.google.com/maps/d/u/0/kml?mid=${mid}&forcekml=1`)
      .then(res => res.text())
      .then(body => {
        const kml = new DOMParser().parseFromString(body, 'application/xml');
        const converted = kmlParse.parse(kml);
        return converted;
      })
      .catch(err => {
        throw err;
      });
  }
}
