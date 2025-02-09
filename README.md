﻿# Vite + Vue Project Setup

This project sets up a Vite project with Vue, Vue Router, and various plugins for a smooth development experience.

## Table of Contents
1. Installation
2. File Structure
3. File Contents
4. Conclusion

## 1. Installation

Run the following commands in your terminal:

```bash
yarn create vite
yarn
yarn add vue-router@4
yarn add unplugin-auto-import -D
yarn add unplugin-vue-components -D
yarn add vite-plugin-pages -D
yarn add vite-plugin-vue-layouts -D
yarn add @types/node -D
```

## 2. File Structure

After installing the necessary dependencies, you will need to create the following file structure in your project. The structure includes directories for routes, pages, layouts, and components:

```bash
src/
├── routes/
│   └── index.ts
├── pages/
│   └── index.vue
├── layouts/
│   ├── default.vue
│   ├── _blank.vue
│   └── components/
│       ├── DefaultLayout.vue
│       └── VerticalLayout.vue
└── interfaces/
shims.d.ts
```

## 3. File Contents

### `main.ts`
```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'

const app = createApp(App)
app.use(router);

app.mount('#app')
```

### `src/routes/index.ts`
```ts
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from '~pages';

const route = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: route,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach(async (_, __, next) => {
    next();
});

export default router;
```

### `shims.d.ts`
```ts
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<object, object, any>
    export default component
}

declare module 'virtual:generated-layouts' {
    export const setupLayouts: any
}

declare module '~pages' {
    const generatedRoutes: any
    export default generatedRoutes
}
```

### `tsconfig.app.json`
```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "./shims.d.ts", "auto-imports.d.ts"]
}
```

### `App.vue`
```vue
<script setup lang="ts">
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
```

### `src/pages/index.ts`
```vue
<template>
    <div></div>
</template>

<script setup lang="ts">
</script>
```

### `src/layouts/default.vue`
```vue
<template>
  <DefaultLayout />
</template>

<script lang="ts" setup>
const DefaultLayout = defineAsyncComponent(
  () => import("./components/DefaultLayout.vue")
);
</script>
```

### `src/layouts/_blank.vue`
```vue
<template>
  <div>
    <RouterView />
  </div>
</template>
```

### `src/layouts/components/DefaultLayout.vue`
```vue
<template>
  <VerticalLayout>
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route" />
    </RouterView>
  </VerticalLayout>
</template>

<script setup>
import VerticalLayout from './VerticalLayout.vue';
</script>
```

### `src/layouts/components/VerticalLayout.vue`
```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss"></style>
```

### `vite.config.ts`
```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
      },
      imports: ["vue", "vue-router"],
      dirs: [],
      vueTemplate: true,
    }),
    Components({
      dirs: ["./src/components/"],
      dts: true,
    }),
    Pages({
      dirs: ["./src/pages"],
    }),
    Layouts({
      layoutsDirs: './src/layouts',
      pagesDirs: null
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
});
```

## 4. Conclusion

This setup provides a clean and efficient way to organize your Vue project with automatic layout handling, routing, and component imports.
