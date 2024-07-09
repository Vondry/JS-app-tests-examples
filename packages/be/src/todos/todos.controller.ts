import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import type {
    GetTodosResponse,
    CreateTodoResponse,
    PatchTodoResponse,
    DeleteTodoResponse
} from 'shared-code/models/Api';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { PatchTodoDto } from './dto/PatchTodo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    async get(@Res() res: Response<GetTodosResponse>) {
        const todos = await this.todosService.get();
        return res.status(HttpStatus.OK).send(todos);
    }

    @Post()
    async create(@Body() todo: CreateTodoDto, @Res() res: Response<CreateTodoResponse>) {
        const createdObject = await this.todosService.create(todo);
        return res.status(HttpStatus.CREATED).send(createdObject);
    }

    @Patch(':id')
    async patch(
        @Param('id') id: number,
        @Body() todo: PatchTodoDto,
        @Res() res: Response<PatchTodoResponse>
    ) {
        const updatedObject = await this.todosService.patch(id, todo);
        return res.status(HttpStatus.OK).send(updatedObject);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response<DeleteTodoResponse>) {
        const hasBeenDeleted = await this.todosService.delete(id);
        return res.status(HttpStatus.OK).send(hasBeenDeleted);
    }
}
