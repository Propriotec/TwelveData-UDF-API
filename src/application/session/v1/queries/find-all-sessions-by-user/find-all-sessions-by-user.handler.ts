import { Inject, Logger } from '@nestjs/common';
import type { IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { Session } from '@/domain/session/session.entity';
import { SESSION_REPOSITORY } from '@/infrastructure/repositories/modules/session/session.repository.constants';
import type { SessionRepositoryPort } from '@/infrastructure/repositories/modules/session/session.repository.port';

import { V1FindAllSessionsByUserQuery } from './find-all-sessions-by-user.query';

@QueryHandler(V1FindAllSessionsByUserQuery)
export class V1FindAllSessionsByUserQueryHandler
    implements IQueryHandler<V1FindAllSessionsByUserQuery, Session[]>
{
    private readonly logger = new Logger(
        V1FindAllSessionsByUserQueryHandler.name,
    );

    constructor(
        @Inject(SESSION_REPOSITORY)
        private readonly sessionRepository: SessionRepositoryPort,
    ) {}

    static runHandler(
        bus: QueryBus,
        query: V1FindAllSessionsByUserQuery,
    ): Promise<Session[]> {
        return bus.execute<V1FindAllSessionsByUserQuery, Session[]>(
            new V1FindAllSessionsByUserQuery(query.user),
        );
    }

    execute(query: V1FindAllSessionsByUserQuery): Promise<Session[]> {
        this.logger.log(`Finding all sessions by user ${query.user.id}`);
        return this.sessionRepository.findAllByUser(query.user);
    }
}
