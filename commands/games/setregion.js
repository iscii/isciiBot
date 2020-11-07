module.exports = {
    name: "setregion",
    description: "setregion",
    async execute(msg, session, sessionGet, args, game, editEmbed) {
        if (!args[0]) return msg.react("❌");

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        if (game != "au" && game != "pw") return msg.channel.send("Regions are not available for this game");

        let region = args[0].toUpperCase();

        if (region != "NA" && region != "EU" && region != "ASIA") {
            msg.channel.send("Regions must be NA, EU, or ASIA");
            return msg.react("❌");
        }
        await session.update({
            region: region
        });
        editEmbed(msg, game);
        msg.react("✅");
    },
}