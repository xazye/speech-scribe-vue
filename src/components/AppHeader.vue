<script setup>
import Button from "@/components/ui/button/Button.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const goHomePage = () => {
  router.push({ name: "home" });
};
</script>
<template>
  <header class="flex flex-row justify-between container py-4">
    <button @click.="goHomePage">
      <h2 class="text-2xl font-bold">
        Speech<span class="text-secondary">Scribe</span>
      </h2>
    </button>
      <Button class="gap-4" @click="goHomePage">
        New
        <v-icon name="fa-plus" />
      </Button>
  </header>
</template>
