<template>
  <main class="flex flex-col gap-4 justify-center items-center flex-grow">
    <h1 class="text-4xl sm:text-7xl font-semibold z-10">
      Your <span class="text-secondary">Transcription</span>
    </h1>
    <section
      class="flex flex-col gap-4 justify-center items-center max-w-96 w-full"
    >
      <div class="max-w-96 w-full grid grid-cols-2 items-center">
        <button
          class="px-4 py-2 border rounded-full font-semibold border-r-0 rounded-r-none shadow-buttonLeft duration-300"
        >
          Transcription
        </button>
        <button
          class="px-4 py-2 border rounded-full font-semibold border-l-0 rounded-l-none shadow-buttonRight duration-300"
        >
          Translation
        </button>
      </div>
    </section>
  </main>
</template>
