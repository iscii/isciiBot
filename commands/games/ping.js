module.exports = {
    name: "ping",
    description: "ping | ping all players queued for session",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        let props = sessionGet.data();
        
        let pingmessage = `ping! ${gameList[game].name} [ `;
        for (let i = 0; i < props.users.length; i++) {
            pingmessage += `<@!${props.users[i]}> `;
        }

        pingmessage += "]";
        msg.channel.send(pingmessage);
    },
}