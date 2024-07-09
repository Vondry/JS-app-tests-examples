import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { TodosEntity } from './entity/todos.entity';
import { PatchTodoDto } from './dto/PatchTodo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodosEntity)
        private readonly todosEntityRepository: Repository<TodosEntity>
    ) {}

    get() {
        return this.todosEntityRepository.find({ order: { created_at: 'DESC' } });
    }

    create(todo: CreateTodoDto) {
        return this.todosEntityRepository.save(todo);
    }

    async patch(id: number, todo: PatchTodoDto) {
        const result = await this.todosEntityRepository.update({ id }, todo);
        if (result.affected) {
            return this.todosEntityRepository.findOneBy({ id });
        } else {
            return null;
        }
    }

    async delete(id: number) {
        const result = await this.todosEntityRepository.delete({ id });
        return !!result.affected;
    }
}
