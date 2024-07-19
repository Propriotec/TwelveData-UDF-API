import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';

import { TwelveDataConfigService } from '@/infrastructure/config/configs/twelvedata-config.service';
import { TwelveDataService } from '@/infrastructure/twelvedata/twelvedata.service';

@Global()
@Module({
    imports: [
        HttpModule.registerAsync({
            inject: [TwelveDataConfigService],
            useFactory: (config: TwelveDataConfigService) => ({
                baseURL: 'https://api.twelvedata.com',
                headers: {
                    Authorization: `apikey ${config.apiKey}`,
                },
            }),
        }),
    ],
    providers: [TwelveDataService],
    exports: [TwelveDataService],
})
export class TwelveDataModule implements OnModuleInit {
    private readonly logger = new Logger(TwelveDataModule.name);

    constructor(private readonly http: HttpService) {}

    async onModuleInit() {
        const result = await this.http.axiosRef
            .get('/api_usage')
            .then((response) => response.status === 200)
            .catch((error: unknown) => {
                this.logger.error(error);
                return false;
            });

        if (!result) {
            this.logger.error(
                'TwelveData API key is invalid or has exceeded the rate limit.',
            );
            throw new Error(
                'TwelveData API key is invalid or has exceeded the rate limit.',
            );
        }

        this.logger.log('TwelveData API key is valid and ready to go.');
    }
}
