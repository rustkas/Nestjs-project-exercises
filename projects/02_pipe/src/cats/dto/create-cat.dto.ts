import { Cat } from 'src/cats/interfaces/cat.interface';
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto implements Cat {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
