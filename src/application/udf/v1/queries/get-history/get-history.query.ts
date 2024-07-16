import { TwelveDataHistoryRequest } from '@/types/twelvedata';

export class V1GetHistoryQuery implements TwelveDataHistoryRequest {
    symbol!: string;
    interval!: string;
    exchange?: string | undefined;
    mic_code?: string | undefined;
    country?: string | undefined;
    type?: string | undefined;
    outputsize?: number | undefined;
    dp?: number | undefined;
    order?: 'ASC' | 'DESC' | undefined;
    date?: Date | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    previous_close?: boolean | undefined;
    adjust?: 'all' | 'splits' | 'dividends' | 'none' | undefined;

    constructor(options: TwelveDataHistoryRequest) {
        Object.assign(this, options);
    }
}
