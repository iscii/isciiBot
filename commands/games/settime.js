module.exports = {
    name: "settime",
    description: "settime",
    async execute(msg, admin, session, sessionGet, gameList, embedchannel, game, args, createEmbed, editEmbed) {
        if (!args[0]) return msg.react("❌");

        let time = args[0];

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        if (!(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(time))) return msg.channel.send("State time in the format HH:MM");

        await session.update({
            time: time
        });

        editEmbed(msg, game);
        msg.react("✅");
    },
}