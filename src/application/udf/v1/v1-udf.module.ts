import { ClassProvider, Module, Type } from '@nestjs/common';

const QueryHandlers: ClassProvider[] = [];
const QueryControllers: Type[] = [];

const CommandHandlers: ClassProvider[] = [];
const CommandControllers: Type[] = [];

const EventHandlers: ClassProvider[] = [];

@Module({
    imports: [],
    controllers: [...QueryControllers, ...CommandControllers],
    providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class V1UDFModule {}
