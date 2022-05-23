require("dotenv").config()
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberAdd", 
    once: false, 
    execute: async member => {
        const channel = member.guild.channels.cache.find(c => c.id == process.env.WELCOME_ID)
        const welcome_embed = new MessageEmbed()
            .setColor("#FBCEB1")
            .setTitle("Welcome to Baguette Hangout!")
            .setDescription("A place where you can hangout with people or vibe. Make sure to read the rules.\n\nHave fun!")
            .setThumbnail(member.displayAvatarURL())

        await channel.send({ content: member.toString(), embeds: [ welcome_embed ]})
    } 
}