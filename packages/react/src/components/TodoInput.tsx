import type { FormEvent, ChangeEvent } from 'react';
import type { TodoDescription } from 'shared-code/models/Todo';

type Props = {
    onSubmit: () => void;
    onTodoChange: (todo: TodoDescription) => void;
    todo: TodoDescription;
};

export const TodoInput = ({ onSubmit, onTodoChange, todo }: Props) => {
    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => onTodoChange(e.target.value);

    return (
        <form className="w-full flex gap-3" onSubmit={onFormSubmit}>
            <div className="w-full">
                <label htmlFor="todo-input" className="sr-only">
                    Enter your TODO description
                </label>
                <input
                    id="todo-input"
                    type="text"
                    value={todo}
                    onChange={onChange}
                    placeholder="I need to..."
                    className="block w-full p-4 text-gray-900 border border-gray-400 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={!todo.trim()}
                className="text-white bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:dark:bg-gray-600 disabled:hover:dark:bg-gray-600 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
};
