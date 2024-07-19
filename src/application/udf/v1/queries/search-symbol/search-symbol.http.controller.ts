import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { V1SearchSymbolQueryDto } from '@/application/udf/v1/queries/search-symbol/dto/search-symbol.query.dto';
import { V1SearchSymbolResponseDto } from '@/application/udf/v1/queries/search-symbol/dto/search-symbol.response.dto';
import { V1SearchSymbolQueryHandler } from '@/application/udf/v1/queries/search-symbol/search-symbol.query.handler';
import { NonStandardHttpResponse } from '@/shared/interceptors/standard-http-response.interceptor';

@ApiTags('UDF')
@Controller({
    version: '1',
    path: 'udf',
})
export class V1SearchSymbolController {
    constructor(private readonly queryBus: QueryBus) {}

    @ApiOperation({
        summary: 'Search for Symbols',
    })
    @ApiResponse({
        status: 200,
        description: 'The Symbol was successfully retrieved.',
        isArray: true,
        type: V1SearchSymbolResponseDto,
    })
    @Get('/search')
    @NonStandardHttpResponse()
    async searchSymbol(
        @Query() query: V1SearchSymbolQueryDto,
    ): Promise<V1SearchSymbolResponseDto[]> {
        const symbols = await V1SearchSymbolQueryHandler.runHandler(
            this.queryBus,
            {
                symbol: query.query,
                exchange: query.exchange,
            },
        );

        return symbols;
    }
}
