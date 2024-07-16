import { setupServer } from 'msw/node';
import { handlers } from './msw.handlers';

export const todoServer = setupServer(...handlers);
