<script lang="ts">
    import TodoInput from './components/TodoInput.svelte';
    import TodoList from './components/TodoList.svelte';
    import type { Todo } from 'shared-code/models/Todo';
    import { useGetTodosQuery } from './queries/useGetTodosQuery';
    import { useCreateTodoMutation } from './queries/useCreateTodoMutation';
    import { useCompleteTodoMutation } from './queries/useCompleteTodoMutation';
    import { useDeleteTodoMutation } from './queries/useDeleteTodoMutation';

    let todo = $state('');
    const todosQuery = useGetTodosQuery();
    const createTodoMutation = useCreateTodoMutation();
    const completeTodoMutation = useCompleteTodoMutation();
    const deleteTodoMutation = useDeleteTodoMutation();

    const createTodo = () => {
        createTodoMutation.mutate(todo);
        todo = '';
    };

    const completeTodo = (item: Todo) => {
        completeTodoMutation.mutate(item);
    };

    const deleteTodo = (item: Todo) => {
        deleteTodoMutation.mutate(item);
    };
</script>

<main class="flex-1">
    <div class="container flex-col gap-6">
        <TodoInput bind:todo onSubmit={createTodo} />
        <TodoList
            todos={todosQuery.data ?? []}
            onTodoCompleted={completeTodo}
            onTodoDelete={deleteTodo}
        />
    </div>
</main>
