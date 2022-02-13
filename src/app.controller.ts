import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators';
import { OpenApiTag } from './open-api/setup-open-api';

@ApiTags(OpenApiTag.APP)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
