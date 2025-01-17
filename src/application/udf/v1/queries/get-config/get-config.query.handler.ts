import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import { V1GetConfigResponseDto } from '@/application/udf/v1/queries/get-config/dto/get-config.response.dto';
import { V1GetConfigQuery } from '@/application/udf/v1/queries/get-config/get-config.query';
import { TwelveDataService } from '@/infrastructure/twelvedata/twelvedata.service';

type QueryHandlerReturnType = V1GetConfigResponseDto;

@QueryHandler(V1GetConfigQuery)
export class V1GetConfigQueryHandler
    implements IQueryHandler<V1GetConfigQuery, QueryHandlerReturnType>
{
    private readonly logger = new Logger(V1GetConfigQueryHandler.name);

    constructor(private readonly twelveDataService: TwelveDataService) {}

    static runHandler(bus: QueryBus): Promise<QueryHandlerReturnType> {
        return bus.execute(new V1GetConfigQuery());
    }

    async execute(): Promise<QueryHandlerReturnType> {
        this.logger.log('Executing...');

        const exchanges = await this.twelveDataService.getExchanges({
            withPlan: false,
        });

        const cryptoExchanges =
            await this.twelveDataService.getCryptoExchange();

        this.logger.log(
            `Executed successfully. ${exchanges.length.toString()} exchanges found.`,
        );

        return Promise.resolve({
            exchanges: [
                {
                    value: '',
                    name: 'None',
                    desc: 'View All',
                },
                {
                    value: 'COMMODITY',
                    name: 'Commodity',
                    desc: 'Commodity',
                },
                {
                    name: 'Currency',
                    desc: 'Currency',
                    value: 'PHYSICAL CURRENCY',
                },
                ...cryptoExchanges.map((exchange) => ({
                    value: exchange.name,
                    name: exchange.name,
                    desc: 'Crypto',
                })),

                ...new Set(
                    [
                        ...new Map(
                            exchanges.map((item) => [item.name, item]),
                        ).values(),
                    ].map((exchange) => ({
                        value: exchange.name,
                        name: exchange.name,
                        desc: exchange.country,
                    })),
                ),
            ],
            currency_codes: undefined,
            supported_resolutions: [
                '1',
                '5',
                '15',
                '30',
                '45',
                '60',
                '120',
                '240',
                '1D',
                '1W',
                '1M',
            ],
            supports_group_request: false,
            supports_marks: false,
            supports_search: true,
            supports_timescale_marks: false,
            supports_time: false,
            symbols_types: false,
            symbols_groupings: undefined,
        });
    }
}
