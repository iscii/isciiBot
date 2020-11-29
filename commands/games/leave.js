module.exports = {
    name: "leave",
    description: "leave | leave the session queue",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, createEmbed, editEmbed) {
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
        let props = sessionGet.data();
        if (!props.users.includes(msg.author.id)) return msg.react("❌");

        await session.update({
            users: admin.firestore.FieldValue.arrayRemove(msg.author.id)
        });

        editEmbed(msg, game, embedChannel);

        msg.react("✅");
    },
}