import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAudioFileStore = defineStore('audioFile', () => {
  const audioFile = ref<File | string | null>(null)
  const audioUrl = ref<string | null>(null)

  const setAudioFile = (file: File|string) => {
    if (file instanceof File) {
      audioUrl.value = URL.createObjectURL(file)
    } else {
      audioUrl.value = file
    }
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
    hasAudioFile
  }
})
