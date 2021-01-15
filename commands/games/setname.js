module.exports = {
    name: "setname",
    description: "setname <name> | set the game's name",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, createEmbed, editEmbed) {
        if(!args[0]) return msg.channel.send("Please include the new name");
        let desc = "";
        if (args[0])
            for (let i = 0; i < args.length; i++)
                desc += `${args[i]} `;
        session.update({
            name: args[0]
        });
        editEmbed(msg, game, embedChannel);
        msg.react("✅");
    },
}