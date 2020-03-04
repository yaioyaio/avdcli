const util = require("util")
const exec = require("child_process").exec
const execProm = util.promisify(exec)

module.exports = {
  run_shell_command: cmd => {
    let result
    try {
      result = execProm(cmd)
      return result
    } catch (ex) {
      result = ex
    }
    if (Error[Symbol.hasInstance](result)) return

    return result
  }
}
