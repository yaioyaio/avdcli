const commander = require("commander")
const fs = require("fs")
const _ = require("lodash")
const chalk = require("chalk")

const advList = require("./lib/avd-list")
const advSelector = require("./lib/avd-selector")

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
    console.log(chalk.red("Android avd list empty!!!\n"))
    return
  }
  if (selector.avd == "Cancel") {
    console.log(chalk.yellow("avdcli cancel!!!\n"))
    return
  }
  advList.run_shell_command(`emulator -avd ${selector.avd} -netdelay none -netspeed full`)
}

var Progress = require("progress"),
  bar = new Progress("running [:bar] :percent :etas", {
    complete: "=",
    incomplete: " ",
    width: 100,
    total: 1
  })

commander
  .action(function() {
    bar.tick()
    listRun()
      .then(data => {
        if (!data) {
          console.log(chalk.red("Android avd list empty!!!\n"))
          return
        }
        run(data)
      })
      .catch(() => {
        console.log(err)
      })
  })
  .parse(process.argv)
