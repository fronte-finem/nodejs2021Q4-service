import { Request } from 'express';
import { diskStorage, StorageEngine } from 'multer';
import { envVars } from '../../../config/env.validation';

export const storage: StorageEngine = diskStorage({
  destination: envVars.UPLOAD_DEST,
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, file.originalname);
  },
});
