<script lang="ts" setup>
import { onMounted, watch} from 'vue'
import { useWorkerStore } from '@/stores/workerStore'
import { useRouter } from 'vue-router';

const workerStore = useWorkerStore()
const router = useRouter();

watch(()=>workerStore.transcriptionResult, (newTranscriptionResult ) => {
  if (newTranscriptionResult) {
    console.log('xddtranscriptiondone');
    router.push({ name: 'resultsPage' });
  }
})
onMounted(() => {
  console.log('workerbefore', workerStore)
  workerStore.initializeWorker();
  console.log('workerafter', workerStore)
  console.log(workerStore.worker);
  workerStore.startTranscribe();
})
</script>
<template>
    <main className="flex flex-col gap-4 justify-center items-center flex-grow">
      <h1 className="text-4xl sm:text-7xl font-semibold z-10 ">Transcribing
          <span v-for="(_item, index) in [0, 1, 2]" :key="index" className="text-secondary dot">
            .
          </span>
        </h1>
      <section className="flex flex-col gap-4 justify-center items-center max-w-96 w-full">
        <p className="z-10 sm:text-2xl flex flex-row justify-center items-center gap-2 bg-gradient-to-r from-white  to-primary-600 text-transparent bg-clip-text mb-8 animate-pulse">
          
        </p>
          <div >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
      </section>
    </main>
</template>