/// <reference types="cypress" />

import { GET_TODOS } from 'shared-code/tests/todos.fixtures';
import { cypressIntercepts } from 'shared-code/tests/cypress.intercepts';

describe('App E2E tests', () => {
    before(() => {
        cypressIntercepts();
        // Visit homepage
        cy.visit('/');

        cy.wait('@getTodos');
    });

    it('user can see rendered todos', () => {
        for (const todo of GET_TODOS) {
            //  Get the DOM element containing the text and assert that it is visible
            cy.contains(todo.description).should('be.visible');
        }
    });
});
