import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StandardHttpResponseDto } from '@/shared/dto/standard-http-response.dto';

export const NonStandardHttpResponseKey = 'NonStandardHttpResponse';

export const NonStandardHttpResponse = () =>
    SetMetadata(NonStandardHttpResponseKey, true);

@Injectable()
export class StandardHttpResponseInterceptor<T> implements NestInterceptor {
    @Inject() private reflector!: Reflector;

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        // Check that the context type is http
        if (context.getType() !== 'http') {
            return next.handle();
        }

        // Check if the response should be standardised
        const isNonStandard = this.reflector.get<boolean>(
            NonStandardHttpResponseKey,
            context.getHandler(),
        );

        if (isNonStandard) {
            return next.handle();
        }

        const response = context.switchToHttp().getResponse<Response>();

        const statusCode = response.statusCode;

        return next.handle().pipe(
            map((data: T) => {
                const responseDto = new StandardHttpResponseDto<T>();
                responseDto.statusCode = statusCode;
                responseDto.data = data;
                return responseDto;
            }),
        );
    }
}
