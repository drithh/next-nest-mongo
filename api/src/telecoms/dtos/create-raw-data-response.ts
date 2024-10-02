import { ApiProperty } from '@nestjs/swagger';

export class SuccessInsertResponseDto {
  @ApiProperty({ example: 'Records inserted successfully' })
  message: string;

  @ApiProperty({ example: 10 })
  totalInserted: number;
}

export class InsertWithDuplicationResponseDto {
  @ApiProperty({
    example: 'Some records were not inserted due to duplication.',
  })
  message: string;

  @ApiProperty({ example: 10 })
  totalInserted: number;

  @ApiProperty({ example: 5 })
  totalDuplicated: number;

  @ApiProperty({ example: [1, 2, 3] })
  duplicatedIndexes: number[];
}
