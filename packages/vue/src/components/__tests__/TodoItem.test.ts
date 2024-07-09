import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import type { Todo } from 'shared-code/models/Todo';
import TodoItem from '../TodoItem.vue';

/**
 * 💡 Explanation of used element selectors (find more info in docs):
 *
 *  ByTitle -> Returns the element that has the matching title attribute or a title element within an SVG.
 *
 *  ByText - Search for all elements that have a text node with textContent matching the given TextMatch.
 */

describe('TodoItem', () => {
    test('User can submit non-empty todo', async () => {
        // ARRANGE
        const todo: Todo = {
            id: 1,
            description: 'I need to clean the car',
            completed: false,
            created_at: new Date(),
            updated_at: new Date()
        };

        const { emitted } = render(TodoItem, { props: { todo } });

        // ❓ What is wrong with following ACT and ASSERT?
        //      -> What edge case that programmer could have done, it does not test? :)

        // ACT
        await userEvent.click(screen.getByText('I need to clean the car'));
        await userEvent.click(screen.getByText('Remove todo'));

        // ASSERT
        // see https://test-utils.vuejs.org/guide/essentials/event-handling#Asserting-the-arguments-of-the-event
        const onTodoCompletedEvent = emitted('onTodoCompleted');
        const onTodoDeleteEvent = emitted('onTodoDelete');

        // Assert that events were emitted only once
        expect(onTodoCompletedEvent).toHaveLength(1);
        expect(onTodoDeleteEvent).toHaveLength(1);

        // Assert value of events (notice that value is wrapped in an array)
        expect(onTodoCompletedEvent[0]).toStrictEqual([todo]);
        expect(onTodoDeleteEvent[0]).toStrictEqual([todo]);
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

        render(TodoItem, { props: { todo } });

        expect(screen.getByTitle('Press to uncomplete')).toBeDefined();
    });
});
