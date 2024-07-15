// Fixes `Reference error: Response` while using msw
import 'cross-fetch/polyfill';

// Adds support for DOM functions like expect().toBeInTheDocument()
import '@testing-library/jest-dom/vitest';
