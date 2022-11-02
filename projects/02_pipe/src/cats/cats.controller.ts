import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JoiValidationPipe } from 'src/common/joi-validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import * as Joi from 'joi';

@Controller('cats')
export class CatsController {
  // static createCatSchema: Joi.ObjectSchema<Cat> = Joi.object({
  //   name: Joi.string(),
  //   age: Joi.number(),
  //   breed: Joi.string(),
  // });

  constructor(private catsService: CatsService) {}

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // createCatSchema() {
  // return Joi.object({
  //   name: Joi.string(),
  //   age: Joi.number(),
  //   breed: Joi.string(),
  // });
  // }

  @Post()
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string(),
        age: Joi.number(),
        breed: Joi.string(),
      }),
    ),
  )
  async create(@Body() createCatDto: CreateCatDto) {
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

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.catsService.findOne(id);
  // }

  // @Get(':id')
  // async findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   return this.catsService.findOne(id);
  // }

  @Get()
  async findOne(@Query('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}
