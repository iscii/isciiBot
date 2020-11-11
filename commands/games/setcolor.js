module.exports = {
    name: "setcolor",
    description: "setcolor <hexcode> | set the embed color",
    async execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed) {
        if(!(/[a-fA-F0-9]{6}$/g).test(args[0])) return msg.channel.send("That is not a valid hex code");

        await admin.firestore().collection("guilds").doc(msg.guild.id).set({
            gameList: {
                [`${game}`]: {
                    color: `${args[0]}`
                }
            }
        }, { merge: true })
        .catch((error) => {
            msg.react("❌");
            console.log(error);
        });;

        editEmbed(msg, game, embedChannel);
        msg.react("✅");
    },
}