import { z } from 'zod';

/**
 * Define here all envs that application is using
 */
export const envSchema = z.object({
    DATABASE_USER: z.string().min(3),
    DATABASE_PASSWORD: z.string().min(3),
    DATABASE_NAME: z.string().min(3),
    DATABASE_HOST: z.string().min(3),
    DATABASE_PORT: z.string().transform(Number).pipe(z.number()),
    DATABASE_SSL_CA: z.string().optional(),
    PORT: z.string().transform(Number).pipe(z.number())
});

export type ENV = z.infer<typeof envSchema>;
