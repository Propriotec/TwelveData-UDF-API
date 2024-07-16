import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TwelveDataService {
    private readonly logger = new Logger(TwelveDataService.name);

    constructor(private readonly http: HttpService) {}

    async getApiUsage() {
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
