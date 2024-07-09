import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import type { Todo } from 'shared-code/models/Todo';

export class CreateTodoDto implements Partial<Todo> {
    @IsString()
    @Transform(({ value }) => value.trim())
    description: string;
}
