module.exports = {
    name: "setname",
    description: "setname <name> | set the game's name",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, createEmbed, editEmbed) {
        if (!args[0]) return msg.channel.send("Please include the new name");
        let name = "";
        if (args[0])
            for (let i = 0; i < args.length; i++)
                name += `${args[i]} `;

        await admin.firestore().collection("guilds").doc(msg.guild.id).set({
            gameList: {
                [`${game}`]: {
                    name: name
                }
            }
        }, { merge: true })
            .catch((error) => {
                msg.react("❌");
                console.log(error);
            });
            
        editEmbed(msg, game, embedChannel);
        msg.react("✅");
    },
}