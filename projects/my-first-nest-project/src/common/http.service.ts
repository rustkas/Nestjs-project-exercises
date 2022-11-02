import { Injectable, Inject, Optional } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  //   @Inject('HTTP_OPTIONS')
  //   private readonly httpClient: T;

  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
