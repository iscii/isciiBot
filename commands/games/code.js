module.exports = {
    name: "code",
    synopsis: "",
    description: "code | get the code",
    options: "",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        let props = sessionGet.data();

        if (!props.code) return msg.channel.send("There is no code");
        msg.channel.send(props.code);
    },
}