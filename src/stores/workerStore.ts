// stores/workerStore.js
import { defineStore } from "pinia";
import { ref, onUnmounted } from "vue";
import { useAudioFileStore } from "@/stores/audioFile";

export const useWorkerStore = defineStore("workerStore", () => {
  const worker = ref<Worker | null>(null);
  const loadingStatus = ref(null);
  const transcriptionResult = ref(null);
  // const downloadingStatus = ref<{ progress: 0; file: null; }[]>([]);
  const downloadingStatus = ref<any>({});

  // Initialize the worker and set up event listeners
  function initializeWorker() {
    if (!worker.value) {
      worker.value = new Worker(
        new URL("@/whisperer.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );

      worker.value.addEventListener("message", onMessageReceived);
    }
    return worker.value;
  }

  // Handle messages from the worker
  const onMessageReceived = async (e: MessageEvent) => {
    switch (e.data.type) {
      case "LOADING_STATUS":
        loadingStatus.value = e.data;
        console.log(["LOADING_STATUS", [e.data]]);
        break;

      case "TRANSCRIPTION_END":
        console.log(["TRANSCRIPTION_RESULT", e.data]);
        break;

      case "DOWNLOADING_STATUS":
        // downloadingStatus.value.progress = e.data.progress;
        // downloadingStatus.value.file = e.data.file;
        // downloadingStatus.value.total = e.data.total;
        console.log('innerpinestatus',downloadingStatus)
        console.log(["DOWNLOADING_STATUS", e.data.progress, e.data.file]);
        downloadingStatus.value[e.data.file] = {
          progress: e.data.progress,
        };
        break;
      case "DOWNLOADING_START_STATUS":
        // console.log(["DOWNLOADING_START_STATUS", e.data.file]);
        downloadingStatus.value[e.data.file] = {
          progress: 0,
        };
      break;
        case "UPDATE_TRANSCRIPTION":
        console.log("Received UPDATE_TRANSCRIPTION message:", e.data.result[0]);
        transcriptionResult.value = e.data.result[0];
        break;

      default:
        console.warn("Unknown message type:", e.data.type);
        break;
    }
  };

  // Send a message to the worker
  const startTranscribe = async () => {
    const audioFileStore = useAudioFileStore();
    if (worker.value) {
      const audioData = await audioFileStore.getDecodedAudioBuffer();
      console.log(audioData);
      if (audioData) {
        worker.value.postMessage({
          type: "INFERENCE_REQUEST",
          audioData: audioData,
        });
      }
    }
  };

  // Terminate the worker and clean up
  function terminateWorker() {
    if (worker.value) {
      worker.value.removeEventListener("message", onMessageReceived);
      worker.value.terminate();
      worker.value = null;
    }
  }

  // Automatically terminate the worker when the store is no longer used
  onUnmounted(() => {
    terminateWorker();
  });

  return {
    worker,
    loadingStatus,
    transcriptionResult,
    downloadingStatus,
    initializeWorker,
    startTranscribe,
    terminateWorker,
  };
});
