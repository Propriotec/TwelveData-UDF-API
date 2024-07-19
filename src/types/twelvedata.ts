export const TwelveDataSymbolType = [
    'American Depositary Receipt',
    'Bond',
    'Bond Fund',
    'Closed-end Fund',
    'Common Stock',
    'Depositary Receipt',
    'Digital Currency',
    'ETF',
    'Exchange-Traded Note',
    'Global Depositary Receipt',
    'Index',
    'Limited Partnership',
    'Mutual Fund',
    'Physical Currency',
    'Preferred Stock',
    'REIT',
    'Right',
    'Structured Product',
    'Trust',
    'Unit',
    'Warrant',
];

export type TwelveDataSymbolType = (typeof TwelveDataSymbolType)[number];

// Exchange Endpoint
export interface TwelveDataExchangeRequest<WithPlanType extends boolean> {
    withPlan?: WithPlanType;
    type?: TwelveDataSymbolType;
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

// Crypto Exchanges Endpoint

export interface TwelveDataCryptoExchangeResponse {
    name: string;
}

// History Endpoint
export interface TwelveDataHistoryRequest {
    symbol: string;
    interval: string;

    exchange?: string;
    mic_code?: string;
    country?: string;
    type?: TwelveDataSymbolType;

    outputsize?: number;
    timezone?: string;

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
        type: TwelveDataSymbolType;
    };
    values?: {
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
        type: TwelveDataSymbolType;
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

// Search Endpoint
export interface TwelveDataSearchRequest {
    symbol: string;
    outputsize?: number;
}

export interface TwelveDataSearchResponse {
    symbol: string;
    instrument_name: string;
    exchange: string;
    mic_code: string;
    exchange_timezone: string;
    instrument_type: TwelveDataSymbolType;
    country: string;
}
