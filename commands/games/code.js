module.exports = {
    name: "code",
    description: "code",
    execute(msg, admin, session, sessionGet, gameList, embedchannel, game, args, createEmbed, editEmbed) {
        let props = sessionGet.data();

        if (game != "au" && game != "pw") return msg.channel.send("Codes are not available for this game");
        if (!props.code) return msg.channel.send("There is no code");
        msg.channel.send(props.code);
    },
}