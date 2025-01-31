import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import type { TodoDescription } from 'shared-code/models/Todo';
import TodoInput from '../TodoInput.vue';

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

        render(TodoInput, {
            props: {
                modelValue: todo,
                onSubmit: onSubmit
            }
        });

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
        const { rerender } = render(TodoInput, {
            props: {
                modelValue: '',
                onSubmit: onSubmit,
                'onUpdate:modelValue': (todo: TodoDescription) => {
                    rerender({ modelValue: todo });
                }
            }
        });

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
        render(TodoInput, {
            props: {
                modelValue: '   ',
                onSubmit: onSubmit
            }
        });

        // ACT

        // 💡 Change button name and observe the error. Then change getByRole to queryByRole and check it again.
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
        // getBy - throws error if element is not found
        // queryBy - returns null if element is not found

        // ASSERT
        expect(onSubmit).not.toHaveBeenCalled();
    });
});
