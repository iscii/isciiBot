const functions = require("../../functions.js");
module.exports = {
    name: "poll",
    description: "poll <title>-<description>-<days (max 7)>-<option1>-<option 2>-<option 3>- ... (Max 10) | Makes a poll that lasts <day> days. Participants are anonymous. Options are set via reaction. Remember to include a dash - between options.",
    async execute(msg, admin, cmd, args, Discord) {
        args = args.join(" ").split("-");
        let title = args.splice(0, 1)[0];
        let desc = args.splice(0, 1)[0];
        let temp = args.splice(0, 1)[0];
        if(isNaN(parseInt(temp))) return msg.channel.send("Please enter a number for the day count");
        let days = parseInt(temp)>7 ? 7 : parseInt(temp);

        if (args.length > 10) return msg.channel.send("Max 10 options per poll >:(");

        stats = [];
        for (let i = 0; i < args.length; i++) {
            stats[i] = {};
            stats[i][args[i]] = 0;
        }
        await admin.firestore().collection("guilds").doc(msg.guild.id).collection("polls").doc(title).set({
            title: title,
            desc: desc,
            stats: stats,
            votes: 0,
            voted: [],
            days: days,
            embedchannel: null
        });
        
        functions.displayPoll(msg, title);
    },
}   