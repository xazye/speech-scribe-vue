<script setup>
import Button from "@/components/ui/button/Button.vue";
</script>
<template>
  <header class="flex flex-row justify-between container py-4">
        <a href="/">
          <h2 class="text-2xl font-bold">
            Speech<span class="text-secondary">Scribe</span>
          </h2>
        </a>
        <a href="/">
          <Button class="gap-4" >
            New
            <v-icon name="fa-plus" />
          </Button>
        </a>
      </header>
</template>
