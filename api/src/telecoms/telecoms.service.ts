import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { parseCsv } from './telecoms.utils';
import { InjectModel } from '@nestjs/mongoose';
import {
  Telecom,
  TelecomDocument,
  TelecomSchema,
} from './schemas/telecom.schema';
import { Model } from 'mongoose';
import { mapRawDataToTelecom } from './telecom.mapper';
import { GetAvailabilityDto } from './dtos/get-availability.dto';
import { GetAvailabilityResponseDto } from './dtos/get-availability-response.dto';
import { ValidationError } from 'class-validator';

@Injectable()
export class TelecomsService {
  constructor(
    @InjectModel(Telecom.name)
    private readonly telecomModel: Model<Telecom>,
  ) {}

  async create(file: Express.Multer.File) {
    const [rowData, error] = await parseCsv(file);
    if (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          statusCode: 500,
          message: error.message,
        });
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException({
          statusCode: 400,
          message: error.message,
        });
      }

      throw new UnprocessableEntityException({
        statusCode: 422,
        message: 'Validation failed for the input data.',
        errors: error,
      });
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
  }

  async getFilteredData(
    enodebId: string,
    cellId: string,
    startDate: string,
    endDate: string,
  ): Promise<GetAvailabilityResponseDto[]> {
    const data = await this.telecomModel
      .find({
        'objectName.eNodeBId': enodebId,
        'objectName.localCellId': cellId,
        resultTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      })
      .exec();

    return data.map((item) => ({
      resultTime: item.resultTime.toISOString(),
      availability: (item.lCellAvailDur / 900) * 100,
    }));
  }
}
