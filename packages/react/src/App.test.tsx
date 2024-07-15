import { describe, expect, beforeAll, afterAll, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { todoServer } from 'shared-code/tests/server';
import { GET_TODOS } from 'shared-code/tests/todos.fixtures';
import { App } from './App';
import { Providers } from './Providers';

describe(App.name, () => {
    beforeAll(() => {
        todoServer.listen();
    });

    afterAll(() => {
        todoServer.close();
    });

    test('all fetched todos are visible for the user', async () => {
        render(
            <Providers>
                <App />
            </Providers>
        );

        // Iterate over all todos, that the API returns
        for (const todo of GET_TODOS) {
            // find each item by it's description
            const item = await screen.findByText(todo.description);

            // check that item is in the document and it is visible for the user
            expect(item).toBeVisible();
        }
    });

    test('todo can be created', async () => {
        render(
            <Providers>
                <App />
            </Providers>
        );
        const newTodoDescription = 'I need to walk out my 🐕!';

        await userEvent.type(
            screen.getByLabelText('Enter your TODO description'),
            newTodoDescription
        );
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

        // Find the rendered item by specified test-id in the component
        expect(await screen.findByText(newTodoDescription)).toBeInTheDocument();
    });

    test("todo can be completed by clicking on it's description", async () => {
        render(
            <Providers>
                <App />
            </Providers>
        );

        // Find todo item that is not yet completed
        const uncompletedTodo = GET_TODOS.find((todo) => !todo.completed)!;

        // Find the rendered item by specified test-id in the component
        const component = await screen.findByTestId(`todo-${uncompletedTodo.id}`);

        // Check that item is in fact uncompleted
        expect(await within(component).findByTitle('Press to complete')).toBeInTheDocument();

        // Click on the description, that should trigger completion request
        await userEvent.click(await within(component).findByText(uncompletedTodo.description));

        // Check that item is now completed
        expect(await within(component).findByTitle('Press to uncomplete')).toBeInTheDocument();
    });

    test('todo can be deleted', async () => {
        render(
            <Providers>
                <App />
            </Providers>
        );

        // User chooses eg. first todo item that is going to be deleted
        const firstTodo = GET_TODOS[0];

        // Find the rendered item by specified test-id in the component
        const component = await screen.findByTestId(`todo-${firstTodo.id}`);

        // Click on the delete button, that should trigger deletion request
        await userEvent.click(await within(component).findByText('Remove todo'));

        // Check that item is no longer in the DOM (can not be found)
        await expect(screen.findByText(firstTodo.description)).rejects.toThrow();
    });
});
