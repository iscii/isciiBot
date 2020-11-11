module.exports = {
    name: "setcode",
    description: "setcode <code> | set the code (ex: ex.setcode ABCDEF)",
    async execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed) {
        if (!args[0]) return msg.react("❌");

        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        let code = args[0].toUpperCase(); // /^[A-Z]{6}$/g (au) /^[0-9]{6}$/g (ph)

        await session.update({
            code: code
        });
        
        editEmbed(msg, game, embedChannel);
        msg.react("✅");
    },
}