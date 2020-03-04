const commander = require("commander")
const fs = require("fs")
const _ = require("lodash")
const chalk = require("chalk")
const Progress = require("progress")

const advList = require("./avd-list")
const advSelector = require("./avd-selector")

const listRun = async () => {
  const list = await advList.run_shell_command("emulator -list-avds")
  if (!list) {
    console.log(chalk.yellow("Android avd list empty!!!\n"))
    return
  }

  let temp = list.stdout.split("\n")
  let avds = temp.filter(t => t.replace(" ", "") != "")
  return avds
}

const run = async avds => {
  let selector = await advSelector.avdSelector(avds)
  if (!selector || selector.avd == "") {
    console.log(chalk.yellow("Android avd list empty!!!\n"))
    return
  }
  advList.run_shell_command(`emulator -avd ${selector.avd} -netdelay none -netspeed full`)
}

bar = new Progress("running [:bar] :percent :etas", {
  complete: "=",
  incomplete: " ",
  width: 100,
  total: 1
})

commander
  .version("0.0.1")
  .description("Android AVD list -> Choice Emulator Execute.")
  .action(function() {
    bar.tick()
    listRun()
      .then(data => {
        if (!data) {
          console.log(chalk.yellow("Android avd list empty!!!\n"))
          return
        }
        run(data)
      })
      .catch(() => {
        console.log(err)
      })
  })
  .parse(process.argv)
