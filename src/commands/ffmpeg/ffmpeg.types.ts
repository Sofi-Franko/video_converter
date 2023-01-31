import {ICommandExec} from "../../core/executor/command.types";

export interface IFfmpegInput {
  width: number,
  height: number,
  path: string,
  name: string,
  inNeededAudio: boolean
}

export interface ICommandExecFfmpeg extends ICommandExec {
  outputPath: string
}
