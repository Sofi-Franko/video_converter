import {IStreamLogger} from "./stream.logger.interface";
import {ChildProcessWithoutNullStreams} from "child_process";

export class StreamHandler {
  constructor(private logger: IStreamLogger) {}

  test(data: any) {
    this.logger.log(data)
  }

  processOutput(stream: ChildProcessWithoutNullStreams) {
    stream.stdout.on("data", (data: any) => {
      this.logger.log(data)
    })
    stream.stderr.on("data", (data: any) => {
      this.logger.error(data)
    })
    stream.on("close", () => {
      this.logger.end()
    })
  }
}
