import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosEntity } from './entity/todos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TodosEntity])],
    providers: [TodosService],
    exports: [TodosService]
})
export class TodosModule {}
