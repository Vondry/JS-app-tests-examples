<script lang="ts">
    import type { Todo } from 'shared-code/models/Todo';
    import TodoItem from './TodoItem.svelte';

    export let todos: Todo[];
</script>

<ul class="flex flex-col gap-2.5">
    {#each todos as todo (todo.id)}
        <li>
            <TodoItem {todo} on:todoCompleted on:todoDelete />
        </li>
    {/each}
</ul>
