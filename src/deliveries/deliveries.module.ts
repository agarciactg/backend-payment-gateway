import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';

import { Transaction } from 'src/entities/transaction.entity';
import { Delivery } from 'src/entities/delivery.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Delivery, Transaction])],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
