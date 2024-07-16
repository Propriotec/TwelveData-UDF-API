import { z } from 'zod';

const StringToNumber = z.preprocess((x) => Number(x), z.number());
const StringToNumberOptional = z.preprocess(
    (x) => Number(x),
    z.number().optional(),
);
const StringToBoolean = z.preprocess((x) => x === 'true', z.boolean());

export const ConfigSchema = z.object({
    // Main
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: StringToNumber.default(3000),
    APP_NAME: z.string().default('EnterpriseNest'),
    BEHIND_PROXY: StringToBoolean.default('false'),
    DEBUG: StringToBoolean.default('false'),

    // Redis
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: StringToNumber.default(6379),
    REDIS_DB: StringToNumber.default(0),
    REDIS_USERNAME: z.string().default(''),
    REDIS_PASSWORD: z.string().default(''),

    // Cache
    CACHE_TTL_MS: StringToNumber.default(60000),
    CACHE_USE_REDIS: StringToBoolean.default('false'),

    // Throttler / Rate Limiter
    THROTTLER_DEFAULT_TTL_MS: StringToNumber.default(60000),
    THROTTLER_DEFAULT_LIMIT: StringToNumber.default(100),
    THROTTLER_USE_REDIS: StringToBoolean.default('false'),

    // JWT
    JWT_SECRET: z.string(),

    // Email
    EMAIL_FROM: z.string().email().default('no-reply@test.com'),

    // Twelve Data
    TWELVE_DATA_API_KEY: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
