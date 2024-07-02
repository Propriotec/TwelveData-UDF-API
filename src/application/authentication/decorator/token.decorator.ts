import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithUser } from '@/types/express/request-with-user';

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<RequestWithUser>();

        const authorization = request.headers.authorization;

        if (!authorization) {
            return null;
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return null;
        }

        return token;
    },
);
