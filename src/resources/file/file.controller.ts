import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiResponse, Public } from '../../common/decorators';
import { OpenApiTag } from '../../open-api/setup-open-api';
import { RoutePrefix } from '../routes';
import { FileUploadRequestDto } from './dto/file-upload-request.dto';
import { FileService } from './file.service';
import { DynamicFileInterceptor } from './utils/dynamic.file.interceptor';

@ApiTags(OpenApiTag.FILE)
@Controller(RoutePrefix.FILE)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Public()
  @ApiResponse.NotFound
  @Get(':filename')
  async streamFile(@Param('filename') filename: string): Promise<StreamableFile> {
    return this.fileService.streamFile(filename);
  }

  @Public()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiResponse.Unauthorized
  @UseInterceptors(DynamicFileInterceptor)
  @Post()
  async uploadFile(
    @Body() body: FileUploadRequestDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileUploadRequestDto> {
    return this.fileService.uploadFile(file);
  }
}
