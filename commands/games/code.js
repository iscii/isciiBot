module.exports = {
    name: "code",
    description: "code | get the code",
    execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed) {
        let props = sessionGet.data();

        if (!props.code) return msg.channel.send("There is no code");
        msg.channel.send(props.code);
    },
}