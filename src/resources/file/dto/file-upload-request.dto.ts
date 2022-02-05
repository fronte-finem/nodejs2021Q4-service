import { ApiProperty } from '@nestjs/swagger';

export class FileUploadRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  filename!: string;
}
