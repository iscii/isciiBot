const functions = require("../../functions.js");

module.exports = {
    name: "settime",
    synopsis: "",
    description: "settime <HH:MM> | set the time (ex: ex.settime 5:00 || ex.settime 5:30)",
    options: "",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!args[0]) return msg.react("❌");
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);

        let time = args[0];
        let meridian = "";
        if(args[1]){
            meridian = args[1].toUpperCase();
            if(!(meridian=="AM" || meridian=="PM")) return msg.channel.send("State meridian as AM or PM");
        }

        if (/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(time))
            await session.update({time: `${time} ${meridian}`});
        else if(/^(0?[1-9]|1[0-2])$/.test(time))
            await session.update({time: `${time}:00 ${meridian}`});
        else
            return msg.channel.send("State time in the format HH or HH:MM");

        functions.editEmbed(msg, game, embedChannel, session);
        msg.react("✅");
    },
}