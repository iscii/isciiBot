const functions = require("../../functions.js");
module.exports = {
    name: "poll",
    synopsis: "",
    description: "poll -<title> -<description> -<option1> -<option 2> -<option 3> ... (Max 10) | Makes a poll. Participants are anonymous. Options are set via reaction. The poll expires in an hour. Remember to include a dash - between options.",
    options: "",
    async execute(msg, admin, cmd, args, Discord) {
        console.log(args);
        args = args.join(" ").split("-").filter(i => i !== "").map((i) => {
            if(i[i.length-1] === " ") return i.slice(0, i.length-1);
            return i;
        });
        let title = args.splice(0, 1)[0];
        let desc = args.splice(0, 1)[0];

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
            voted: [],
            //days: days,
            embedchannel: null
        });
        
        functions.displayPoll(msg, title);
    },
}   