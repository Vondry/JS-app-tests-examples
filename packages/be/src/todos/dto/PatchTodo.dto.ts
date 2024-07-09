import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import type { Todo } from 'shared-code/models/Todo';

export class PatchTodoDto implements Partial<Todo> {
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    completed: boolean;
}
