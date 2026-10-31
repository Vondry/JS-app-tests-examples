// Fixes `Reference error: Response` while using msw
import 'cross-fetch/polyfill';

// Adds support for DOM functions like expect().toBeInTheDocument()
// For Vitest 2.x, use the base import
import '@testing-library/jest-dom';
