require("dotenv").config() 
const { Client, Intents, Collection, version } = require("discord.js")
const fs = require("fs")

const baguette_bot = new Client({ intents: [Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
        Intents.FLAGS.GUILD_MEMBERS
    ]})
const commands = new Collection(); 

for (const cmd of fs.readdirSync('./commands')) {
    const command = require(`./commands/${cmd}`)
    commands.set(command.data.name, command)
}

for (const event_file of fs.readdirSync("./events")) {
    const event = require(`./events/${event_file}`)
    if (event.once) {
        baguette_bot.once(event.name, (...args) => event.execute(...args))
    } else {
        if (event.name == "interactionCreate") {
            baguette_bot.on(event.name, async (...args) => await event.execute(...args, commands))
        } else {
            baguette_bot.on(event.name, async (...args) => await event.execute(...args))
        }
    }
}

console.log(`Using djs version: ${version}`)
baguette_bot.login(process.env.TOKEN) 