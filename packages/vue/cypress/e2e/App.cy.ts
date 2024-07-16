/// <reference types="cypress" />
import { GET_TODOS } from 'shared-code/tests/todos.fixtures';
import { cypressIntercepts } from 'shared-code/tests/cypress.intercepts';

describe('App E2E tests', () => {
    beforeEach(() => {
        // Mock API requests with Cypress intercepts
        cypressIntercepts();

        // Visit homepage
        cy.visit('/');

        // Wait until the getTodos requests is finished before moving on
        cy.wait('@getTodos');
    });

    it('user can see rendered todos', () => {
        for (const todo of GET_TODOS) {
            //  Get the DOM element containing the text and assert that it is visible
            cy.contains(todo.description).should('be.visible');
        }
    });

    it('user can create new todos', () => {
        const newTodoDescription = 'I need to walk out my 🐕!';

        // Type the new todo description
        cy.get('input#todo-input').type(newTodoDescription);

        // Click the submit button
        cy.get('button').contains('Submit').click();

        // Assert that the new todo item is in the document
        cy.contains(newTodoDescription).should('be.visible');
    });

    it('user can completed todo', () => {
        // Find todo item that is not yet completed
        const uncompletedTodo = GET_TODOS.find((todo) => !todo.completed)!;

        // Find the rendered item by specified test-id in the component
        cy.get(`[data-testid="todo-${uncompletedTodo.id}"]`).as('todoComponent');

        // Click on the hidden text (that is there for assistive technology only)
        cy.get('@todoComponent').contains('Press to complete').click();

        // Click on the hidden text (that is there for assistive technology only)
        cy.get('@todoComponent').contains('Press to uncomplete').click();
    });

    it('user can delete todo', () => {
        // Find todo item that is not yet completed
        const lastTodo = GET_TODOS[GET_TODOS.length - 1];

        // Find the rendered item by specified test-id in the component
        cy.get(`[data-testid="todo-${lastTodo.id}"]`).as('todoComponent');

        // Check that item with that description is visible
        cy.contains(lastTodo.description).should('be.visible');

        // Click on the hidden text to remove item (that is there for assistive technology only)
        cy.get('@todoComponent').contains('Remove todo').click();

        // Check that item by this description does not exist anymore
        cy.contains(lastTodo.description).should('not.exist');
    });
});
