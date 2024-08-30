import { AutomaticSpeechRecognitionPipeline, pipeline, PipelineType, env, read_audio} from '@xenova/transformers';
env.allowLocalModels = false;
env.useBrowserCache = false;
// singleton cause expensive
class MyTranscriptionPipeline {
    static task:PipelineType = 'automatic-speech-recognition';
    static model = 'Xenova/whisper-tiny.en';
    static instance: AutomaticSpeechRecognitionPipeline | null = null;

    static async getInstance(progress_callback:any = null ) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback }) as AutomaticSpeechRecognitionPipeline;
        }

        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { type, audio }:{ type:string; audio:ArrayBuffer }  = event.data
        if (type === 'INFERENCE_REQUEST') {
            await transcribe(audio);
        }
})

async function transcribe(audioData: Float32Array) {
    sendLoadingMessage("loading");
    let pipeline;
    try {
      pipeline = await MyTranscriptionPipeline.getInstance();
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
    let result = await pipeline(audioData)
    self.postMessage({ type: 'TRANSCRIPTION_RESULT', result });
}

function sendLoadingMessage(status: string) {
    self.postMessage({ type: 'LOADING_STATUS', status });
}


async function load_model_callback(data: {  
    status: string;
    file: string;      
    progress: number;  
    loaded: number;    
    total: number;     
  }) {
    // const { status } = data;
    // if (status === "progress") {
    //   const { file, progress, loaded, total } = data;
    //   sendDownloadingMessage(file, progress, loaded, total);
    // }
  }