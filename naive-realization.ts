const {spawn} = require('child_process');
const inquirer = require("inquirer")

(async function convert() {

  // STEP 1 - collecting inputs
  const {result: width} = await inquirer.prompt([{
    type: "number",
    name: "result",
    message: "Width"
  }]),
    {result: height} = await inquirer.prompt([{
    type: "number",
    name: "result",
    message: "Height"
  }]),
    {result: path} = await inquirer.prompt([{
    type: "number",
    name: "result",
    message: "Path"
  }]),
    {result: name} = await inquirer.prompt([{
    type: "number",
    name: "result",
    message: "Name"
  }])

  // STEP 2 - building command
  // STEP 3 - running
  const res = spawn("ffmpeg", [
    "-i", path,
    "-c:v", "libx264",
    "-s", `${width}x${height}`,
    path + name + ".mp4"
  ])

  // STEP 4 - handling output
  res.stdout.on("data", (data: any) => {
    console.log(`Data ---> `, data.toString())
  })

  res.stderr.on("data", (data: any) => {
    console.log(`Error ---> `, data.toString())
  })

  res.on("close", () => {
    console.log(`Ready`)
  })
})()
