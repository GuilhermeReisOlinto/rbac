import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PermissionsGuards } from './auth/permission-guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(PermissionsGuards)
  @Get('protected')
  getProtectEndPoint() {
    return 'Este end point esta protegido, mas você tem permissão';
  }
}
