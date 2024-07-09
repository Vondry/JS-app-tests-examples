import * as path from 'path';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from '../utils/env/env.service';
import { MIGRATIONS_TABLE } from '../../migrations/config';
import { TodosEntity } from '../todos/entity/todos.entity';

const migrationsPath = path.join(__dirname, '..', '..', 'migrations', 'history', '*.js');

export const getDbConfig = (envService: EnvService) =>
    ({
        type: 'postgres',
        host: envService.get('DATABASE_HOST'),
        port: envService.get('DATABASE_PORT'),
        username: envService.get('DATABASE_USER'),
        password: envService.get('DATABASE_PASSWORD'),
        database: envService.get('DATABASE_NAME'),
        ssl: envService.get('DATABASE_SSL_CA')
            ? {
                  ca: envService.get('DATABASE_SSL_CA'),
                  rejectUnauthorized: true
              }
            : undefined,
        entities: [TodosEntity],
        migrationsTableName: MIGRATIONS_TABLE,
        migrations: [migrationsPath],
        migrationsRun: true,
        synchronize: false,
        retryAttempts: 1,
        autoLoadEntities: false
    }) satisfies TypeOrmModuleOptions;
