import {PromptService} from "./core/prompt/prompt.service.js";
import {StreamHandler} from "./core/handlers/stream.handler.js";
import {consoleLogger} from "./out/console-logger/console-logger.js";

export class App {
  async run() {
    console.log(`Running`)

    const res = await (new PromptService()).input<number>("Number", "number")

    console.log(`res ------------------->`, res)

    const stream = new StreamHandler(consoleLogger)
    stream.test("Data")
  }
}

const app = new App()
app.run()
