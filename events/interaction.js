const { MessageEmbed } = require("discord.js")
const { inlineCode } = require('@discordjs/builders');

module.exports = {
	name: "interactionCreate",
	once: false,
	execute: async (interaction, commands) => {
		if (!interaction.isCommand()) return; 

		const command = commands.get(interaction.commandName) 

		try {
			await command.execute(interaction)
		} catch (error) {
			const errorEmbed = new MessageEmbed()
				.setColor("#FF0000")
				.setTitle("An error occured!")
				.setDescription(inlineCode(error))
			await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
		}
    }
};