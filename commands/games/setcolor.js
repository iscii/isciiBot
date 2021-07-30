const functions = require("../../functions.js");

module.exports = {
    name: "setcolor",
    synopsis: "",
    description: "setcolor <hexcode> | set the embed color",
    options: "",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
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

        functions.editEmbed(msg, game, embedChannel, session);
        msg.react("✅");
    },
}