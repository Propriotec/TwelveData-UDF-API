import {
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { V1FindSessionByTokenQueryHandler } from '@/application/session/v1/queries/find-session-by-token/find-session-by-token.handler';
import { V1FindUserByIDQueryHandler } from '@/application/user/v1/queries/find-user-by-id/find-user-by-id.handler';
import { RefreshTokenPayload } from '@/domain/jwt/refresh-token-payload.type';
import { User } from '@/domain/user/user.entity';
import { AuthenticationConfigService } from '@/infrastructure/config/configs/authentication-config.service';
import { RequestWithUser } from '@/types/express/request-with-user';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'refreshToken',
) {
    private readonly logger = new Logger(RefreshTokenStrategy.name);

    constructor(
        private readonly queryBus: QueryBus,
        private readonly authenticationConfig: AuthenticationConfigService,
    ) {
        const options: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authenticationConfig.jwtRefreshSecret,
            algorithms: ['HS256', 'HS384', 'HS512'],
            passReqToCallback: true,
        };

        super(options);
    }

    async validate(
        request: RequestWithUser,
        payload: RefreshTokenPayload,
    ): Promise<User> {
        this.logger.log(`Validating Refresh Token: ${JSON.stringify(payload)}`);

        if (payload.type !== 'refresh-token') {
            throw new ForbiddenException(
                'Invalid Refresh Token: Invalid Token Type',
            );
        }

        if (!payload.data.token) {
            throw new ForbiddenException(
                'Invalid Refresh Token: Missing Token',
            );
        }

        const session = await V1FindSessionByTokenQueryHandler.runHandler(
            this.queryBus,
            {
                refreshToken: payload.data.token,
            },
        );

        if (!payload.data.ip || payload.data.ip !== request.ip) {
            throw new UnauthorizedException(
                'Invalid Refresh Token: Payload IP Mismatch with Request IP',
            );
        }

        if (!session) {
            throw new ForbiddenException(
                'Invalid Refresh Token: Session not found',
            );
        }

        if (session.ip !== payload.data.ip) {
            throw new ForbiddenException(
                'Invalid Refresh Token: Payload IP mismatch with session IP',
            );
        }

        if (session.ip !== request.ip) {
            throw new ForbiddenException(
                'Invalid Refresh Token: Session IP mismatch with request IP',
            );
        }

        const user = await V1FindUserByIDQueryHandler.runHandler(
            this.queryBus,
            {
                id: session.userId,
            },
        );

        if (!user) {
            throw new ForbiddenException(
                'Invalid Refresh Token: User not found',
            );
        }

        request.session = session;

        return Promise.resolve(user);
    }
}
