import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}
  
  // @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  // create() {
  //   return 'This action adds a new cat';
  // }

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() _createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Req() _request: Request): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  findAllWildcard() {
    return 'This route uses a wildcard';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirectoToNestJs() {
    return '';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get(':id')
  // findOne(@Param() params: { id: number }): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

  @Get('promise')
  async findAllPromise(): Promise<any[]> {
    return [1, 2, 3];
  }

  @Get('observable_stream')
  findAllObservableStream(): Observable<any[]> {
    return of([1, 2, 3, 4]);
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
  @Put(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
