const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Gets info from a member, this server, or the bot itself."), 
    execute: async (interaction) => {
        await interaction.reply("Information go brrr.")
    }
}