import {ChildProcessWithoutNullStreams} from "child_process";
import {IStreamLogger} from "../handlers/stream.logger.interface";
import {ICommandExec} from "./command.types";

export abstract class CommandExecutor<Input> {
  protected constructor(protected logger: IStreamLogger) {
  }

  public async execute(): Promise<void> {
    const values = await this.insert();
    const params = this.build(values);
    const stream = await this.spawn(params);
    this.processStream(stream, this.logger)
  }

  protected abstract insert(): Promise<Input>

  protected abstract build(values: Input): ICommandExec

  protected abstract spawn(params: ICommandExec): Promise<ChildProcessWithoutNullStreams>

  protected abstract processStream(result: ChildProcessWithoutNullStreams, logger: IStreamLogger): void
}

