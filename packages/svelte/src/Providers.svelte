<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import App from './App.svelte';

    const queryClient = new QueryClient();

    export let hideDevTools = false;
</script>

<QueryClientProvider client={queryClient}>
    <App />
    {#if !hideDevTools}
        <SvelteQueryDevtools initialIsOpen={false} />
    {/if}
</QueryClientProvider>
