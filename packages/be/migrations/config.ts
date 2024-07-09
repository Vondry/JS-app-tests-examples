import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { envSchema } from "../src/utils/env/env.schema";

dotenv.config();

const env = envSchema.parse(process.env);

export const MIGRATIONS_TABLE = "migrations";

const config = {
    type: "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    ssl: env.DATABASE_SSL_CA ? {
        ca: env.DATABASE_SSL_CA,
        rejectUnauthorized: true
    } : undefined,
    logging: true,
    synchronize: false,
    migrationsTableName: MIGRATIONS_TABLE,
    entities: [path.join(__dirname, "..", "src", "**", "*.entity.js")],
    migrations: [path.join(__dirname, "history", "*.js")]
} satisfies DataSourceOptions;

export default new DataSource(config);
