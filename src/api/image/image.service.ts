import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageDto } from './dtos/image.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BookEntity } from '../book/entities/book.entity';

export class ImageService extends TypeOrmCrudService<ImageEntity> {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {
    super(imageRepository);
  }

  public async addImage(dto: ImageDto): Promise<ImageDto> {
    const imageEntity = new ImageEntity();
    imageEntity.name = dto.name;
    imageEntity.url = dto.url;
    imageEntity.type = dto.type;
    const result = await this.imageRepository.save(imageEntity);
    return this.convertImageEntityToDto(result);
  }

  private convertImageEntityToDto(entity: ImageEntity) {
    const dto = new ImageDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.type = entity.type;
    dto.url = `${process.env.IMAGE_HOST}/${entity.url}`;
    return dto;
  }
}
