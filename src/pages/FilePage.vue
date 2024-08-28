<script setup lang="ts">
  import Button from '@/components/ui/button/Button.vue';
</script>
<template>
     <main class="flex flex-col gap-4 justify-center items-center flex-grow">
      <h1 class="text-4xl sm:text-7xl font-semibold ">
        Uploaded <span class="text-secondary">file</span>
      </h1>
      <section class=" flex flex-col gap-4 justify-center items-center mt-8 max-w-96 w-full">
        <div>
          <h3 class="font-semibold text-xl text-secondary"> Name:</h3>{" "}
          <p class="text-primary-50">{file ? file.name : "Recorded audio"}</p>
        </div>
        <div class="w-full flex flex-row justify-between mt-8">
            <Button class="text-red-500 border-red-500 [&]shadow-red-900 hover:text-red-600 hover:border-red-800 hover:shadow-red-950"> Reset </Button>
            <Button class="gap-4"> Transcribe <FaPen />            </Button>
        </div>
      </section>
    </main>
</template>