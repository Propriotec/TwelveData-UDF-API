import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class V1ResolveSymbolQueryDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'The symbol to get',
        example: 'AAPL',
    })
    @IsString()
    symbol!: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'The exchange mic-code to get',
        example: 'XDXC',
    })
    exchange!: string;
}
