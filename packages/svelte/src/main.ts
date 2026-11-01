import { mount } from 'svelte';
import Providers from './Providers.svelte';
import './index.css';

const app = mount(Providers, {
    target: document.getElementById('root')!
});

export default app;
