import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from 'src/common/validation.pipe';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { LoggingInterceptor } from 'src/common/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<Cat[]> {
    if (true) {
      throw new ForbiddenException();
    }

    return this.catsService.findAll();
  }

  @Get()
  async findOne(@Query('id', new ParseIntPipe()) id: number) {
    return this.catsService.findOne(id);
  }
}
