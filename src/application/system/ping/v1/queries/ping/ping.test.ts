import { EventBus } from '@nestjs/cqrs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { MainConfigService } from '@/application/system/config/configs/main-config.service';
import { V1PingController } from '@/application/system/ping/v1/queries/ping/ping.controller';

describe('pingController (e2e)', () => {
    let app: NestExpressApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [V1PingController],
            providers: [
                {
                    provide: MainConfigService,
                    useValue: {
                        APP_NAME: 'Test App',
                    },
                },
                {
                    provide: EventBus,
                    useValue: {
                        publish: jest.fn(),
                    },
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication<NestExpressApplication>();

        await app.init();
    });

    it('/ping (GET)', () => {
        return request(app.getHttpServer())
            .get('/ping')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    message: 'OK',
                    serverTime: expect.any(String),
                    appName: 'Test App',
                });
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
