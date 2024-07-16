import { ClassProvider, Module, Type } from '@nestjs/common';

import { V1GetConfigController } from '@/application/udf/v1/queries/get-config/get-config.http.controller';
import { V1GetConfigQueryHandler } from '@/application/udf/v1/queries/get-config/get-config.query.handler';

const QueryHandlers: Type[] = [V1GetConfigQueryHandler];
const QueryControllers: Type[] = [V1GetConfigController];

const CommandHandlers: Type[] = [];
const CommandControllers: Type[] = [];

const EventHandlers: ClassProvider[] = [];

@Module({
    imports: [],
    controllers: [...QueryControllers, ...CommandControllers],
    providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class V1UDFModule {}
