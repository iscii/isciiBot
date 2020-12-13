module.exports = {
    name: "seticon",
    description: "seticon <icon url> | set the embed icon",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord, createEmbed, editEmbed) {
        if(!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(args[0]))
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
        });;

        editEmbed(msg, game, embedChannel);
        msg.react("✅");
    },
}