import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class V1GetHistoryParamsDto {
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
        example: '1day',
    })
    @IsString()
    resolution!: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'The start unixTime of the history',
        example: new Date().getTime(),
    })
    @IsNumberString()
    from!: Date;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'The end unixTime of the history',
        example: new Date().getTime(),
    })
    @IsNumberString()
    to!: Date;
}
