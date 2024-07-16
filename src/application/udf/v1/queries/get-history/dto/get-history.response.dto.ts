import { ApiProperty } from '@nestjs/swagger';

export class V1GetHistoryResponseDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'The status of the response',
        example: 'ok',
    })
    s!: string;

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'The time of items found',
    })
    t!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'The closing prices',
    })
    c!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'The opening prices',
    })
    o!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'The highest prices',
    })
    h!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'The lowest prices',
    })
    l!: number[];

    @ApiProperty({
        type: Number,
        required: true,
        isArray: true,
        description: 'The volume',
    })
    v!: number[];
}
