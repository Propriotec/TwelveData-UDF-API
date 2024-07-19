import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class V1SearchSymbolQueryDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Symbol to search for',
        example: 'AAPL',
    })
    @IsString()
    query!: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'Exchange to search in',
        example: 'NASDAQ',
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }: { value: string | undefined }) =>
        value === '' ? undefined : value,
    )
    exchange?: string;
}
