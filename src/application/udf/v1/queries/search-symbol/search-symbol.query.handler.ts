import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import { V1SearchSymbolResponseDto } from '@/application/udf/v1/queries/search-symbol/dto/search-symbol.response.dto';
import { V1SearchSymbolQuery } from '@/application/udf/v1/queries/search-symbol/search-symbol.query';
import { TwelveDataService } from '@/infrastructure/twelvedata/twelvedata.service';

type QueryHandlerReturnType = V1SearchSymbolResponseDto[];

@QueryHandler(V1SearchSymbolQuery)
export class V1SearchSymbolQueryHandler
    implements IQueryHandler<V1SearchSymbolQuery, QueryHandlerReturnType>
{
    private readonly logger = new Logger(V1SearchSymbolQueryHandler.name);

    constructor(private readonly twelveDataService: TwelveDataService) {}

    static runHandler(
        bus: QueryBus,
        query: V1SearchSymbolQuery,
    ): Promise<QueryHandlerReturnType> {
        return bus.execute(
            new V1SearchSymbolQuery(query.symbol, query.exchange),
        );
    }

    async execute(query: V1SearchSymbolQuery): Promise<QueryHandlerReturnType> {
        this.logger.log('Executing...');

        const symbols = await this.twelveDataService
            .searchSymbol({
                symbol: query.symbol,
            })
            .then((response) =>
                response.filter((symbol) =>
                    query.exchange ? symbol.exchange === query.exchange : true,
                ),
            );

        this.logger.log(
            `Executed successfully. ${symbols.length.toString()} symbol found.`,
        );

        return symbols.map((symbol) => ({
            description: symbol.instrument_name,
            exchange: symbol.exchange,
            symbol: symbol.symbol,
            ticker: `${symbol.symbol}:${symbol.exchange}`,
            full_name: symbol.instrument_name,
            type: symbol.instrument_type,
        }));
    }
}
