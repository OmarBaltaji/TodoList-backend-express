import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return 'index';
  }

  @Get('/favicon.ico')
  favicon() {
    return 'favicon';
  }
}
