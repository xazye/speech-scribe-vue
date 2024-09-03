<script setup lang="ts">
import { onMounted, watch} from 'vue'
import { ref } from "vue";
import { useWorkerStore } from '@/stores/workerStore'

const tab = ref<string>("transcription");
const workerStore = useWorkerStore()

onMounted(() => {
  console.log('workerbefore', workerStore)
  workerStore.initializeWorker();
  console.log('workerafter', workerStore)
})
function changeTab(newTab:string) {
  tab.value = newTab;
  }
</script>
<template>
  <main class="flex flex-col gap-4 justify-center items-center flex-grow">
    <h1 class="text-4xl sm:text-7xl font-semibold z-10">
      Your <span class="text-secondary">Transcription</span>
    </h1>
    <section class="flex flex-col gap-4 justify-center items-center max-w-96 w-full">
      <div class="max-w-96 w-full grid grid-cols-2 items-center">
        <button
         @click="changeTab('transcription')"
          class="px-4 py-2 border border-secondary rounded-full font-semibold border-r-0 rounded-r-none shadow-buttonLeft duration-300"
          :class="
            tab === 'transcription' ? 
            'text-black border-primary-700 shadow-primary-700 bg-primary-400'
            : 'border-secondary text-primary-300'
          "
        >
          Transcription
        </button>
        <button
          @click="changeTab('translation')"
          class="px-4 py-2 border rounded-full font-semibold border-l-0 rounded-l-none shadow-buttonRight duration-300"
          :class="
            tab === 'translation' ? 
            'text-black border-primary-700 shadow-primary-700 bg-primary-400'
            : 'border-secondary text-primary-300'
          "
        >
          Translation
        </button>
      </div>
      <div v-if="tab === 'transcription'">{{workerStore.transcriptionResult}}</div>
      <div v-if="tab === 'translation'">Translation Here</div>
    </section>
  </main>
</template>
