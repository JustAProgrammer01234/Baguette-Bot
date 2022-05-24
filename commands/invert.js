const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invert")
        .setDescription("Inverts the pfp of a member.")
        .addUserOption(option => {
            return option.setName("member")
                .setDescription("the member to invert pfp")
        }), 
    execute: async (interaction) => {
        await interaction.reply("invert image")
    }
}