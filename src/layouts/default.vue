<template>
  <DefaultLayout />
</template>

<script lang="ts" setup>
const DefaultLayout = defineAsyncComponent(
  () => import("./components/DefaultLayout.vue")
);
</script>
