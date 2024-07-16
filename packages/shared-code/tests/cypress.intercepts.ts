/// <reference types="cypress" />

import { completeTodo, createTodo, deleteTodo, getTodos } from './handlers';

/**
 * NOTE: This is function is because Cypress can not handle named path segments as msw can... :(
 *
 * Extracts the last segment of a given URL.
 *
 * @example
 * // returns '123'
 * getLastUrlPathSegment('http://some-domain.com/todos/123');
 *
 * @param {string} url - The URL from which to extract the last segment.
 * @returns {string} The last segment of the URL.
 */
const getLastUrlPathSegment = (url: string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

export const cypressIntercepts = () => {
    cy.intercept({ method: 'GET', url: 'http://localhost:3000/todos' }, getTodos()).as(
        'getTodos'
    );

    cy.intercept<{ description: string }>({
        method: 'POST',
        url: 'http://localhost:3000/todos'
    }, (req) => {

        const { description } = req.body;

        return req.reply({ statusCode: 201, body: createTodo({ description }) });
    }).as(
        'createTodo'
    );

    cy.intercept<{ completed: boolean }>({
        method: 'PATCH',
        url: 'http://localhost:3000/todos/*'
    }, (req) => {

        const { completed } = req.body;
        const id = getLastUrlPathSegment(req.url);

        console.log({ id, completed });
        console.log(completeTodo({ id, completed }));
        return req.reply({ statusCode: 200, body: completeTodo({ id, completed }) });
    }).as(
        'completeTodo'
    );

    cy.intercept<{ completed: boolean }>({
        method: 'DELETE',
        url: 'http://localhost:3000/todos/*'
    }, (req) => {
        return req.reply({ statusCode: 200, body: deleteTodo() });
    }).as(
        'deleteTodo'
    );
};
