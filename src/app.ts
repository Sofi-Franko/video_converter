import {consoleLogger} from "./out/console-logger/console-logger.js";
import {FfmpegExecutor} from "./commands/ffmpeg/ffmpeg.executor.js";

export class App {
  async run() {
    await new FfmpegExecutor(consoleLogger).execute()
  }
}

const app = new App()
app.run()
