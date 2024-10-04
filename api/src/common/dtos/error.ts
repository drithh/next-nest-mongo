import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsObject,
  ValidateNested,
  IsNotEmpty,
  IsString,
} from 'class-validator';

class ValidationErrorItemDto {
  @ApiProperty({
    example: { year: '2024', sales_category: 'C', customer_count: '10420' },
  })
  target: { [key: string]: string };

  @ApiProperty({ example: 'must be a string' })
  property: string;

  @ApiProperty({
    example: {
      isNumber:
        'Granularity Period must be a number conforming to the specified constraints',
      isNotEmpty: 'Granularity Period should not be empty',
    },
  })
  constraints: { [key: string]: string };
}

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({ example: 'Unprocessable Entity' })
  message: string;

  @ApiProperty({ type: [ValidationErrorItemDto] })
  errors: ValidationErrorItemDto[];
}
