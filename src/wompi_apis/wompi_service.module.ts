import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WompiService } from './wompi_service.service';
import { WompiController } from './wompi_service.controller';

@Module({
  imports: [HttpModule],
  controllers: [WompiController],
  providers: [WompiService],
})
export class WompiModule {}
