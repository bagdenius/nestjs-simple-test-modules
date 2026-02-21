import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)$/,
            errorMessage: 'Uploaded file should be an image',
          }),
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024,
            errorMessage: "Uploaded file size can't be more that 10MB",
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.upload(file);
  }
}
