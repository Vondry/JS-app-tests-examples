# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue
3 `<script setup>` SFCs, check out
the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in
the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Running tests

Running `npm run test` now works, but it was failing due to missing `test-utils` that `@testing-library/vue`
is using. This is caused by `npm workspaces` that this project is using.

In order to make `npm run test` works, there is [`postinstall`](https://docs.npmjs.com/cli/v10/using-npm/scripts) script
in npm, that copies test-utils from root to vue package.
