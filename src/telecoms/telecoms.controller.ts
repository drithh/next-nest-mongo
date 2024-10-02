import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { CreateTelecomDto } from './dto/create-telecom.dto';
import { UpdateTelecomDto } from './dto/update-telecom.dto';

@Controller('telecoms')
export class TelecomsController {
  constructor(private readonly telecomsService: TelecomsService) {}

  @Post()
  create(@Body() createTelecomDto: CreateTelecomDto) {
    return this.telecomsService.create(createTelecomDto);
  }

  @Get()
  findAll() {
    return this.telecomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telecomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTelecomDto: UpdateTelecomDto) {
    return this.telecomsService.update(+id, updateTelecomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telecomsService.remove(+id);
  }
}
