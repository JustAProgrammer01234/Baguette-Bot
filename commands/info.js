const { SlashCommandBuilder, time, inlineCode } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Gets info from this server or the bot itself.")
        .addStringOption(option =>
            option.setName("option")
                .setDescription("choose an option")
                .setRequired(true)
                .addChoices(
                    {name: "This server", value: "guild"},
                    {name: "This bot", value: "bot"}
                )
        ), 
    execute: async interaction => {
        const option = interaction.options.getString("option")
        const embed = new MessageEmbed()
        const message = {}

        embed.setColor("#FBCEB1")

        switch (option) {
            case "guild":
                const guild = interaction.guild 

                await guild.members.fetch()
                const owner = await guild.fetchOwner()

                const users = guild.members.cache.filter(m => !m.user.bot).size 
                const bots = guild.members.cache.filter(m => m.user.bot).size 
                const text_channels = guild.channels.cache.filter(c => c.isText()).size
                const voice_channels = guild.channels.cache.filter(c => c.isVoice()).size
                const category_channels = guild.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size

                embed.setTitle("Information about this uhhh server:")
                embed.setDescription(guild.description)
                embed.setThumbnail(guild.iconURL())
                embed.addFields(
                    {name: "Created at:", value: time(guild.createdAt, "F")},
                    {name: "Owner:", value: owner.toString()},
                    {name: "Members:", value: `Users: ${users}\nBots: ${bots}\nTotal: ${guild.memberCount}`, inline: true}, 
                    {name: "Channels:", value: `Text Channels: ${text_channels}\nVoice Channels: ${voice_channels}\nCategory Channels: ${category_channels}\nTotal: ${guild.channels.channelCountWithoutThreads}`, inline: true}
                )
                message.embeds = [ embed ]
                break 
            case "bot":
                const bot = interaction.client 
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel("Source")
                            .setStyle("LINK")
                            .setURL("https://github.com/JustAProgrammer01234/Baguette-Bot")
                    )

                embed.setTitle("Just some info about this bot ;)")
                embed.setThumbnail(bot.user.avatarURL())
                embed.addFields(
                    {name: "Was ready at:", value: time(bot.readyAt, "F")},
                    {name: "Latency:", value: inlineCode(`${bot.ws.ping}ms`)}
                )
                message.embeds = [ embed ]
                message.components= [ row ]
                break  
        }
        await interaction.reply(message)
    }
}