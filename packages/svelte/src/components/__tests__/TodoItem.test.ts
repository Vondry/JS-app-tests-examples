import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { Todo } from 'shared-code/models/Todo';
import TodoItem from '../TodoItem.svelte';

/**
 * 💡 Explanation of used element selectors (find more info in docs):
 *
 *  ByTitle -> Returns the element that has the matching title attribute or a title element within an SVG.
 *
 *  ByText - Search for all elements that have a text node with textContent matching the given TextMatch.
 */

describe('TodoItem', () => {
    test('User can interact with the component', async () => {
        // ARRANGE
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: false,
            created_at: new Date(),
            updated_at: new Date()
        };

        const onTodoCompletedEvent = vi.fn();
        const onTodoDeleteEvent = vi.fn();

        const { component } = render(TodoItem, { props: { todo } });
        component.$on('todoCompleted', (e: CustomEvent<Todo>) => onTodoCompletedEvent(e.detail));
        component.$on('todoDelete', (e: CustomEvent<Todo>) => onTodoDeleteEvent(e.detail));

        // ❓ What is wrong with following ACT and ASSERT?
        //      -> What edge case that programmer could have done, it does not test? :)

        // ACT
        await userEvent.click(screen.getByText('I need to clean the car'));
        await userEvent.click(screen.getByText('Remove todo'));

        // ASSERT

        // Assert that events were emitted only once
        expect(onTodoCompletedEvent).toHaveBeenCalledOnce();
        expect(onTodoDeleteEvent).toHaveBeenCalledOnce();

        // Assert value of events
        expect(onTodoCompletedEvent).toHaveBeenLastCalledWith(todo);
        expect(onTodoDeleteEvent).toHaveBeenLastCalledWith(todo);
    });

    test('User sees "uncompleted" icon, when todo is not completed ', async () => {
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: false,
            created_at: new Date(),
            updated_at: new Date()
        };

        render(TodoItem, { props: { todo } });

        // Fa icon component from @fortawesome does not accept title prop as it does in React or Vue
        expect(screen.getByText('Press to complete')).toBeDefined();
    });

    test('User sees "completed" icon, when todo is completed ', async () => {
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: true,
            created_at: new Date(),
            updated_at: new Date()
        };

        render(TodoItem, { props: { todo } });

        // Fa icon component from @fortawesome does not accept title prop as it does in React or Vue
        expect(screen.getByText('Press to uncomplete')).toBeDefined();
    });
});
