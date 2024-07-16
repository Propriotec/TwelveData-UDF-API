import type { ClassProvider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

export const MOCK_REPOSITORIES: ClassProvider[] = [];

@Global()
@Module({
    providers: [...MOCK_REPOSITORIES],
    exports: MOCK_REPOSITORIES.map((provider) => provider),
})
export class MockRepositoriesModule {}
