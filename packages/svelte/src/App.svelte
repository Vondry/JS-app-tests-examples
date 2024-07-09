<script lang="ts">
    import TodoInput from './components/TodoInput.svelte';
    import TodoList from './components/TodoList.svelte';
    import type { Todo } from 'shared-code/models/Todo';
    import { useGetTodosQuery } from './queries/useGetTodosQuery';
    import { useCreateTodoMutation } from './queries/useCreateTodoMutation';
    import { useCompleteTodoMutation } from './queries/useCompleteTodoMutation';
    import { useDeleteTodoMutation } from './queries/useDeleteTodoMutation';

    let todo = '';
    const todosQuery = useGetTodosQuery();
    const createTodoMutation = useCreateTodoMutation();
    const completeTodoMutation = useCompleteTodoMutation();
    const deleteTodoMutation = useDeleteTodoMutation();

    const createTodo = () => {
        $createTodoMutation.mutate(todo);
        todo = '';
    };

    const completeTodo = (event: CustomEvent<Todo>) => {
        $completeTodoMutation.mutate(event.detail);
    };

    const deleteTodo = (event: CustomEvent<Todo>) => {
        $deleteTodoMutation.mutate(event.detail);
    };
</script>

<main class="flex-1">
    <div class="container flex-col gap-6">
        <TodoInput bind:todo on:submit={createTodo} />
        <TodoList
            todos={$todosQuery.data ?? []}
            on:todoCompleted={completeTodo}
            on:todoDelete={deleteTodo}
        />
    </div>
</main>
