/// <reference types="cypress" />

import { GET_TODOS } from './todos.fixtures';

export const cypressIntercepts = () => {
    cy.intercept({ method: 'GET', url: 'http://localhost:3000/todos' }, GET_TODOS).as(
        'getTodos'
    );
}
