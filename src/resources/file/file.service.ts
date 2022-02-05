import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { WinstonLogger } from '../../logger/logger.service';
import { FileUploadResponseDto } from './dto/file-upload-response.dto';

@Injectable()
export class FileService {
  constructor(private readonly logger: WinstonLogger) {
    this.logger.setContext(FileService);
  }

  async uploadFile(file: Express.Multer.File): Promise<FileUploadResponseDto> {
    this.logger.debug({ file });
    return { filename: file.originalname };
  }
}
