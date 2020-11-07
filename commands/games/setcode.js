module.exports = {
    name: "setcode",
    description: "setcode",
    async execute(msg, sessionGet, args, game, editEmbed) {
        if (!args[0]) return msg.react("❌");

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        let code = args[0].toUpperCase();
        if (game != "au" || game != "pw") {
            if (!(/^[A-Z]{6}$/g.test(code))) return msg.react("❌");
        }
        else if (game == "ph") {
            if (!(/^[0-9]{6}$/g.test(code))) return msg.react("❌");
        }
        else
            return msg.channel.send("Codes are not available for this game");

        await session.update({
            code: code
        });
        editEmbed(msg, game);
        msg.react("✅");
    },
}