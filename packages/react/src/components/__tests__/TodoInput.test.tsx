import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoInput } from '../TodoInput';

/**
 * 💡 Explanation of used element selectors (find more info in docs):
 *
 * ByLabelText -> This will search for the label that matches the given TextMatch, then find the element associated with that label.
 *
 * ByRole -> Queries for elements with the given role
 *           default roles are considered eg. <button /> has the button role without explicitly setting the role attribute.
 *
 * ByDisplayValue -> Returns the input, textarea, or select element that has the matching display value.
 */

describe(TodoInput.name, () => {
    test('User can submit non-empty todo', async () => {
        // ARRANGE
        const onSubmit = vi.fn();
        const onTodoChange = vi.fn();
        const todo = 'I need to go out with my 🐕';
        render(<TodoInput todo={todo} onSubmit={onSubmit} onTodoChange={onTodoChange} />);

        // ACT
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

        // ASSERT
        expect(onSubmit).toHaveBeenCalledOnce();

        // test that the input has visible text for the user
        expect(screen.getByDisplayValue(todo)).toBeDefined();
    });

    test('User can write and submit todo', async () => {
        // ARRANGE
        const onSubmit = vi.fn();
        const onTodoChange = vi.fn();
        const { rerender } = render(
            <TodoInput todo="" onSubmit={onSubmit} onTodoChange={onTodoChange} />
        );

        // ACT

        // simulate user typing to the input
        await userEvent.type(screen.getByLabelText('Enter your TODO description'), 'Go out!');

        // put the text back into the input
        rerender(<TodoInput todo="Go out!" onSubmit={onSubmit} onTodoChange={onTodoChange} />);

        // and submit form
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

        // ASSERT
        expect(onTodoChange).toHaveBeenNthCalledWith(1, 'G');
        expect(onTodoChange).toHaveBeenNthCalledWith(2, 'o');
        expect(onTodoChange).toHaveBeenNthCalledWith(3, ' ');
        expect(onTodoChange).toHaveBeenNthCalledWith(4, 'o');
        expect(onTodoChange).toHaveBeenNthCalledWith(5, 'u');
        expect(onTodoChange).toHaveBeenNthCalledWith(6, 't');
        expect(onTodoChange).toHaveBeenNthCalledWith(7, '!');

        expect(onSubmit).toHaveBeenCalledOnce();
    });

    test('User can not submit empty todo', async () => {
        // ARRANGE
        const onSubmit = vi.fn();
        const onTodoChange = vi.fn();
        render(<TodoInput todo="   " onSubmit={onSubmit} onTodoChange={onTodoChange} />);

        // 💡 Change button name and observe the error. Then change getByRole to queryByRole and check it again.
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
        // queryBy - throws error if element is not found
        // getBy - returns null if element is not found

        // ASSERT
        expect(onSubmit).not.toHaveBeenCalled();
    });
});
