const functions = require("../../functions.js");

module.exports = {
    name: "setdesc",
    synopsis: "",
    description: "setdesc <description> | set the embed description",
    options: "",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        let desc = "";
        if (args[0])
            for (let i = 0; i < args.length; i++)
                desc += `${args[i]} `;

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
            });

        functions.editEmbed(msg, game, embedChannel, session);
        msg.react("✅");
    },
}