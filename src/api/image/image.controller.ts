import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';
import { ImageDto } from './dtos/image.dto';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { ImageEntity } from './entities/image.entity';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import ImagesPagination from './dtos/images.pagination.dto';
import { ImageType } from './entities/imageType.enum';

@Crud({
  model: {
    type: ImageEntity,
  },
  query: {
    alwaysPaginate: true,
  },
  serialize: {
    getMany: ImagesPagination,
  },
})
@ApiTags('image')
@Controller('image')
export class ImageController implements CrudController<ImageEntity> {
  constructor(public service: ImageService) {}

  get base(): CrudController<ImageEntity> {
    return this;
  }

  @ApiOperation({ summary: 'Загрузить картинку' })
  @Post('/:type')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file,
    @Param('type') type,
  ): Promise<ImageDto> {
    const newFile = new ImageDto();
    if (Object.values(ImageType).includes(type)) {
      newFile.type = type;
    } else {
      newFile.type = ImageType.UNKNOWN;
    }
    newFile.url = file.filename;
    newFile.name = file.originalname;
    return this.service.addImage(newFile);
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}
