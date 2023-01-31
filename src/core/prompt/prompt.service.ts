import Inquirer from "inquirer"
import {PromptType} from "./prompt.types";

export class PromptService {
  public async input<T>(message: string, type: PromptType): Promise<T> {
    const {result} = await Inquirer.prompt<{result: T}>([
      {
        type,
        name: "result",
        message
      }
    ])
    return result
  }
}

