import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import {
    TwelveDataConditionalExchangeResponse,
    TwelveDataExchangeRequest,
    TwelveDataHistoryRawResponse,
    TwelveDataHistoryRequest,
    TwelveDataHistoryResponse,
} from '@/types/twelvedata';

@Injectable()
export class TwelveDataService {
    private readonly logger = new Logger(TwelveDataService.name);

    constructor(private readonly http: HttpService) {}

    async getApiUsage() {
        const result = await this.http.axiosRef
            .get('/api_usage')
            .then((response) => response.status === 200)
            .catch((error: unknown) => {
                this.logger.error(error);
                return false;
            });

        if (!result) {
            this.logger.error(
                'TwelveData API key is invalid or has exceeded the rate limit.',
            );
            throw new Error(
                'TwelveData API key is invalid or has exceeded the rate limit.',
            );
        }

        this.logger.log('TwelveData API key is valid and ready to go.');
    }

    async getExchanges<WithPlanType extends boolean>(
        options: TwelveDataExchangeRequest<WithPlanType>,
    ): Promise<TwelveDataConditionalExchangeResponse<WithPlanType>[]> {
        return this.http.axiosRef
            .get<{
                data: TwelveDataConditionalExchangeResponse<WithPlanType>[];
            }>('/exchanges', {
                params: {
                    ...options,
                },
            })
            .then((response) => response.data.data)
            .catch((error: unknown) => {
                this.logger.error(error);
                return [];
            });
    }

    async getHistory(options: TwelveDataHistoryRequest) {
        return this.http.axiosRef
            .get<TwelveDataHistoryRawResponse>('/time_series', {
                params: {
                    timezone: 'UTC',
                    ...options,
                    start_date: options.start_date
                        ?.toISOString()
                        .replace('Z', '')
                        .replace('T', ' '),
                    end_date: options.end_date
                        ?.toISOString()
                        .replace('Z', '')
                        .replace('T', ' '),
                },
            })
            .then(
                (response) =>
                    ({
                        meta: response.data.meta,
                        values: response.data.values.map((value) => ({
                            datetime: new Date(value.datetime),
                            open: Number(value.open),
                            high: Number(value.high),
                            low: Number(value.low),
                            close: Number(value.close),
                            volume: Number(value.volume),
                        })),
                    }) satisfies TwelveDataHistoryResponse,
            )
            .catch((error: unknown) => {
                this.logger.error(error);
                throw new Error('Failed to fetch history data.');
            });
    }
}
