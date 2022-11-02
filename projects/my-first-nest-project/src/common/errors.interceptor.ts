import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return (
      next
        .handle()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .pipe(catchError((_err) => throwError(() => new BadGatewayException())))
    );
  }
}
