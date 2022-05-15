import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class SampleController {
  @Get('/sample')
  index(@Res() res) {
    res.status(302).redirect('/login');
  }
}
