import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customFetch } from 'shared-code/utils/fetch';
import type { Todo } from 'shared-code/models/Todo';
import type { DeleteTodoResponse } from 'shared-code/models/Api';
import { QUERY_KEYS } from './queryKeys';

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: Todo) =>
            customFetch<DeleteTodoResponse>({
                endpoint: `todos/${todo.id}`,
                method: 'DELETE'
            }),
        onSuccess: (wasDeleted, deletedTodo) => {
            if (wasDeleted) {
                // Remove deleted item from query cache if deletion was successfully
                return queryClient.setQueryData<Todo[]>([QUERY_KEYS.GET_TODOS], (cachedTodos) =>
                    cachedTodos?.filter((cachedTodo) => cachedTodo.id !== deletedTodo.id)
                );
            }
        }
    });
};
