import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_id: number): Cat {
    return { name: 'Baika', age: 2, breed: 'no' };
  }
}
