import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TodoInput from '../TodoInput.svelte';

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

describe('TodoInput', () => {
    test('User can submit non-empty todo', async () => {
        // ARRANGE
        const onSubmit = vi.fn();
        const todo = 'I need to go out with my 🐕';

        const { component } = render(TodoInput, { props: { todo } });
        component.$on('submit', onSubmit);

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

        const { component } = render(TodoInput, { props: { todo: '' } });
        component.$on('submit', onSubmit);

        // ACT

        // simulate user typing to the input
        await userEvent.type(screen.getByLabelText('Enter your TODO description'), 'Go out!');

        // and submit form
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

        // ASSERT
        expect(screen.getByDisplayValue('Go out!')).toBeDefined();
        expect(onSubmit).toHaveBeenCalledOnce();
    });

    test('User can not submit empty todo', async () => {
        // ARRANGE
        const onSubmit = vi.fn();
        const { component } = render(TodoInput, { props: { todo: '' } });
        component.$on('submit', onSubmit);

        // ACT

        // 💡 Change button name and observe the error. Then change getByRole to queryByRole and check it again.
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
        // queryBy - throws error if element is not found
        // getBy - returns null if element is not found

        // ASSERT
        expect(onSubmit).not.toHaveBeenCalled();
    });
});
