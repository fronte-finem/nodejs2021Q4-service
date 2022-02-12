import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { resolve } from 'path';
import { open } from 'fs/promises';
import { EnvConfigService } from '../../config/env.config.service';
import { WinstonLogger } from '../../logger/logger.service';
import { FileUploadResponseDto } from './dto/file-upload-response.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: EnvConfigService,
    private readonly logger: WinstonLogger
  ) {
    this.logger.setContext(FileService);
  }

  async uploadFile(file: Express.Multer.File): Promise<FileUploadResponseDto> {
    this.logger.debug({ file });
    return { filename: file.originalname };
  }

  async streamFile(filename: string): Promise<StreamableFile> {
    this.logger.debug(`Trying stream file [${filename}]`);
    try {
      const path = resolve(this.configService.get('UPLOAD_DEST'), filename);
      const fd = await open(path, 'r');
      return new StreamableFile(fd.createReadStream());
    } catch (error) {
      this.logger.error({ error });
      throw new NotFoundException(`File [${filename}] not found!`);
    }
  }
}
