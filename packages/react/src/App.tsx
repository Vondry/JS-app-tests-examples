import { useState } from 'react';
import type { Todo, TodoDescription } from 'shared-code/models/Todo';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useGetTodosQuery } from './queries/useGetTodosQuery';
import { useCreateTodoMutation } from './queries/useCreateTodoMutation';
import { useCompleteTodoMutation } from './queries/useCompleteTodoMutation';
import { useDeleteTodoMutation } from './queries/useDeleteTodoMutation';

export const App = () => {
    const [todo, setTodo] = useState<TodoDescription>('');
    const { data: todos } = useGetTodosQuery();
    const createTodoMutation = useCreateTodoMutation();
    const completeTodoMutation = useCompleteTodoMutation();
    const deleteTodoMutation = useDeleteTodoMutation();

    const createTodo = () => {
        createTodoMutation.mutate(todo);
        setTodo('');
    };

    const completeTodo = (todo: Todo) => {
        completeTodoMutation.mutate(todo);
    };

    const deleteTodo = (todo: Todo) => {
        deleteTodoMutation.mutate(todo);
    };

    return (
        <main className="flex-1">
            <div className="container flex-col gap-6">
                <TodoInput todo={todo} onTodoChange={setTodo} onSubmit={createTodo} />
                <TodoList
                    todos={todos ?? []}
                    onTodoCompleted={completeTodo}
                    onTodoDelete={deleteTodo}
                />
            </div>
        </main>
    );
};
