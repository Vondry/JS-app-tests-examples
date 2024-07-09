<script setup lang="ts">
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import type { Todo, TodoDescription } from 'shared-code/models/Todo';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { ref } from 'vue';
import { useGetTodosQuery } from './queries/useGetTodosQuery';
import { useCreateTodoMutation } from './queries/useCreateTodoMutation';
import { useCompleteTodoMutation } from './queries/useCompleteTodoMutation';
import { useDeleteTodoMutation } from './queries/useDeleteTodoMutation';

const { data: todos } = useGetTodosQuery();
const createTodoMutation = useCreateTodoMutation();
const completeTodoMutation = useCompleteTodoMutation();
const deleteTodoMutation = useDeleteTodoMutation();

const todo = ref<TodoDescription>('');

const createTodo = () => {
    createTodoMutation.mutate(todo.value);
    todo.value = '';
};

const completeTodo = (todo: Todo) => {
    completeTodoMutation.mutate(todo);
};

const deleteTodo = (todo: Todo) => {
    deleteTodoMutation.mutate(todo);
};
</script>
<template>
    <main class="flex-1">
        <div class="container flex-col gap-6">
            <TodoInput v-model="todo" @on-submit="createTodo" />
            <TodoList
                :todos="todos ?? []"
                @on-todo-completed="completeTodo"
                @on-todo-delete="deleteTodo"
            />
        </div>
    </main>
    <VueQueryDevtools />
</template>
