module.exports = {
    name: "end",
    description: "end | end the session",
    execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed) {
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