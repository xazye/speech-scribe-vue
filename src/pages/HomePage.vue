<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { useAudioFileStore } from "@/stores/audioFile";
import { useWorkerStore } from "@/stores/workerStore";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const recording = ref(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const chunks = ref<Blob[]>([]);

const audioFileStore = useAudioFileStore();
const workerStore = useWorkerStore()

const handleUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    audioFileStore.setAudioFile(file);
    target.value = '';
    router.push({ name: 'transcribePage' });
  }
};

const recordAudio = async () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => { return stream })
      .catch((err: Error) => {
        throw err;
      });
    mediaRecorder.value = new MediaRecorder(stream);
    recording.value = true;
    mediaRecorder.value.start(100);
    mediaRecorder.value.ondataavailable = (e: BlobEvent) => {
      chunks.value.push(e.data);
    }
  }
  throw new Error("No audio input device found");
};
const stopRecordAudio = async () => {
    recording.value = false;
    if (!mediaRecorder.value) {return}
    mediaRecorder.value.stop();
    mediaRecorder.value.onstop = () => {
      const audioBlob = new Blob(chunks.value, { type: "audio/ogg; codecs=opus" });
      chunks.value = [];
      audioFileStore.setAudioFile(audioBlob);
      router.push({ name: 'transcribePage' });
    }
}
const handleClick = () => {
  if (recording.value) {
    stopRecordAudio();
  } else {
    recordAudio().catch((err) => {
      console.error(err);
    });
  }
}

const toggleView= (viewName:string)=> {
  router.push({ name: viewName });
};

onMounted(() => {
  workerStore.initializeWorker();
})

</script>
<template>
  <h1 class="text-4xl sm:text-7xl font-semibold">
    Speech<span class="text-secondary">Scribe</span>
  </h1>
  <section class="flex flex-col gap-4 justify-center items-center max-w-96 w-full">
    <p
      class="sm:text-2xl flex flex-row justify-center items-center gap-2 bg-gradient-to-r from-white via-secondary to-primary-600 text-transparent bg-clip-text mb-8"
    >
      Record
      <v-icon name="fa-angle-double-right" class="fill-primary-500" scale="1.75" />
      Transcribe
      <v-icon name="fa-angle-double-right" class="text-primary-400" scale="1.75" />
      Translate
    </p>
    <Button class="w-full" @click="toggleView('filePage')"> filePage </Button>
    <Button class="w-full" @click="handleClick">
      Record
      <div class="flex flex-row items-center gap-4">
        <v-icon name="fa-microphone" class="text-primary-400" scale="1.5" />
      </div>
    </Button>
    <audio v-if="audioFileStore.audioUrl" :src="audioFileStore.audioUrl" controls></audio>
    <p>
      Or
      <label
        class="text-primary-300 hover:cursor-pointer hover:text-secondary duration-300"
        for="upload_file"
      >
        Upload
        <input
          @input="handleUpload"
          id="upload_file"
          hidden
          type="file"
          accept=".mp3,.wav,.ogg"
        />
      </label>
      a mp3 file
    </p>
  </section>
</template>
