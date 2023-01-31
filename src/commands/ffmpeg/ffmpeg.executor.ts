import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {IStreamLogger} from "../../core/handlers/stream.logger.interface";
import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types";

import {CommandExecutor} from "../../core/executor/command.executor.js";
import {PromptService} from "../../core/prompt/prompt.service.js";
import {FfmpegBuilder} from "./ffmpeg.builder.js";
import {FileService} from "../../core/files/file.service.js";
import {StreamHandler} from "../../core/handlers/stream.handler.js";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private promptService: PromptService = new PromptService()
  private fileService: FileService = new FileService()

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async insert(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>("Width", "number");
    const height = await this.promptService.input<number>("Height", "number");
    const path = await this.promptService.input<string>("Insert path", "input");
    const name = await this.promptService.input<string>("New name", "input");

    return {width, height, path, name}
  }

  protected build(values: IFfmpegInput): ICommandExecFfmpeg {
    const {width, height, path, name} = values

    const outputPath = this.fileService.getFilePath(path, name, "mp4");

    const args = (new FfmpegBuilder()).addPath(path).addSize(width, height).build(outputPath)

    return {command: "ffmpeg", args, outputPath}
  }

  protected async spawn(params: ICommandExecFfmpeg): Promise<ChildProcessWithoutNullStreams> {
    const {command, args, outputPath} = params
    await this.prepareSpawnProcess(outputPath);

    return spawn(command, args)
  }

  protected processStream(result: ChildProcessWithoutNullStreams): void {
    const handler = new StreamHandler(this.logger);
    handler.processOutput(result)
  }


  private async prepareSpawnProcess(outputPath: string): Promise<void> {
    await this.fileService.deleteFileIfExists(outputPath)
  }
}
