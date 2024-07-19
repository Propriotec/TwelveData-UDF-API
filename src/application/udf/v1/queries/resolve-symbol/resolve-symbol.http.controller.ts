import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
    BadRequestException,
    Controller,
    Get,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { V1ResolveSymbolQueryDto } from '@/application/udf/v1/queries/resolve-symbol/dto/resolve-symbol.query.dto';
import { V1ResolveSymbolResponseDto } from '@/application/udf/v1/queries/resolve-symbol/dto/resolve-symbol.response.dto';
import { V1ResolveSymbolQueryHandler } from '@/application/udf/v1/queries/resolve-symbol/resolve-symbol.query.handler';
import { NonStandardHttpResponse } from '@/shared/interceptors/standard-http-response.interceptor';

@ApiTags('UDF')
@Controller({
    version: '1',
    path: 'udf',
})
export class V1ResolveSymbolController {
    constructor(private readonly queryBus: QueryBus) {}

    @ApiOperation({
        summary: 'Get Symbol Info',
    })
    @ApiResponse({
        status: 200,
        description: 'The Symbol was successfully retrieved.',
        type: V1ResolveSymbolResponseDto,
    })
    @CacheTTL(0)
    @Get('/symbols')
    @NonStandardHttpResponse()
    @UseInterceptors(CacheInterceptor)
    async getConfig(
        @Query() query: V1ResolveSymbolQueryDto,
    ): Promise<V1ResolveSymbolResponseDto> {
        const split = query.symbol.split(':');
        const ticker = split[0];

        if (!ticker) {
            throw new BadRequestException('Invalid ticker');
        }

        const symbol = await V1ResolveSymbolQueryHandler.runHandler(
            this.queryBus,
            {
                symbol: ticker,
                exchange: split[1],
            },
        );

        return { ...symbol };
    }
}
