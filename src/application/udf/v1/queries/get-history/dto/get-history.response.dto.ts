import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';

export class V1GetHistoryBaseResponseDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Status of the response',
        example: 'ok',
        enum: ['ok', 'error', 'no_data'],
    })
    s!: string;
}

export class V1GetHistoryOkResponseDto {
    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'Time of items found',
    })
    t!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'Closing prices',
    })
    c!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'Opening prices',
    })
    o!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'Highest prices',
    })
    h!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'Lowest prices',
    })
    l!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'Volume',
    })
    v!: number[];
}

export class V1GetHistoryErrorResponseDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Error message',
        example: 'It is an error',
    })
    errmsg!: string;
}

export class V1GetHistoryNoDataResponseDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Next time Data will be available (Unix Seconds)',
        example: 1630000000,
    })
    nextTime!: number;
}

export class V1GetHistoryResponseDto extends IntersectionType(
    V1GetHistoryBaseResponseDto,
    PartialType(V1GetHistoryOkResponseDto),
    PartialType(V1GetHistoryErrorResponseDto),
    PartialType(V1GetHistoryNoDataResponseDto),
) {}
