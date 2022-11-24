import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

type Newable<T> = { new (...args: any[]): T };

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  constructor(
    private readonly errorClass: Newable<Error>,
    private readonly httpExceptionClass: Newable<HttpException>
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof this.errorClass) {
          throw new this.httpExceptionClass(error.message);
        }
        throw error;
      })
    );
  }
}
