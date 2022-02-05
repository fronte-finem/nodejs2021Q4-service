import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { Express } from 'express';
import { resolve } from 'path';
import { open } from 'fs/promises';
import { EnvConfig } from '../../common/config';
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

  async streamFile(filename: string): Promise<StreamableFile> {
    this.logger.debug(`Trying stream file [${filename}]`);
    try {
      const fd = await open(resolve(EnvConfig.uploadDest, filename), 'r');
      return new StreamableFile(fd.createReadStream());
    } catch (error) {
      this.logger.error({ error });
      throw new NotFoundException(`File [${filename}] not found!`);
    }
  }
}
