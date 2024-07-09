import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Todo } from 'shared-code/models/Todo';
import { TodoItem } from '../TodoItem';

/**
 * 💡 Explanation of used element selectors (find more info in docs):
 *
 *  ByTitle -> Returns the element that has the matching title attribute or a title element within an SVG.
 *
 *  ByText - Search for all elements that have a text node with textContent matching the given TextMatch.
 */

describe(TodoItem.name, () => {
    test('User can interact with the component', async () => {
        // ARRANGE
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: false,
            created_at: new Date(),
            updated_at: new Date()
        };

        const onTodoCompleted = vi.fn();
        const onTodoDelete = vi.fn();
        render(
            <TodoItem todo={todo} onTodoCompleted={onTodoCompleted} onTodoDelete={onTodoDelete} />
        );

        // ❓ What is wrong with following ACT and ASSERT?
        //      -> What edge case that programmer could have done, it does not test? :)

        // ACT
        await userEvent.click(screen.getByText('I need to clean the car'));
        await userEvent.click(screen.getByText('Remove todo'));

        // ASSERT

        // Assert that callbacks were called only once
        expect(onTodoCompleted).toHaveBeenCalledOnce();
        expect(onTodoDelete).toHaveBeenCalledOnce();

        // Assert that value was passed to the callbacks
        expect(onTodoCompleted).toHaveBeenCalledWith(todo);
        expect(onTodoDelete).toHaveBeenCalledWith(todo);
    });

    test('User sees "uncompleted" icon, when todo is not completed ', async () => {
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: false,
            created_at: new Date(),
            updated_at: new Date()
        };

        render(<TodoItem todo={todo} onTodoCompleted={vi.fn()} onTodoDelete={vi.fn()} />);

        expect(screen.getByTitle('Press to complete')).toBeDefined();
    });

    test('User sees "completed" icon, when todo is completed ', async () => {
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: true,
            created_at: new Date(),
            updated_at: new Date()
        };

        render(<TodoItem todo={todo} onTodoCompleted={vi.fn()} onTodoDelete={vi.fn()} />);

        expect(screen.getByTitle('Press to uncomplete')).toBeDefined();
    });
});
