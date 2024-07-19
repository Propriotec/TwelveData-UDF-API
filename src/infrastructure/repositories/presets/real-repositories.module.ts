import { type ClassProvider, Global, Module } from '@nestjs/common';

export const REPOSITORIES: ClassProvider[] = [];

@Global()
@Module({
    providers: [...REPOSITORIES],
    exports: REPOSITORIES.map((provider) => provider),
})
export class RealRepositoriesModule {}
