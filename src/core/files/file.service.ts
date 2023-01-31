import {dirname, isAbsolute, join} from "path"
import {promises} from "fs"

export class FileService {
  private async ifExists(path: string): Promise<boolean> {
    try {
      await promises.stat(path)
      return true
    } catch (e) {
      return false
    }
  }

  getFilePath(path: string, name: string, extension: string): string {
    if (!isAbsolute(path)) {
      throw new Error("For now only absolute path of file is required :(")
    }

    return join(dirname(path) + "/" + name + "." + extension)
  }

  async deleteFileIfExists(path: string): Promise<void> {
    if (await this.ifExists(path)) {
      await promises.unlink(path)
    }
  }
}
