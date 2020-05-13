import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import BaseApiResponse from '../base/base.api.response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, BaseApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        //ToDo убрать костыль (почему то вызывается дважды в колбеке от фейсбука)
        if (!data.toString()?.includes('errorCode')) {
          return { errorCode: 0, errorMessage: '', result: data };
        } else {
          return data;
        }
      }),
    );
  }
}
