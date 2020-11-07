module.exports = {
    name: "ping",
    description: "ping",
    execute(msg, sessionGet, gameList, game) {
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        let props = sessionGet.data();

        let pingmessage = `ping! ${gameList[game]} [ `;
        for (let i = 0; i < props.users.length; i++) {
            pingmessage += `<@!${props.users[i]}> `;
        }
        pingmessage += "]";
        msg.channel.send(pingmessage);
        msg.react("✅");
    },
}