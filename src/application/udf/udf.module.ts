import { Module } from '@nestjs/common';

import { V1UDFModule } from '@/application/udf/v1/v1-udf.module';

@Module({
    imports: [V1UDFModule],
    controllers: [],
    providers: [],
})
export class UDFModule {}
