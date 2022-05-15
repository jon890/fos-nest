import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('/sample')
export class SampleController {
  @Get()
  async findAll(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<string> {
    console.log(request.ip);

    return 'Helllo Sample';
  }
}
