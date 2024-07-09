<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Fa as FontAwesomeIcon } from 'svelte-fa';
    import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
    import { faXmark } from '@fortawesome/free-solid-svg-icons';
    import type { Todo } from 'shared-code/models/Todo';

    const dispatch = createEventDispatcher<{
        todoCompleted: Todo;
        todoDelete: Todo;
    }>();

    export let todo: Todo;
</script>

<div
    class="flex gap-2 items-center justify-between border border-gray-400 dark:border-gray-500 rounded-lg px-2.5 py-2"
>
    <button
        class="flex gap-2 items-center cursor-pointer group px-2 py-2"
        on:click={() => dispatch('todoCompleted', todo)}
    >
        {#if todo.completed}
            <FontAwesomeIcon icon={faCircleCheck} class="text-xl text-green-500" />
            <span class="sr-only">Press to uncomplete</span>
        {:else}
            <FontAwesomeIcon
                icon={faCircle}
                class="text-xl text-gray-400 group-hover:text-green-500 group-focus:text-green-500"
            />
            <span class="sr-only">Press to complete</span>
        {/if}
        <span>{todo.description}</span>
    </button>
    <button
        class="group px-2 py-2"
        title="Press to remove"
        on:click={() => dispatch('todoDelete', todo)}
    >
        <FontAwesomeIcon
            icon={faXmark}
            class="text-xl text-gray-400 group-hover:text-red-500 group-focus:text-red-500"
        />
        <span class="sr-only">Remove todo</span>
    </button>
</div>
