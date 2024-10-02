import { PartialType } from '@nestjs/swagger';
import { CreateTelecomDto } from './create-telecom.dto';

export class UpdateTelecomDto extends PartialType(CreateTelecomDto) {}
