const functions = require("../../functions.js");

module.exports = {
    name: "leave",
    description: "leave | leave the session queue",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
        let props = sessionGet.data();
        if (!props.users.includes(msg.author.id)) return msg.react("❌");

        await session.update({
            users: admin.firestore.FieldValue.arrayRemove(msg.author.id)
        });

        functions.editEmbed(msg, game, embedChannel, session);

        msg.react("✅");
    },
}