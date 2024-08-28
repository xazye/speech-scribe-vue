<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  
  <AppHeader />
  <main class="container flex flex-col gap-4 justify-center items-center grow ">
    <router-view />
  </main>
  
</template>
