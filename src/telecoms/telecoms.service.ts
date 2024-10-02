import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { parseCsv } from './telecoms.utils';
import { InjectModel } from '@nestjs/mongoose';
import {
  Telecom,
  TelecomDocument,
  TelecomSchema,
} from './schemas/telecom.schema';
import { Model } from 'mongoose';
import { mapRawDataToTelecom } from './telecom.mapper';

@Injectable()
export class TelecomsService {
  constructor(
    @InjectModel(Telecom.name)
    private readonly telecomModel: Model<Telecom>,
  ) {}

  async create(file: Express.Multer.File) {
    const [rowData, error] = await parseCsv(file);
    if (error) {
      throw error;
    }

    const telecoms = rowData.map((row) => mapRawDataToTelecom(row));
    try {
      await this.telecomModel.insertMany(telecoms, {
        ordered: false,
      });
      return {
        message: 'Records inserted successfully.',
        totalInserted: telecoms.length,
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          message: 'Some records were not inserted due to duplication.',
          totalInserted: error.result.insertedCount,
          totalDuplicated: telecoms.length - error.result.insertedCount,
          duplicatedIndexes: error.results.map((result) => result.err.index),
        };
      }
      throw new InternalServerErrorException();
    }

    return 'File uploaded successfully.';
  }
}
