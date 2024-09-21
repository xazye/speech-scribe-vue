<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import { useWorkerStore } from "@/stores/workerStore";
import LanguageSelector from "@/components/LanguageSelector.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import  Button from "@/components/ui/button/Button.vue";
import { Progress } from "@/components/ui/progress"
const tab = ref<string>("transcription");
const workerStore = useWorkerStore();
const workerTranslate = ref<Worker | null>(null);
const translationResults = ref<string[]>();
const translationDownloadingStatus = ref<any>({});
const onMessageReceived = async (e: MessageEvent) => {
  switch (e.data.type) {
    // case "LOADING_STATUS":
    //   loadingStatus.value = e.data;
    //   console.log(["LOADING_STATUS", [e.data]]);
    //   break;

    case "TRANSLATION_END":
      console.log(["TRANSCRIPTION_RESULT", e.data]);
      break;

    // case "DOWNLOADING_STATUS":
    //   downloadingStatus.value.progress = e.data.progress;
    //   downloadingStatus.value.file = e.data.file;
    //   console.log(["DOWNLOADING_STATUS", e.data.progress, e.data.file]);
    //   break;
    case "UPDATE_TRANSCRIPTION":
      console.log("Received UPDATE_TRANSCRIPTION e.data:", e.data);
      console.log("Received UPDATE_TRANSCRIPTION message:", e.data.result);
      translationResults.value = e.data.result;
      break;
      case "DOWNLOADING_STATUS":
        // downloadingStatus.value.progress = e.data.progress;
        // downloadingStatus.value.file = e.data.file;
        // downloadingStatus.value.total = e.data.total;
        console.log(["DOWNLOADING_STATUS", e.data.progress, e.data.file]);
        translationDownloadingStatus.value[e.data.file] = {
          progress: e.data.progress,
        };
        break;
      case "DOWNLOADING_START_STATUS":
        console.log(["DOWNLOADING_START_STATUS", e.data.file]);
        translationDownloadingStatus.value[e.data.file] = {
          progress: 0,
        };
      break;
    default:
      console.warn("Unknown message type:", e.data.type);
      break;
  }
};

onMounted(() => {
  workerStore.initializeWorker();

  if (!workerTranslate.value) {
    workerTranslate.value = new Worker(
      new URL("@/translation.worker.ts", import.meta.url),
      {
        type: "module",
      }
    );
  }
  workerTranslate.value.addEventListener("message", onMessageReceived);
  console.log(workerTranslate.value);
});
function changeTab(newTab: string) {
  tab.value = newTab;
}
function requestTranslate() {
  console.log("Translating");
  workerTranslate.value?.postMessage({
    type: "TRANSLATION_REQUEST",
    textData: workerStore.transcriptionResult,
  });
  console.log("AfterTranslating");
}
</script>
<template>
  <main class="flex flex-col gap-4 md:justify-center items-center flex-grow">
    <h1 class="text-4xl sm:text-7xl font-semibold z-10">
      Your <span class="text-secondary">Transcription</span>
    </h1>
    <section
      class="flex flex-col gap-4 justify-center items-center max-w-[1024px] w-full"
    >
      <div class="max-w-96 w-full grid grid-cols-2 items-center">
        <button
          @click="changeTab('transcription')"
          class="px-4 py-2 border border-secondary rounded-full font-semibold border-r-0 rounded-r-none shadow-buttonLeft duration-300"
          :class="
            tab === 'transcription'
              ? 'text-black border-primary-700 shadow-primary-700 bg-primary-400'
              : 'border-secondary text-primary-300'
          "
        >
          Transcription
        </button>
        <button
          @click="changeTab('translation')"
          class="px-4 py-2 border rounded-full font-semibold border-l-0 rounded-l-none shadow-buttonRight duration-300"
          :class="
            tab === 'translation'
              ? 'text-black border-primary-700 shadow-primary-700 bg-primary-400'
              : 'border-secondary text-primary-300'
          "
        >
          Translation
        </button>
      </div>

      <div v-if="tab === 'transcription'">
        <ScrollArea class="h-[59dvh]">
          {{ workerStore.transcriptionResult }}
        </ScrollArea>
      </div>
      <div v-if="tab === 'translation'" class="flex w-full flex-col">
        <div class="flex flex-col justify-between w-full gap-4 md:flex-row">
          <div class="md:basis-1/2">
            <LanguageSelector labelText="Source" />
            <ScrollArea class="h-[20dvh] md:h-[200px]">
              <p>{{ workerStore.transcriptionResult }}</p>
            </ScrollArea>
          </div>
          <div class="md:basis-1/2">
            <LanguageSelector labelText="Target" />
            <ScrollArea class="h-[20dvh] md:h-[200px]" v-if="translationResults">
              <p >{{ translationResults }}</p>
            </ScrollArea>
            <div v-else class="w-full z-10 flex flex-col" v-for="(item,index) in translationDownloadingStatus" :key="index">
              <Progress :model-value="item.progress" />
              <span>{{ index }}</span>
             </div>
          </div>
        </div>
        <Button class="justify-center w-fit mx-auto my-4" @click="requestTranslate">Translate</Button>
      </div>
    </section>
  </main>
</template>
