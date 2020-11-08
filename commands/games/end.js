module.exports = {
    name: "end",
    description: "end",
    execute(msg, admin, session, sessionGet, gameList, embedchannel, game, args, createEmbed, editEmbed) {
        if (!sessionGet.exists) return msg.react("❌");
        const props = sessionGet.data();

        msg.guild.channels.cache.get(embedchannel).messages.fetch(props.embedid).then((message) => {
            session.delete();
            message.delete();
            msg.react("✅");
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        })
    },
}