const Help = require("./help")
const About = require("./about")
const Broadcast = require("./broadcast")

const commandList = [Help, About, Broadcast]


const commands = {}
commandList.map( command => {
    commands[command.command] = command
})

module.exports = {
    isCommandExist(commandName){
        return commandName in commands
    },
    commands
}