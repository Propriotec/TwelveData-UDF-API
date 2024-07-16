import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { V1GetHistoryParamsDto } from '@/application/udf/v1/queries/get-history/dto/get-history.params.dto';
import { V1GetHistoryResponseDto } from '@/application/udf/v1/queries/get-history/dto/get-history.response.dto';
import { V1GetHistoryQueryHandler } from '@/application/udf/v1/queries/get-history/get-history.query.handler';
import { NonStandardHttpResponse } from '@/shared/interceptors/standard-http-response.interceptor';

@ApiTags('UDF')
@Controller({
    version: '1',
    path: 'udf',
})
export class V1GetHistoryController {
    constructor(private readonly queryBus: QueryBus) {}

    @ApiOperation({
        summary: 'Get UDF History',
    })
    @ApiResponse({
        status: 200,
        description: 'The History was successfully retrieved.',
        type: V1GetHistoryResponseDto,
    })
    @Get('/history')
    @NonStandardHttpResponse()
    @SkipThrottle()
    async getHistory(
        @Query() query: V1GetHistoryParamsDto,
    ): Promise<V1GetHistoryResponseDto> {
        const history = await V1GetHistoryQueryHandler.runHandler(
            this.queryBus,
            {
                symbol: query.symbol,
                interval: '1day',
                start_date: new Date(0),
                end_date: new Date(),
            },
        );

        return { ...history };
    }
}
