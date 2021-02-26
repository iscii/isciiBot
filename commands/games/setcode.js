const functions = require("../../functions.js");

module.exports = {
    name: "setcode",
    description: "setcode <code> | set the code (ex: ex.setcode ABCDEF)",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!args[0]) return msg.react("❌");

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        let code = args[0].toUpperCase(); // /^[A-Z]{6}$/g (au) /^[0-9]{6}$/g (ph)

        await session.update({
            code: code
        });
        
        functions.editEmbed(msg, game, embedChannel, session);
        msg.react("✅");
    },
}