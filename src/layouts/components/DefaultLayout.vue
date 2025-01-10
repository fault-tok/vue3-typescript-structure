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