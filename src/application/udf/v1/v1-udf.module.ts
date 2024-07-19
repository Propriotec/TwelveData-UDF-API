import { ClassProvider, Module, Type } from '@nestjs/common';

import { V1GetConfigController } from '@/application/udf/v1/queries/get-config/get-config.http.controller';
import { V1GetConfigQueryHandler } from '@/application/udf/v1/queries/get-config/get-config.query.handler';
import { V1GetHistoryController } from '@/application/udf/v1/queries/get-history/get-history.http.controller';
import { V1GetHistoryQueryHandler } from '@/application/udf/v1/queries/get-history/get-history.query.handler';
import { V1ResolveSymbolController } from '@/application/udf/v1/queries/resolve-symbol/resolve-symbol.http.controller';
import { V1ResolveSymbolQueryHandler } from '@/application/udf/v1/queries/resolve-symbol/resolve-symbol.query.handler';
import { V1SearchSymbolController } from '@/application/udf/v1/queries/search-symbol/search-symbol.http.controller';
import { V1SearchSymbolQueryHandler } from '@/application/udf/v1/queries/search-symbol/search-symbol.query.handler';

const QueryHandlers: Type[] = [
    V1GetConfigQueryHandler,
    V1GetHistoryQueryHandler,
    V1ResolveSymbolQueryHandler,
    V1SearchSymbolQueryHandler,
];
const QueryControllers: Type[] = [
    V1GetConfigController,
    V1GetHistoryController,
    V1ResolveSymbolController,
    V1SearchSymbolController,
];

const CommandHandlers: Type[] = [];
const CommandControllers: Type[] = [];

const EventHandlers: ClassProvider[] = [];

@Module({
    imports: [],
    controllers: [...QueryControllers, ...CommandControllers],
    providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class V1UDFModule {}
