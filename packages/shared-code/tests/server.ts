import {http, HttpResponse} from "msw";
import {setupServer} from "msw/node";
import {GET_TODOS} from "./todos.fixtures";
import {GetTodosResponse, PatchTodoResponse, CreateTodoResponse, DeleteTodoResponse} from '../models/Api';

// Simulates getting TODO from DB
const findTodoById = (id: string) => GET_TODOS.find((todo) => todo.id === Number(id))!;

export const todoServer = setupServer();

const API = 'http://localhost:3000/todos';

const handlers = [
    // Getting TODOs
    http.get<never, never, GetTodosResponse>(API, () => HttpResponse.json(GET_TODOS)),


    // For creating TODO item
    http.post<never, { description: string }, CreateTodoResponse>(API, async ({
                                                                                  request,
                                                                              }) => {
        const {description} = await request.json();

        return HttpResponse.json({
            id: 100,
            description,
            completed: false,
            created_at: new Date(),
            updated_at: new Date()
        })
    }),

    // For completing TODOs
    http.patch<{ id: string }, { completed: boolean }, PatchTodoResponse>(`${API}/:id`, async ({
                                                                                                   request,
                                                                                                   params
                                                                                               }) => {
        const data = await request.json();
        const {id} = params;
        const todo = findTodoById(id);
        return HttpResponse.json({...todo, ...data})
    }),


    // For completing TODOs
    http.delete<{ id: string }, never, DeleteTodoResponse>(`${API}/:id`, () => {
        // No logic for deletion is needed
        return HttpResponse.json(true)
    }),
] as const;

todoServer.use(...handlers);
