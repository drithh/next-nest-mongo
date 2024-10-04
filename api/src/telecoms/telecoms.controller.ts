import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  ParseFilePipeBuilder,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  InsertWithDuplicationResponseDto,
  SuccessInsertResponseDto,
} from './dtos/create-raw-data-response';
import { GetAvailabilityDto } from './dtos/get-availability.dto';
import { GetAvailabilityResponseDto } from './dtos/get-availability-response.dto';
import {
  ErrorResponseDto,
  ValidationErrorResponseDto,
} from 'src/common/dtos/error';

@Controller('telecoms')
export class TelecomsController {
  constructor(private readonly telecomsService: TelecomsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('raw_data'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a Raw CSV file' })
  @ApiCreatedResponse({
    description: 'Created - Records inserted successfully.',
    type: SuccessInsertResponseDto,
  })
  @ApiOkResponse({
    description: 'Created - Records inserted successfully.',
    type: InsertWithDuplicationResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity - File type or size is invalid.',
    type: ValidationErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        raw_data: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .addMaxSizeValidator({
          maxSize: 1_000_000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    raw_data: Express.Multer.File,
  ) {
    return this.telecomsService.create(raw_data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Filtered raw data retrieved successfully',
    type: [GetAvailabilityResponseDto],
  })
  async getAvailabilities(
    @Query() query: GetAvailabilityDto, // Use the DTO here
  ): Promise<GetAvailabilityResponseDto[]> {
    const { enodebId, cellId, startDate, endDate } = query; // Destructure query
    return this.telecomsService.getFilteredData(
      enodebId,
      cellId,
      startDate,
      endDate,
    );
  }
}
