import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard } from '@nestjs/throttler';
import { OpenTelemetryModule } from 'nestjs-otel';

import { HealthModule } from '@/application/health/health.module';
import { PingModule } from '@/application/ping/ping.module';
import { UDFModule } from '@/application/udf/udf.module';
import { CacheModule } from '@/infrastructure/cache/cache.module';
import { ConfigModule } from '@/infrastructure/config/config.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { MailerModule } from '@/infrastructure/mailer/mailer.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { ThrottlerModule } from '@/infrastructure/throttler/throttler.module';
import { TwelveDataModule } from '@/infrastructure/twelvedata/twelvedata.module';

@Module({
    imports: [
        // System Modules
        CqrsModule, // CQRS Module for Command Query Responsibility Segregation
        ConfigModule, // Configuration Module
        CacheModule, // Cache Module
        LoggerModule, // Logger Module
        ThrottlerModule, // Throttler Module
        RepositoriesModule, // Repositories Module
        ScheduleModule.forRoot(), // Schedule Module for Cron Jobs
        OpenTelemetryModule.forRoot({
            metrics: {
                hostMetrics: true,
                apiMetrics: {
                    enable: true,
                },
            },
        }), // OpenTelemetry Module for Tracing
        MailerModule, // Email Module

        // Application Modules
        HealthModule,
        PingModule,
        TwelveDataModule,
        UDFModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
