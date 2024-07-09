import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { Todo } from 'shared-code/models/Todo';

type Props = {
    todo: Todo;
    onTodoCompleted: (todo: Todo) => void;
    onTodoDelete: (todo: Todo) => void;
};

export const TodoItem = ({ todo, onTodoCompleted, onTodoDelete }: Props) => (
    <div className="flex gap-2 items-center justify-between border border-gray-400 dark:border-gray-500 rounded-lg px-2.5 py-2">
        <button
            className="flex gap-2 items-center cursor-pointer group px-2 py-2"
            onClick={() => onTodoCompleted(todo)}
        >
            {todo.completed ? (
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    title="Press to uncomplete"
                    className="text-xl text-green-500"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faCircle}
                    title="Press to complete"
                    className="text-xl text-gray-400 group-hover:text-green-500 group-focus:text-green-500"
                />
            )}
            <span>{todo.description}</span>
        </button>
        <button
            onClick={() => onTodoDelete(todo)}
            className="group px-2 py-2"
            title="Press to remove"
        >
            <FontAwesomeIcon
                icon={faXmark}
                className="text-xl text-gray-400 group-hover:text-red-500 group-focus:text-red-500"
            />
            <span className="sr-only">Remove todo</span>
        </button>
    </div>
);
