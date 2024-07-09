<script setup lang="ts">
import type { TodoDescription } from 'shared-code/models/Todo';

const todoModel = defineModel<TodoDescription>({ required: true });
const emit = defineEmits<{ onSubmit: [void] }>();
</script>

<template>
    <form class="w-full flex gap-3" @submit.prevent="emit('onSubmit')">
        <div class="w-full">
            <label for="todo-input" class="sr-only">Enter your TODO description</label>
            <input
                id="todo-input"
                v-model="todoModel"
                type="text"
                placeholder="I need to..."
                class="block w-full p-4 text-gray-900 border border-gray-400 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>
        <button
            type="submit"
            :disabled="!todoModel.trim()"
            class="text-white bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:dark:bg-gray-600 disabled:hover:dark:bg-gray-600 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Submit
        </button>
    </form>
</template>
