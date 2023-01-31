import {IStreamLogger} from "../../core/handlers/stream.logger.interface";

class ConsoleLogger implements IStreamLogger {
  private static _instance: ConsoleLogger

  private constructor() {}

  static get() {
    if (!this._instance) this._instance = new ConsoleLogger()
    return this._instance
  }

  end(): void {
    console.log(`Ready`)
  }

  error(...args: any[]): void {
    console.log(args.toString())
  }

  log(...args: any[]): void {
    console.log(args.toString())
  }
}

export const consoleLogger = ConsoleLogger.get()
