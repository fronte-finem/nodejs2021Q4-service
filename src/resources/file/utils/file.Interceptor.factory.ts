import { Request } from 'express';
import { diskStorage, StorageEngine } from 'multer';
import { NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor as ExpressFileInterceptor } from '@nestjs/platform-express';
import { FastifyFileInterceptor } from './fastify-file.interceptor';
import { EnvConfigService } from '../../../config/env.config.service';

export const FileInterceptorFactory = (configService: EnvConfigService): Type<NestInterceptor> => {
  const Factory = configService.get('USE_FASTIFY')
    ? FastifyFileInterceptor
    : ExpressFileInterceptor;

  const storage: StorageEngine = diskStorage({
    destination: configService.get('UPLOAD_DEST'),
    filename(
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) {
      cb(null, file.originalname);
    },
  });

  const FileInterceptor = Factory(configService.get('UPLOAD_FORM_FIELD_NAME'), {
    storage,
    limits: {
      fileSize: configService.get('UPLOAD_FILE_SIZE_LIMIT'),
    },
  });

  return FileInterceptor;
};
