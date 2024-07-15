import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { customFetch } from 'shared-code/utils/fetch';
import type { Todo, TodoDescription } from 'shared-code/models/Todo';
import type { CreateTodoResponse } from 'shared-code/models/Api';
import { QUERY_KEYS } from './queryKeys';

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todoDescription: TodoDescription) =>
            customFetch<CreateTodoResponse>(
                {
                    endpoint: 'todos',
                    method: 'POST'
                },
                { description: todoDescription }
            ),
        onSuccess: (createdTodo) => {
            // Add created item to query cache if creation was successful
            return queryClient.setQueryData<Todo[]>([QUERY_KEYS.GET_TODOS], (cachedTodos) =>
                (cachedTodos ?? []).concat(createdTodo)
            );
        }
    });
};
