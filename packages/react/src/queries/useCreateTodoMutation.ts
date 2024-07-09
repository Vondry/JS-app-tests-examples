import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customFetch } from 'shared-code/utils/fetch';
import type { TodoDescription } from 'shared-code/models/Todo';
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
        onSuccess: () => queryClient.refetchQueries({ queryKey: [QUERY_KEYS.GET_TODOS] })
    });
};
