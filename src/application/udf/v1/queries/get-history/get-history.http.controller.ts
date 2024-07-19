import { Controller, Get, Logger, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { V1GetHistoryQueryDto } from '@/application/udf/v1/queries/get-history/dto/get-history.query.dto';
import {
    V1GetHistoryOkResponseDto,
    V1GetHistoryResponseDto,
} from '@/application/udf/v1/queries/get-history/dto/get-history.response.dto';
import { V1GetHistoryQueryHandler } from '@/application/udf/v1/queries/get-history/get-history.query.handler';
import { NonStandardHttpResponse } from '@/shared/interceptors/standard-http-response.interceptor';

const ResolutionMap: Record<string, string> = {
    '1': '1min',
    '5': '5min',
    '15': '15min',
    '30': '30min',
    '45': '45min',
    '60': '1h',
    '120': '2h',
    '240': '4h',
    '1D': '1day',
    '1W': '1week',
    '1M': '1month',
};

@ApiTags('UDF')
@Controller({
    version: '1',
    path: 'udf',
})
export class V1GetHistoryController {
    private readonly logger = new Logger(V1GetHistoryController.name);

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
        @Query() query: V1GetHistoryQueryDto,
    ): Promise<V1GetHistoryResponseDto> {
        const split = query.symbol.split(':');
        const symbol = split[0];

        if (!symbol) {
            this.logger.error('Invalid symbol');
            return { s: 'error', errmsg: 'Invalid symbol' };
        }

        const history = await V1GetHistoryQueryHandler.runHandler(
            this.queryBus,
            {
                symbol,
                interval: ResolutionMap[query.resolution] ?? '1day',
                start_date: query.from,
                end_date: query.to,
                exchange: split[1],
                timezone: 'UTC',
            },
        );

        if (history.s === 'no_data') {
            this.logger.error('No data found.');
            return { ...history, nextTime: query.from.getTime() / 1000 };
        }

        if (history.s === 'error') {
            this.logger.error('Error fetching data.');
            return { ...history, errmsg: 'Error fetching data.' };
        }

        // Do Countback
        if (query.countback && history.s === 'ok') {
            const countback = query.countback;
            if (countback > 0) {
                const okHistory = history as V1GetHistoryOkResponseDto;
                history.t = okHistory.t.slice(-countback);
                history.c = okHistory.c.slice(-countback);
                history.o = okHistory.o.slice(-countback);
                history.h = okHistory.h.slice(-countback);
                history.l = okHistory.l.slice(-countback);
                history.v = okHistory.v.slice(-countback);
            }
        }

        return { ...history };
    }
}
