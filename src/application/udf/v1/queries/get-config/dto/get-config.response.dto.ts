import { ApiProperty } from '@nestjs/swagger';

export class V1GetConfigResponseDto {
    @ApiProperty({
        type: String,
        isArray: true,
        required: false,
        description: 'The supported currency codes for the charting library',
        example: [
            'USD',
            'EUR',
            'JPY',
            'GBP',
            'AUD',
            'CAD',
            'CHF',
            'CNY',
            'SEK',
            'NZD',
        ],
    })
    currency_codes!: string[] | undefined;

    @ApiProperty({
        type: Object,
        isArray: true,
        required: false,
        description: 'The supported exchanges for the charting library',
        example: [
            {
                name: 'None',
                value: '',
                desc: 'View All',
            },
            {
                name: 'Commodity',
                value: 'COMMODITY',
                desc: 'Commodity',
            },
            {
                name: 'Nasdaq',
                value: 'Nasdaq',
                desc: 'United States',
            },
        ],
    })
    exchanges!:
        | {
              value: string;
              name: string;
              desc: string;
          }[]
        | undefined;

    @ApiProperty({
        type: String,
        isArray: true,
        required: false,
        description: 'The supported resolutions for the charting library',
        example: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    })
    supported_resolutions!: string[] | undefined;

    @ApiProperty({
        type: Boolean,
        description: 'Whether the charting library supports group request',
        example: true,
        required: false,
    })
    supports_group_request!: boolean | undefined;

    @ApiProperty({
        type: Boolean,
        description: 'Whether the charting library supports marks',
        example: true,
        required: false,
    })
    supports_marks!: boolean | undefined;

    @ApiProperty({
        type: Boolean,
        description: 'Whether the charting library supports search',
        example: true,
        required: false,
    })
    supports_search!: boolean | undefined;

    @ApiProperty({
        type: Boolean,
        description: 'Whether the charting library supports timescale marks',
        example: true,
        required: false,
    })
    supports_timescale_marks!: boolean | undefined;

    @ApiProperty({
        type: Boolean,
        description: 'Whether the charting library supports time',
        example: true,
        required: false,
    })
    supports_time!: boolean | undefined;

    @ApiProperty({
        type: Object,
        description: 'Whether the charting library symbols groupings',
        example: {
            futures: `/^(.+)([12]!|[FGHJKMNQUVXZ]\\d{1,2})$/`,
            stock: `/^(.+)([12]!|[FGHJKMNQUVXZ]\\d{1,2})$/`,
        },
        required: false,
    })
    symbols_groupings!: Record<string, string> | undefined;
}
