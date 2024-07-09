import { createQuery } from '@tanstack/svelte-query';
import { customFetch } from 'shared-code/utils/fetch';
import type { GetTodosResponse } from 'shared-code/models/Api';
import { QUERY_KEYS } from './queryKeys';

export const useGetTodosQuery = () =>
    createQuery({
        queryKey: [QUERY_KEYS.GET_TODOS],
        queryFn: () => customFetch<GetTodosResponse>({ endpoint: 'todos', method: 'GET' }),
        staleTime: Infinity
    });
