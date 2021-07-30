const functions = require("../../functions.js");

module.exports = {
    name: "seticon",
    synopsis: "",
    description: "seticon <icon url> | set the embed icon",
    options: "",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(args[0]))
            return msg.channel.send("That is not a valid url");

        await admin.firestore().collection("guilds").doc(msg.guild.id).set({
            gameList: {
                [`${game}`]: {
                    icon: args[0]
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