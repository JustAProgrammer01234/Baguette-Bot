require("dotenv").config() 
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)

const guildId = process.env.GUILD_ID; 
const clientId = process.env.CLIENT_ID
const commands = [] 

for (const cmd of fs.readdirSync('./commands')) {
    const command = require(`./commands/${cmd}`)
    commands.push(command.data.toJSON())
}

(async () => {
    try {
        console.log("Starting to register commands.")

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), 
            { body: commands }
        )

        console.log("Successfully registered commands.")
    }
    catch (error) {
        console.error(error); 
    }
})() 