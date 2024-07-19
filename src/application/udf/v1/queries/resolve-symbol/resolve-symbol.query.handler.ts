import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import { V1ResolveSymbolResponseDto } from '@/application/udf/v1/queries/resolve-symbol/dto/resolve-symbol.response.dto';
import { V1ResolveSymbolQuery } from '@/application/udf/v1/queries/resolve-symbol/resolve-symbol.query';
import { TwelveDataService } from '@/infrastructure/twelvedata/twelvedata.service';

type QueryHandlerReturnType = V1ResolveSymbolResponseDto;

@QueryHandler(V1ResolveSymbolQuery)
export class V1ResolveSymbolQueryHandler
    implements IQueryHandler<V1ResolveSymbolQuery, QueryHandlerReturnType>
{
    private readonly logger = new Logger(V1ResolveSymbolQueryHandler.name);

    constructor(private readonly twelveDataService: TwelveDataService) {}

    static runHandler(
        bus: QueryBus,
        query: V1ResolveSymbolQuery,
    ): Promise<QueryHandlerReturnType> {
        return bus.execute(
            new V1ResolveSymbolQuery(query.symbol, query.exchange),
        );
    }

    async execute(
        query: V1ResolveSymbolQuery,
    ): Promise<QueryHandlerReturnType> {
        this.logger.log('Executing...');

        const symbol = await this.twelveDataService.resolveSymbol(
            query.symbol,
            query.exchange,
        );

        this.logger.log(
            `Executed successfully. ${JSON.stringify(symbol)} symbol found.`,
        );

        return Promise.resolve({
            name: symbol.symbol,
            ticker: `${symbol.symbol}:${symbol.exchange}`,
            description: symbol.instrument_name,
            timezone: symbol.exchange_timezone,

            type: symbol.instrument_type,

            listed_exchange: symbol.exchange,
            exchange: symbol.exchange,

            minmov: 1,
            minmov2: 0,

            pointvalue: 1,

            has_intraday: true,

            visible_plots_set: 'ohlcv',

            pricescale: 10000,
        });
    }
}
