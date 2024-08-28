<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>
<template>
    <h1 class="text-4xl sm:text-7xl font-semibold">
      Speech<span class="text-secondary">Scribe</span>
    </h1>
    <section
      class="flex flex-col gap-4 justify-center items-center max-w-96 w-full"
    >
      <p
        class="sm:text-2xl flex flex-row justify-center items-center gap-2 bg-gradient-to-r from-white via-secondary to-primary-600 text-transparent bg-clip-text mb-8"
      >
        Record
        <v-icon
          name="fa-angle-double-right"
          class="fill-primary-500"
          scale="1.75"
        />
        Transcribe
        <v-icon
          name="fa-angle-double-right"
          class="text-primary-400"
          scale="1.75"
        />
        Translate
      </p>
      <Button class="w-full">
          Record
        <div class="flex flex-row items-center gap-4">
          <v-icon name="fa-microphone" class="text-primary-400" scale="1.5" />
        </div>
      </Button>
      <p>
        Or
        <label
          class="text-primary-300 hover:cursor-pointer hover:text-secondary duration-300"
          for="upload_file"
        >
          Upload
          <input id="upload_file" hidden type="file"  accept=".mp3,.wav,.ogg" />
        </label>
        a mp3 file
      </p>
    </section>
</template>
