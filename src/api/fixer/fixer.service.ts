import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../book/entities/book.entity';
import { Repository } from 'typeorm';
import { ImageEntity } from '../image/entities/image.entity';
import { UserPayload } from '../auth/dto/jwtUserPayload.dto';
import * as http from 'http2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FormData = require('form-data');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var request = require('request');
import Axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class FixerService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}
  // private getPromiseFromSubmit(book: BookEntity) {
  //   return new Promise<string>(function(resolve, reject) {
  //     const bodyFormData = new FormData();
  //     bodyFormData.append(
  //       'file',
  //       request('https://booksroutes.info/' + book.cover),
  //     );
  //     bodyFormData.submit('http://127.0.0.1:1337/api/image', function(
  //       err,
  //       res,
  //     ) {
  //       if (err) throw err;
  //       console.log('Done');
  //       let body = '';
  //       res.on('data', function(chunk) {
  //         body += chunk;
  //       });
  //       res.on('data', function(chunk) {
  //         console.log('BODY: ' + body);
  //         const json = JSON.parse(body);
  //         const imageId = json.result.id;
  //         resolve(imageId.toString());
  //       });
  //     });
  //   });
  // }
  //
  // public async fixImages(): Promise<UserPayload> {
  //   try {
  //     const books = await this.bookRepository.find();
  //     for (let i = 0; i < books.length; i++) {
  //       const book = books[i];
  //       const imageId = await this.getPromiseFromSubmit(book);
  //
  //       book.coverImgId = parseInt(imageId);
  //       const res = await this.bookRepository.save(book);
  //       console.log(res);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //
  //   return null;
  // }
}
