import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAudioFileStore = defineStore('audioFile', () => {
  const audioFile = ref<Blob | File | null>(null)
  const audioUrl = ref<string | null>(null)

  const setAudioFile = (file: Blob | File) => {
    if (file instanceof File || file instanceof Blob) {
      audioUrl.value = URL.createObjectURL(file)
      audioFile.value = file
    } else {
      throw new Error('Not a file or a Blob')
    }
  }

  const getDecodedAudioBuffer = async ():Promise<Float32Array | null> => {
    if (audioFile.value) {
      const audioContext = new AudioContext({
        sampleRate: 16000,
      });
      const response = await audioFile.value.arrayBuffer();
      const decoded = await audioContext.decodeAudioData(response);
      console.log(decoded);
      const audio = decoded.getChannelData(0);
      return audio;
    }
    return null
  }

  const clearAudioFile = () => {
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value)
    }
    audioFile.value = null
    audioUrl.value = null
  }

  const hasAudioFile = computed(() => audioFile.value !== null)

  return {
    audioFile,
    audioUrl,
    setAudioFile,
    clearAudioFile,
    hasAudioFile,
    getDecodedAudioBuffer
  }
})
