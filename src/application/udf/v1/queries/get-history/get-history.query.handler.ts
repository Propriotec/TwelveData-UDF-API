import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import {
    V1GetHistoryOkResponseDto,
    V1GetHistoryResponseDto,
} from '@/application/udf/v1/queries/get-history/dto/get-history.response.dto';
import { V1GetHistoryQuery } from '@/application/udf/v1/queries/get-history/get-history.query';
import { TwelveDataService } from '@/infrastructure/twelvedata/twelvedata.service';

type QueryHandlerReturnType = V1GetHistoryResponseDto;

@QueryHandler(V1GetHistoryQuery)
export class V1GetHistoryQueryHandler
    implements IQueryHandler<V1GetHistoryQuery, QueryHandlerReturnType>
{
    private readonly logger = new Logger(V1GetHistoryQueryHandler.name);

    constructor(private readonly twelveDataService: TwelveDataService) {}

    static runHandler(
        bus: QueryBus,
        query: V1GetHistoryQuery,
    ): Promise<QueryHandlerReturnType> {
        return bus.execute(new V1GetHistoryQuery(query));
    }

    async execute(query: V1GetHistoryQuery): Promise<QueryHandlerReturnType> {
        this.logger.log('Executing...');

        const result = await this.twelveDataService.getHistory({
            ...query,
            order: 'ASC',
        });

        if (!result.values.length) {
            this.logger.error('No data found.');

            return Promise.resolve({
                s: 'no_data',
            });
        }

        this.logger.log(
            `Executed successfully. ${result.values.length.toString()} items found.`,
        );

        const tableisedData = result.values.reduce<
            Omit<V1GetHistoryOkResponseDto, 's'>
        >(
            (acc, value) => {
                acc.t.push(
                    Number((value.datetime.getTime() / 1000).toFixed(0)),
                );
                acc.c.push(value.close);
                acc.o.push(value.open);
                acc.h.push(value.high);
                acc.l.push(value.low);
                acc.v.push(value.volume);

                return acc;
            },
            {
                t: [],
                c: [],
                o: [],
                h: [],
                l: [],
                v: [],
            },
        );

        return Promise.resolve({
            s: 'ok',
            ...tableisedData,
        });
    }
}
