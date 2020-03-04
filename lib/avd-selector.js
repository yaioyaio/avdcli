const inquirer = require("inquirer")

module.exports = {
  avdSelector: list => {
    list.push("Cancel")
    const questions = [
      {
        type: "rawlist",
        name: "avd",
        message: "What do you want to do?",
        choices: list
      }
    ]
    return inquirer.prompt(questions)
  }
}
