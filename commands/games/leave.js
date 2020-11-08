module.exports = {
    name: "leave",
    description: "leave",
    async execute(msg, admin, session, sessionGet, gameList, embedchannel, game, args, createEmbed, editEmbed) {
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
        let props = sessionGet.data();
        if (!props.users.includes(msg.author.id)) return msg.react("❌");

        await session.update({
            users: admin.firestore.FieldValue.arrayRemove(msg.author.id)
        });

        editEmbed(msg, game);

        msg.react("✅");
    },
}