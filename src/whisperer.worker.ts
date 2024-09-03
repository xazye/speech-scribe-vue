import { AutomaticSpeechRecognitionPipeline, pipeline, PipelineType, env } from '@xenova/transformers';
env.allowLocalModels = false;
env.useBrowserCache = false;
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
  let pipeline;
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
  console.log("pipeline: ", pipeline);
  console.log("audioData: ", audioData);
  // throw new Error("Not implemented");

  const time_precision =
    pipeline.processor.feature_extractor.config.chunk_length /
    pipeline.model.config.max_source_positions;

  let chunks_to_process = [
    {
      tokens: [],
      finalised: false,
    },
  ];
  // https://github.com/xenova/whisper-web/blob/main/src/worker.js#L152
  // TODO: Storage for fully-processed and merged chunks
  // let decoded_chunks = [];

  function chunk_callback(chunk) {
    let last = chunks_to_process[chunks_to_process.length - 1];

    // Overwrite last chunk with new info
    Object.assign(last, chunk);
    last.finalised = true;

    // Create an empty chunk after, if it not the last chunk
    if (!chunk.is_last) {
      chunks_to_process.push({
        tokens: [],
        finalised: false,
      });
    }
  }

  function callback_function(item) {
    let last = chunks_to_process[chunks_to_process.length - 1];

    // Update tokens of last chunk
    last.tokens = [...item[0].output_token_ids];

    // Merge text chunks
    // TODO optimise so we don't have to decode all chunks every time
    let data = pipeline.tokenizer._decode_asr(chunks_to_process, {
      time_precision: time_precision,
      return_timestamps: true,
      force_full_sequences: false,
    });
    console.log("callback_function data: ", data);
    self.postMessage({
      type: "UPDATE_TRANSCRIPTION",
      // task: "automatic-speech-recognition",
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
      callback_function: callback_function, // after each generation step
      chunk_callback: chunk_callback, // after each chunk is processed
    });
  self.postMessage({ type: 'TRANSCRIPTION_RESULT', result });
}
// Callback function for partial results
function partialChunkCallback(chunk: any) {
  console.log("Partial result received: ", chunk);
  // self.postMessage({ type: 'TRANSCRIPTION_PARTIAL_RESULT', chunk });
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