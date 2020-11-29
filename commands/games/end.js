module.exports = {
    name: "end",
    description: "end | end the session",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, createEmbed, editEmbed) {
        if (!sessionGet.exists) return msg.react("❌");
        const props = sessionGet.data();

        msg.guild.channels.cache.get(embedChannel).messages.fetch(props.embedid).then((message) => {
            session.delete();
            message.delete();
            msg.react("✅");
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        })
    },
}