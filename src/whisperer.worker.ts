import {
  AutomaticSpeechRecognitionPipeline,
  pipeline,
  PipelineType,
  env,
  AudioPipelineInputs,
  ChunkCallbackItem,
  AutomaticSpeechRecognitionConfig
} from '@xenova/transformers';

env.allowLocalModels = false;

// https://github.com/xenova/transformers.js/issues/366
// https://github.com/xenova/transformers.js/issues/142
//  problem with bundler ? On chrome doesn't work On firefox works
env.useBrowserCache = true;


interface ExtendedASRConfig extends AutomaticSpeechRecognitionConfig {
  callback_function?: (items: AudioPipelineInputs[]) => void;
}

// singleton cause expensive
class MyTranscriptionPipeline {
  static task: PipelineType = 'automatic-speech-recognition';
  static model = 'Xenova/whisper-tiny.en';
  static instance: AutomaticSpeechRecognitionPipeline | null = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback }) as AutomaticSpeechRecognitionPipeline;
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  const { type, audioData }: { type: string; audioData: Float32Array } = event.data
  if (type === 'INFERENCE_REQUEST') {
    await transcribe(audioData);
  }
})

async function transcribe(audioData: Float32Array) {
  sendLoadingMessage("loading");
  let pipeline: AutomaticSpeechRecognitionPipeline;
  try {
    pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback);
    if (!pipeline) {
      throw new Error("Pipeline not initialized.");
    }
  } catch (err) {
    console.error("Failed to initialize pipeline:", err);
    sendLoadingMessage("error");
    return;
  }
  const time_precision: number =
    pipeline.processor.feature_extractor.config.chunk_length /
    pipeline.model.config.max_source_positions;

  let chunks_to_process = [
    {
      tokens: <Array<number>> [],
      finalized: <boolean> false,
    },
  ];
  function chunk_callback(chunk: ChunkCallbackItem) {
    let last = chunks_to_process[chunks_to_process.length - 1];
    // Overwrite last chunk with new info
    Object.assign(last, chunk);
    last.finalized = true;
    // Create an empty chunk after, if it not the last chunk
    if (!chunk.is_last) {
      chunks_to_process.push({
        tokens: [],
        finalized: false,
      });
    }
  }

  // idk the type of the item
  function callback_function(item: AudioPipelineInputs[]) {

    let last = chunks_to_process[chunks_to_process.length - 1];
    // Update tokens of last chunk
    // idk the fucking type of the item
    // @ts-ignore
    last.tokens = [...item[0].output_token_ids];
    // Merge text chunks
    // TODO change to decode()
    let data = (pipeline.tokenizer as any)._decode_asr(chunks_to_process, {
      time_precision: time_precision,
      return_timestamps: true,
      force_full_sequences: false,
    });
    self.postMessage({
      type: "UPDATE_TRANSCRIPTION",
      result: data,
    });
  }
  let result = await pipeline(audioData,
    {
      // Greedy
      top_k: 0,
      do_sample: false,
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: true,
      force_full_sequences: false,
      // Callback functions
      // this one fires frequently, after every time_precision of audio; around 0.2s
      callback_function: callback_function, // after each generation step 
      // this one fires after every chunk_length, so every 30s of audio
      chunk_callback: chunk_callback, // after each chunk is processed
    } as ExtendedASRConfig);
  self.postMessage({ type: 'TRANSCRIPTION_END', result });
}

function sendLoadingMessage(status: string) {
  self.postMessage({ type: 'LOADING_STATUS', status });
}
function sendDownloadingMessage(
  file: string,
  progress: number,
  loaded: number,
  total: number) {
  self.postMessage({ type: 'DOWNLOADING_STATUS', progress, loaded, total, file });
}

async function load_model_callback(data: {
  status: string;
  file: string;
  progress: number;
  loaded: number;
  total: number;
}) {
  // statuses
  // initiate
  // download
  // done
  // progress
  // console.log("load_model_callback", data);
  const { status } = data;
  if (status === "progress") {
    const { file, progress, loaded, total } = data;
    sendDownloadingMessage(file, progress, loaded, total);
  }
}