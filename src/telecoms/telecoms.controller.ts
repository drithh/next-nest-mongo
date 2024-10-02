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
} from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  InsertWithDuplicationResponseDto,
  SuccessInsertResponseDto,
} from './dtos/response.dto';

@Controller('telecoms')
export class TelecomsController {
  constructor(private readonly telecomsService: TelecomsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('raw_data'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a Raw CSV file' })
  @ApiResponse({
    status: 201,
    description: 'Created - Records inserted successfully.',
    type: SuccessInsertResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Created - Records inserted successfully.',
    type: InsertWithDuplicationResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity - File type or size is invalid.',
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
}
