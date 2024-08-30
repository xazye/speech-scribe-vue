import { AutomaticSpeechRecognitionPipeline, pipeline, PipelineType } from '@xenova/transformers';

// singleton cause expensive
class MyTranslationPipeline {
    static task:PipelineType = 'automatic-speech-recognition';
    static model = 'Xenova/whisper-tiny.en';
    static instance: AutomaticSpeechRecognitionPipeline | null = null;

    static async getInstance(progress_callback = (() => {})) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback }) as AutomaticSpeechRecognitionPipeline;
        }

        return this.instance;
    }
}