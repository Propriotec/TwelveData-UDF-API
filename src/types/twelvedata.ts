// Exchange Endpoint
export interface TwelveDataExchangeRequest<WithPlanType extends boolean> {
    withPlan?: WithPlanType;
    type?: string;
    name?: string;
    code?: string;
    country?: string;
}

export interface TwelveDataExchangeResponse {
    name: string;
    code: string;
    country: string;
    timezone: string;
}

export interface TwelveDataExchangeWithPlanResponse {
    name: string;
    code: string;
    country: string;
    timezone: string;
    access: {
        global: string;
        plan: string;
    };
}

export type TwelveDataConditionalExchangeResponse<HasPlan extends boolean> =
    HasPlan extends true
        ? TwelveDataExchangeWithPlanResponse
        : TwelveDataExchangeResponse;

// History Endpoint
export interface TwelveDataHistoryRequest {
    symbol: string;
    interval: string;

    exchange?: string;
    mic_code?: string;
    country?: string;
    type?: string;

    outputsize?: number;

    dp?: number;

    order?: 'ASC' | 'DESC';

    date?: Date;
    start_date?: Date;
    end_date?: Date;

    previous_close?: boolean;

    adjust?: 'all' | 'splits' | 'dividends' | 'none';
}

export interface TwelveDataHistoryRawResponse {
    meta: {
        symbol: string;
        interval: string;
        currency: string;
        exchange_timezone: string;
        exchange: string;
        type: string;
    };
    values: {
        datetime: string;
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
    }[];
}

export interface TwelveDataHistoryResponse {
    meta: {
        symbol: string;
        interval: string;
        currency: string;
        exchange_timezone: string;
        exchange: string;
        type: string;
    };
    values: {
        datetime: Date;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
    }[];
}
