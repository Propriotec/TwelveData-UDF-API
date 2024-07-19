import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { V1GetConfigResponseDto } from '@/application/udf/v1/queries/get-config/dto/get-config.response.dto';
import { V1GetConfigQueryHandler } from '@/application/udf/v1/queries/get-config/get-config.query.handler';
import { NonStandardHttpResponse } from '@/shared/interceptors/standard-http-response.interceptor';

@ApiTags('UDF')
@Controller({
    version: '1',
    path: 'udf',
})
export class V1GetConfigController {
    constructor(private readonly queryBus: QueryBus) {}

    @ApiOperation({
        summary: 'Get UDF Config',
    })
    @ApiResponse({
        status: 200,
        description: 'The Config was successfully retrieved.',
        type: V1GetConfigResponseDto,
    })
    @CacheKey('udf-config')
    @CacheTTL(0)
    @Get('/config')
    @NonStandardHttpResponse()
    @UseInterceptors(CacheInterceptor)
    async getConfig(): Promise<V1GetConfigResponseDto> {
        const config = await V1GetConfigQueryHandler.runHandler(this.queryBus);

        return { ...config };
    }
}
