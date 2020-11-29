module.exports = {
    name: "setdesc",
    description: "setdesc <description> | set the embed description",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, createEmbed, editEmbed) {
        let desc = "";
        if (args[0])
            for (let i = 0; i < args.length; i++)
                desc += `${args[i]} `;
        console.log(desc);
        await admin.firestore().collection("guilds").doc(msg.guild.id).set({
            gameList: {
                [`${game}`]: {
                    description: desc
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