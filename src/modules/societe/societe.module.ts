import { Module } from '@nestjs/common';
import { SocieteController } from './societe.controller';
import { SocieteService } from './societe.service';

@Module({
  controllers: [SocieteController],
  providers: [SocieteService],
  exports: [SocieteService],
})
export class SocieteModule {}
