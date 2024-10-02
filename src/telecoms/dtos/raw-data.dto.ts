import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { parseToNumber, transformTextToObjectName } from '../telecoms.utils';

export class ObjectName {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  functionName: string;

  @IsNumber()
  @IsNotEmpty()
  localCellId: number;

  @IsString()
  @IsNotEmpty()
  cellName: string;

  @IsNumber()
  @IsNotEmpty()
  eNodeBId: string;

  @IsString()
  @IsNotEmpty()
  cellFddTddIndication: string;
}

export class RawDataDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  'Result Time': Date;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('Granularity Period', value))
  'Granularity Period': number;

  @IsNotEmpty()
  @Transform(({ value }) => transformTextToObjectName(value))
  'Object Name': ObjectName;

  @IsNotEmpty()
  'Reliability': string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Cell.Avail.Dur', value))
  'L.Cell.Avail.Dur': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) =>
    parseToNumber('L.Cell.Unavail.Dur.EnergySaving', value),
  )
  'L.Cell.Unavail.Dur.EnergySaving': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Cell.Unavail.Dur.Manual', value))
  'L.Cell.Unavail.Dur.Manual': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Cell.Unavail.Dur.Sys', value))
  'L.Cell.Unavail.Dur.Sys': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) =>
    parseToNumber('L.Cell.Unavail.Dur.Sys.S1Fail', value),
  )
  'L.Cell.Unavail.Dur.Sys.S1Fail': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Voice.E2EVQI.Accept.Times', value))
  'L.Voice.E2EVQI.Accept.Times': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Voice.E2EVQI.Bad.Times', value))
  'L.Voice.E2EVQI.Bad.Times': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) =>
    parseToNumber('L.Voice.E2EVQI.Excellent.Times', value),
  )
  'L.Voice.E2EVQI.Excellent.Times': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Voice.E2EVQI.Good.Times', value))
  'L.Voice.E2EVQI.Good.Times': number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseToNumber('L.Voice.E2EVQI.Poor.Times', value))
  'L.Voice.E2EVQI.Poor.Times': number;

  static getKeys(): string[] {
    return Object.keys(new RawDataDto());
  }
}
