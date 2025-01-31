import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './Providers';
import './index.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
);
