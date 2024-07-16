import { http, HttpResponse } from 'msw';
import type { GetTodosResponse, PatchTodoResponse, CreateTodoResponse, DeleteTodoResponse } from '../models/Api';
import { completeTodo, createTodo, deleteTodo, getTodos } from './handlers';

const API = 'http://localhost:3000/todos';

export const handlers = [
    // Getting TODOs
    http.get<never, never, GetTodosResponse>(API, () => HttpResponse.json(getTodos())),


    // For creating TODO item
    http.post<never, { description: string }, CreateTodoResponse>(API, async ({
                                                                                  request
                                                                              }) => {
        const { description } = await request.json();
        return HttpResponse.json(createTodo({ description }));
    }),

    // For completing TODOs
    http.patch<{ id: string }, { completed: boolean }, PatchTodoResponse>(`${API}/:id`, async ({
                                                                                                   request,
                                                                                                   params
                                                                                               }) => {
        const { completed } = await request.json();
        const { id } = params;

        return HttpResponse.json(completeTodo({ id, completed }));
    }),

    // For completing TODOs
    http.delete<{ id: string }, never, DeleteTodoResponse>(`${API}/:id`, () => {
        // No logic for deletion is needed
        return HttpResponse.json(deleteTodo());
    })
] as const;
