import { ApiProperty } from '@nestjs/swagger';

const StringType = { type: 'string' };

export class ErrorResponseDto {
  statusCode!: number;
  error?: string;

  @ApiProperty({
    anyOf: [StringType, { type: 'array', items: StringType }],
  })
  message!: string | string[];
}
