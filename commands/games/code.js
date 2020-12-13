module.exports = {
    name: "code",
    description: "code | get the code",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord, createEmbed, editEmbed) {
        let props = sessionGet.data();

        if (!props.code) return msg.channel.send("There is no code");
        msg.channel.send(props.code);
    },
}