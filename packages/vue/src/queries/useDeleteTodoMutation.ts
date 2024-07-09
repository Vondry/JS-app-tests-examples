import { useMutation, useQueryClient } from '@tanstack/vue-query';
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
        onSuccess: () => queryClient.refetchQueries({ queryKey: [QUERY_KEYS.GET_TODOS] })
    });
};
