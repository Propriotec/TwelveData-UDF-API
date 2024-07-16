import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { Config } from '@/infrastructure/config/config-schema';

@Injectable()
export class TwelveDataConfigService {
    constructor(
        private readonly configService: NestConfigService<Config, true>,
    ) {}

    get apiKey() {
        return this.configService.get<Config['TWELVE_DATA_API_KEY']>(
            'TWELVE_DATA_API_KEY',
        );
    }
}
