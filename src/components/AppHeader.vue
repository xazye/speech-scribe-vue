<script setup>
import { PxPlus } from "oh-vue-icons/icons";

</script>
<template>
  <header className="flex flex-row justify-between">
        <a href="/">
          <h2 className="text-2xl font-bold">
            Speech<span className="text-secondary">Scribe</span>
          </h2>
        </a>
        <a href="/">
          <!-- <Button className="gap-4"> -->
            New
            <v-icon name="px-plus" />
          <!-- </Button> -->
        </a>
      </header>
</template>
