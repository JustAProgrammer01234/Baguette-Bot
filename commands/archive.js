const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("archive")
            .setDescription("Archives the thread."), 
    execute: async interaction => {
        if (!interaction.channel.isThread()) {
            await interaction.reply({ content: "This isn't a thread!", ephemeral: true})
            return 
        }

        await interaction.reply("Archiving thread.")
        await interaction.channel.setArchived(true)
    }
}