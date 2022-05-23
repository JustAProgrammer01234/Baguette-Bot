const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("lock")
            .setDescription("Locks the thread."), 
    execute: async interaction => {
        if (!interaction.channel.isThread()) {
            await interaction.reply({ content: "This isn't a thread!", ephemeral: true})
            return 
        }
        await interaction.channel.setLocked(true)
        await interaction.reply("Successfully locked thread.")
    }
}