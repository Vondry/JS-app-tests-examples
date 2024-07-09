<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import App from './App.svelte';

    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <App />
    <SvelteQueryDevtools />
</QueryClientProvider>
