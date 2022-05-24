const rules = require("../rules/rules.json")
const staff_rules = require("../rules/staffrules.json")
const consequences = require("../rules/dontfollow.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("sendrules")
            .setDescription("Sends rules to a specific channel.")
            .addChannelOption(option => 
                option.setName("channel")
                    .setDescription("The channel to send the rules.")
                    .setRequired(true)
            ),
    execute: async interaction => {
        const channel = interaction.options.getChannel("channel")
        if (!channel.isText()) {
            await interaction.reply({ content: "That isn't a text channel smfh.", ephemeral: true })
            return 
        }
        await channel.send({ embeds: [rules, staff_rules, consequences] })
        await interaction.reply(`Successfully sent rules to ${channel}`)
    }
}