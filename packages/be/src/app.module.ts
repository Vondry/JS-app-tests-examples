import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { envSchema } from './utils/env/env.schema';
import { EnvModule } from './utils/env/env.module';
import { EnvService } from './utils/env/env.service';
import { getDbConfig } from './config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: (config) => envSchema.parse(config)
        }),
        HttpModule.register({}),
        TypeOrmModule.forRootAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService) => getDbConfig(envService)
        }),
        TodosModule
    ],
    controllers: [AppController, TodosController],
    providers: [AppService]
})
export class AppModule {}
