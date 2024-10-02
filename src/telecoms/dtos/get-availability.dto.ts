import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAvailabilityDto {
  @ApiProperty({ example: '1041107', description: 'The ID of the eNodeB' })
  @IsString()
  @IsNotEmpty()
  enodebId: string;

  @ApiProperty({ example: '22', description: 'The ID of the cell' })
  @IsString()
  @IsNotEmpty()
  cellId: string;

  @ApiProperty({
    example: '2024-10-01T00:00:00Z',
    description: 'Start date for filtering',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2024-10-02T00:00:00Z',
    description: 'End date for filtering',
  })
  @IsDateString()
  endDate: string;
}
