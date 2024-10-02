import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { parse, Parser } from 'csv-parse';
import { Readable } from 'stream';
import { ObjectName, RawDataDto } from './dtos/raw-data.dto';

export async function parseCsv(
  file: Express.Multer.File,
): Promise<
  [RawDataDto[], null] | [null, Error | BadRequestException | ValidationError]
> {
  const parsedData: RawDataDto[] = [];

  const bufferStream = new Readable();
  bufferStream.push(file.buffer);
  bufferStream.push(null); // Signal the end of the stream

  const parser: Parser = bufferStream.pipe(parse({ columns: true }));

  try {
    for await (const data of parser) {
      if (data['Result Time'] === '') {
        continue;
      }
      const [parsedRowData, validationError] = await validateRow(data);
      if (validationError) {
        return [null, validationError];
      }
      parsedData.push(parsedRowData);
    }
    return [parsedData, null];
  } catch (error) {
    return [null, new BadRequestException(error.message)];
  }
}

async function validateRow(
  data: any,
): Promise<[RawDataDto, null] | [null, Error | ValidationError]> {
  const csvData = plainToInstance(RawDataDto, data);
  const validationErrors = await validate(csvData);

  if (validationErrors.length > 0) {
    return [null, validationErrors[0]];
  }

  return [csvData, null];
}

export function parseToNumber(columnName: string, value: string): number {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${columnName} must be a number, received ${value}`);
  }
  return num;
}

export function transformTextToObjectName(text: string): ObjectName {
  const regex =
    /(?<name>[^/]+)\/Cell:eNodeB Function Name=(?<functionName>[^,]+), Local Cell ID=(?<localCellId>\d+), Cell Name=(?<cellName>[^,]+), eNodeB ID=(?<eNodeBId>\d+), Cell FDD TDD indication=(?<cellFddTddIndication>[^,]+)/;

  const match = text.match(regex);

  if (!match || !match.groups) {
    throw new Error('Invalid input format');
  }

  return {
    name: match.groups.name.trim(),
    functionName: match.groups.functionName.trim(),
    localCellId: Number(match.groups.localCellId), // Convert to number
    cellName: match.groups.cellName.trim(),
    eNodeBId: match.groups.eNodeBId, // Convert to number
    cellFddTddIndication: match.groups.cellFddTddIndication.trim(),
  } as ObjectName;
}
