<script setup lang="ts">
</script>
<template>
     <main class="flex flex-col gap-4 justify-center items-center flex-grow">
      <h1 class="text-4xl sm:text-7xl font-semibold ">
        Speech<span class="text-secondary">Scribe</span>
      </h1>
      <section class="flex flex-col gap-4 justify-center items-center max-w-96 w-full">
        <p class="sm:text-2xl flex flex-row justify-center items-center gap-2 bg-gradient-to-r from-white via-secondary to-primary-600 text-transparent bg-clip-text mb-8">
          Record <FaAnglesRight class="text-primary-400" /> Transcribe
          <FaAnglesRight class="text-primary-400" /> Translate
        </p>
        <Button
        >
          <div class="flex flex-row items-center gap-4">
          <FaMicrophone />
          </div>
        </Button>
        <p>
          Or upload
          <label
            class="text-primary-300 hover:cursor-pointer hover:text-secondary duration-300 "
            for="upload_file"
          >
            Upload
            <input

            />
          </label>
          a mp3 file
        </p>
      </section>
    </main>
</template>