module.exports = {
    name: "end",
    synopsis: "",
    description: "end | end the session",
    options: "",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        const props = sessionGet.data();
        if (!props) return msg.react("❌");

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