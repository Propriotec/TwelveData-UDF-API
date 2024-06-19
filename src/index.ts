import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from '@/application/app.module';
import { MainConfigService } from '@/application/config/configs/main-config.service';
import { StandardHttpResponseInterceptor } from '@/shared/interceptors/standard-http-response.interceptor';
import { otelSDK } from '@/shared/utilities/tracing';

const bootstrap = async () => {
    otelSDK.start();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        snapshot: true,
        abortOnError: process.env.NODE_ENV === 'production',
        bufferLogs: true,
        rawBody: true,
    });

    // Getting the logger
    const logger = new Logger('bootstrap');

    // Getting the MainConfigService
    const mainConfig = app.get(MainConfigService);

    // Setting up the global pipes and interceptors
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new StandardHttpResponseInterceptor());
    app.useLogger(app.get(PinoLogger));

    // Express Middleware
    app.use(helmet());

    // Enabling NestJS features
    app.enableCors();
    app.enableVersioning();
    app.enableShutdownHooks();

    // Swagger/OpenAPI Setup
    const config = new DocumentBuilder()
        .setTitle('EnterpriseNest API')
        .setExternalDoc('Postman Collection', '/openapi-json')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    if (mainConfig.NODE_ENV !== 'production') {
        SwaggerModule.setup('openapi', app, document);
    }

    // Starting the application
    await app
        .listen(mainConfig.PORT)
        .then(() => {
            logger.log(`Application is running on port ${mainConfig.PORT}`);
        })
        .catch((error) => {
            logger.error(error);

            process.exit(1);
        });
};

bootstrap().catch((error: unknown) => {
    // eslint-disable-next-line no-console -- This is a CLI application
    console.error(error);
    process.exit(1);
});
