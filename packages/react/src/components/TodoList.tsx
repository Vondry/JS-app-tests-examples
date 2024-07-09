import type { Todo } from 'shared-code/models/Todo';
import { TodoItem } from './TodoItem';

type Props = {
    todos: Todo[];
    onTodoCompleted: (todo: Todo) => void;
    onTodoDelete: (todo: Todo) => void;
};

export const TodoList = ({ todos, onTodoCompleted, onTodoDelete }: Props) => (
    <ul className="flex flex-col gap-2.5">
        {todos.map((todo) => (
            <li key={todo.id}>
                <TodoItem
                    todo={todo}
                    onTodoCompleted={onTodoCompleted}
                    onTodoDelete={onTodoDelete}
                />
            </li>
        ))}
    </ul>
);
