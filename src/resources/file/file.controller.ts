import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor as ExpressFileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { EnvConfig } from '../../common/config';
import { ApiResponse } from '../../common/decorators';
import { OpenApiTag } from '../../open-api/setup-open-api';
import { RoutePrefix } from '../routes';
import { FileUploadRequestDto } from './dto/file-upload-request.dto';
import { FileService } from './file.service';
import { FastifyFileInterceptor } from './utils/fastify-file.interceptor';
import { storage } from './utils/storage';

const FileInterceptor = EnvConfig.useFastify ? FastifyFileInterceptor : ExpressFileInterceptor;

@ApiTags(OpenApiTag.FILE)
@Controller(RoutePrefix.FILE)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiResponse.Unauthorized
  @Post()
  @UseInterceptors(
    FileInterceptor(EnvConfig.uploadFormFieldName, {
      dest: EnvConfig.uploadDest,
      storage,
      limits: {
        fileSize: EnvConfig.uploadFileSizeLimit,
      },
    })
  )
  async uploadFile(
    @Body() body: FileUploadRequestDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileUploadRequestDto> {
    return this.fileService.uploadFile(file);
  }
}
