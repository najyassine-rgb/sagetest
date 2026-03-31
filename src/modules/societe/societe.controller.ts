import { Controller, Get } from '@nestjs/common';
import { SocieteService } from './societe.service';

@Controller('societe')
export class SocieteController {
  constructor(private readonly service: SocieteService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
