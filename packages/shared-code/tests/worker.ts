import { setupWorker } from 'msw/browser';
import { handlers } from './msw.handlers';

// TODO: This could potentially work instead of duplicating works using Cypress intercepts - but it does not... :(
//       @see https://github.com/mswjs/msw/issues/744
export const todoWorker = setupWorker(...handlers);
