import { GET_TODOS } from './todos.fixtures';
import type { Todo } from '../models/Todo';

const findTodoById = (id: string) => GET_TODOS.find((todo) => todo.id === Number(id))!;

// This file simulates API BE logic and functions below are used in
//   - msw handlers (for unit and integration tests)
//   - cypress intercepts (for e2e tests)

export const getTodos = () => GET_TODOS;

export const createTodo = ({ description }: { description: string }): Todo => ({
    id: 100,
    description,
    completed: false,
    created_at: new Date(),
    updated_at: new Date()
} as const);

export const completeTodo = ({ id, completed }: { id: string, completed: boolean }): Todo => ({
    ...findTodoById(id),
    completed
} as const);

export const deleteTodo = () => true /* true => marks successful deletion */;
