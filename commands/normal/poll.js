const functions = require("../../functions.js");
module.exports = {
    name: "poll",
    description: "poll <title> <description> <option1> <option 2> <option 3> ... (Max 10) | Makes a poll. Participants are anonymous. Options are set via reaction",
    async execute(msg, admin, cmd, args, Discord) {
        let title = args.splice(0, 1)[0];
        let desc = args.splice(0, 1)[0];
        if (args.length > 10) return msg.channel.send("Max 10 options per poll >:(");

        options = "";
        stats = [];
        for (let i = 0; i < args.length; i++) {
            stats[i] = {};
            stats[i][args[i]] = 0;
            options = `${args[i]} ${stats[i][args[i]]}`;
        }
        await admin.firestore().collection("guilds").doc(msg.guild.id).collection("polls").doc(title).set({
            title: title,
            desc: desc,
            stats: stats,
            options: options,
            votes: 0,
            embedid: null,
            embedchannel: null
        });
        
        functions.displayPoll(msg, true, title);
    },
}   