import { type ClassProvider, Global, Module } from '@nestjs/common';

import { HashingService } from '@/shared/services/hashing/hashing.service';

export const REPOSITORIES: ClassProvider[] = [];

@Global()
@Module({
    providers: [...REPOSITORIES, HashingService],
    exports: REPOSITORIES.map((provider) => provider),
})
export class RealRepositoriesModule {}
