require("dotenv").config()

module.exports = {
	name: "messageCreate",
	once: false,
	execute: async message => {
		if (message.channelId != process.env.SERVER_SUGGESTIONS_ID) return; 

		await message.react("👍")
		await message.react("👎")

		const thread = await message.startThread({
			name: (message.content.length > 100) ? message.content.slice(0, 97) + "..." : message.content,
			autoArchiveDuration: 60,
			reason: "Someone suggested a thing."
		})
		
		await thread.join(); 
    }
};