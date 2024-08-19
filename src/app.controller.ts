import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { AppService } from './app.service';

@Controller('upload')
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
