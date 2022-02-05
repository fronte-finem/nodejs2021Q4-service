import { Express, Request } from 'express';
import { diskStorage, StorageEngine } from 'multer';
import { EnvConfig } from '../../../common/config';

export const storage: StorageEngine = diskStorage({
  destination: EnvConfig.uploadDest,
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, file.originalname);
  },
});
