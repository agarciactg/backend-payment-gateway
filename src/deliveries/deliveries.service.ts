import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from 'src/entities/delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
  ) {}

  create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = this.deliveriesRepository.create(createDeliveryDto);
    return this.deliveriesRepository.save(delivery);
  }

  findOne(id: number) {
    return this.deliveriesRepository.findOne({ where: { id }, relations: ['transaction'] });
  }
}
