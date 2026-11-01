<script lang="ts">
    import type { Todo } from 'shared-code/models/Todo';
    import TodoItem from './TodoItem.svelte';

    interface Props {
        todos: Todo[];
        onTodoCompleted?: (todo: Todo) => void;
        onTodoDelete?: (todo: Todo) => void;
    }

    let { todos, onTodoCompleted, onTodoDelete }: Props = $props();
</script>

<ul class="flex flex-col gap-2.5">
    {#each todos as todo (todo.id)}
        <li>
            <TodoItem {todo} {onTodoCompleted} {onTodoDelete} />
        </li>
    {/each}
</ul>
