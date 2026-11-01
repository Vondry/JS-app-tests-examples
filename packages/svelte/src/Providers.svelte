<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import App from './App.svelte';

    const queryClient = new QueryClient();

    let { hideDevTools = false }: { hideDevTools?: boolean } = $props();
</script>

<QueryClientProvider client={queryClient}>
    <App />
    {#if !hideDevTools}
        <SvelteQueryDevtools initialIsOpen={false} />
    {/if}
</QueryClientProvider>
