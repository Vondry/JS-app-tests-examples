import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import type { Todo } from 'shared-code/models/Todo';
import TodoList from '../TodoList.vue';

describe('TodoList', () => {
    test('User can see rendered todos', async () => {
        // ARRANGE
        const todos: Todo[] = [
            {
                id: 1,
                description: 'I need to clean the car',
                completed: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                description: 'I need to do house cleaning',
                completed: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ];
        render(TodoList, { props: { todos } });

        // ASSERT
        expect(screen.getByText(todos[0].description)).toBeDefined();
        expect(screen.getByText(todos[1].description)).toBeDefined();
    });
});
