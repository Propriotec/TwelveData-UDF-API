import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class V1GetHistoryQueryDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'The symbol to get the history for',
        example: 'AAPL',
    })
    @IsString()
    symbol!: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'The resolution of the history',
        example: '1',
    })
    @IsString()
    resolution!: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'The start unixTime of the history',
        example:
            Number((new Date().getTime() / 1000).toFixed(0)) - 60 * 60 * 24 * 7,
    })
    @IsDate()
    @Transform(({ value }) => new Date(Number(value) * 1000))
    from!: Date;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'The end unixTime of the history',
        example: (new Date().getTime() / 1000).toFixed(0),
    })
    @IsDate()
    @Transform(({ value }) => new Date(Number(value) * 1000))
    to!: Date;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'The countback of the history',
        example: 0,
    })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    countback?: number;
}
