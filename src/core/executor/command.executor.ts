import {IStreamLogger} from "../handlers/stream.logger.interface";
import {ChildProcessWithoutNullStreams} from "child_process";
import {ICommandExec} from "./command.types";

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}

  public async execute(): Promise<void> {
    const values = await this.insert();
    const params = this.build(values);
    const stream = this.spawn(params);
    this.processStream(stream, this.logger)
  }

  protected abstract insert(): Promise<Input>

  protected abstract build(values: Input): ICommandExec

  protected abstract spawn(params: ICommandExec): ChildProcessWithoutNullStreams

  protected abstract processStream(result: ChildProcessWithoutNullStreams, logger: IStreamLogger): void
}

