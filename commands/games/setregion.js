const functions = require("../../functions.js");

module.exports = {
    name: "setregion",
    description: "setregion <NA/EU/ASIA> | set the region (ex: ex.setregion NA)",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!args[0]) return msg.react("❌");

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);

        let region = args[0].toUpperCase();

        if (region != "NA" && region != "EU" && region != "ASIA") {
            msg.channel.send("Regions must be NA, EU, or ASIA");
            return msg.react("❌");
        }
        await session.update({
            region: region
        });
        functions.editEmbed(msg, game, embedChannel, session);
        msg.react("✅");
    },
}