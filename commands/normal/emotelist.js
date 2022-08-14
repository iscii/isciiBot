const utilities = require("../../utilities");
module.exports = {
	name: "emotelist",
	synopsis: "",
	description: "emotelist",
	options: "",
	execute(msg, admin, cmd, args, Discord) {
		console.log(args);
		var message = [];
		function checkForSplit() {
			utilities.splitArray(emoteList, 32, message);
			for (i in message) {
				compileEmotes(message[i]);
			}
		}
		function compileEmotes(list) {
			for (i = 4; i < list.length; i += 5) {
				list.splice(i, 0, "\n");
			}
			return msg.channel.send(list.join(""));
		}
		if (!args[1]) {
			//defaults to current guild
			var emoteList = msg.guild.emojis.cache.map(
				(emoji) => "[``" + emoji.name + "`` | " + `${emoji}` + "]  "
			);
			checkForSplit();
		} else {
			args.shift();
			var server = client.guilds.cache.find(
				(g) => g.name === args.join(" ")
			);
			var emoteList = server.emojis.cache.map(
				(emoji) => "[``" + emoji.name + "`` | " + `${emoji}` + "]  "
			);
			checkForSplit();
		}
	},
};
