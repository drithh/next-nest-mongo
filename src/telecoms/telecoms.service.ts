import { Injectable } from '@nestjs/common';
import { CreateTelecomDto } from './dto/create-telecom.dto';
import { UpdateTelecomDto } from './dto/update-telecom.dto';

@Injectable()
export class TelecomsService {
  create(createTelecomDto: CreateTelecomDto) {
    return 'This action adds a new telecom';
  }

  findAll() {
    return `This action returns all telecoms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} telecom`;
  }

  update(id: number, updateTelecomDto: UpdateTelecomDto) {
    return `This action updates a #${id} telecom`;
  }

  remove(id: number) {
    return `This action removes a #${id} telecom`;
  }
}
