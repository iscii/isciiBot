module.exports = {
    name: "settime",
    description: "settime <HH:MM> | set the time (ex: ex.settime 5:00)",
    async execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed) {
        if (!args[0]) return msg.react("❌");

        let time = args[0];

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        if (!(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(time))) return msg.channel.send("State time in the format HH:MM");

        await session.update({
            time: time
        });

        editEmbed(msg, game, embedChannel);
        msg.react("✅");
    },
}