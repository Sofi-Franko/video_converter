export class FfmpegBuilder {
  private inputPath: string
  private options: Map<string, string> = new Map()

  constructor() {
    this.options.set("-c:v", "libx264") // default kodak
  }

  addPath(inputPath: string): this {
    this.inputPath = inputPath
    return this
  }

  addSize(width: string, height: string): this {
    this.options.set("-s", `${width}x${height}`);
    return this
  }

  build(outputPath: string): string[] {
    if (!this.inputPath) {
      throw new Error("No input path defined!")
    }

    const args: string[] = ["-i", this.inputPath];
    this.options.forEach((value, key) => {
      args.push(key)
      args.push(value)
    })
    args.push(outputPath)

    return args
  }
}
