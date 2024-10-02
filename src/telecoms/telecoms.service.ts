import { Injectable } from '@nestjs/common';
import { parseCsv } from './telecoms.utils';

@Injectable()
export class TelecomsService {
  async create(file: Express.Multer.File) {
    const [rowData, error] = await parseCsv(file);
    if (error) {
      return error;
    }
    console.log(rowData);
  }
}
