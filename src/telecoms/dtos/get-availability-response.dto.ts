import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAvailabilityResponseDto {
  @ApiProperty({ example: '2024-10-01T00:00:00Z' })
  @IsDateString()
  resultTime: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  availability: number;
}
