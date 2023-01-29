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
    console.log(`Error --->  ${JSON.stringify(args)}`)
  }

  log(...args: any[]): void {
    console.log(`Data --->  ${JSON.stringify(args)}`)
  }
}

export const consoleLogger = ConsoleLogger.get()
