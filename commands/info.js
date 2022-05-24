const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Gets info from a member, this server, or the bot itself.")
        .addStringOption(option =>
            option.setName("option")
                .setDescription("choose shit")
                .setRequired(true)
                .addChoices(
                    {name: "Guild", value: "guild"},
                    {name: "Member", value: "member"},
                    {name: "Bot", value: "bot"}
                )
        ), 
    execute: async interaction => {
        const option = interaction.options.getString("option")
        const embed = new MessageEmbed()

        switch (option) {
            case "guild":
                embed.setTitle("Information about this cool server:")
                embed.setDescription(interaction.guild.description)
                embed.setThumbnail(interaction.guild.iconURL())
                break 
            case "member":
                embed.setTitle("a")
                embed.setDescription("b")
                break 
            case "bot":
                embed.setTitle("a")
                embed.setDescription("b")
                break  
        }
        await interaction.reply({ embeds: [ embed ] })
    }
}