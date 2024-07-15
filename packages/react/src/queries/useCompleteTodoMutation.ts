import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customFetch } from 'shared-code/utils/fetch';
import type { Todo } from 'shared-code/models/Todo';
import type { PatchTodoResponse } from 'shared-code/models/Api';
import { QUERY_KEYS } from './queryKeys';

export const useCompleteTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: Todo) =>
            customFetch<PatchTodoResponse>(
                {
                    endpoint: `todos/${todo.id}`,
                    method: 'PATCH'
                },
                { completed: !todo.completed }
            ),
        onSuccess: (updatedTodo) => {
            // Update query cache with the updated item returned from BE
            return queryClient.setQueryData<Todo[]>([QUERY_KEYS.GET_TODOS], (cachedTodos) =>
                cachedTodos?.map((cachedTodo) =>
                    cachedTodo.id === updatedTodo.id ? updatedTodo : cachedTodo
                )
            );
        }
    });
};
