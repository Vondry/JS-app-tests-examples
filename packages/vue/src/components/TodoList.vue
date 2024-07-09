<script setup lang="ts">
import type { Todo } from 'shared-code/models/Todo';
import TodoItem from './TodoItem.vue';

defineProps<{ todos: Todo[] }>();

const emit = defineEmits<{
    onTodoCompleted: [Todo];
    onTodoDelete: [Todo];
}>();
</script>

<template>
    <ul class="flex flex-col gap-2.5">
        <li v-for="todo in todos" :key="todo.id">
            <TodoItem
                :todo="todo"
                @on-todo-completed="(data: Todo) => emit('onTodoCompleted', data)"
                @on-todo-delete="(data: Todo) => emit('onTodoDelete', data)"
            />
        </li>
    </ul>
</template>
