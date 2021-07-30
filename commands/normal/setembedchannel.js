module.exports = {
    name: "setembedchannel",
    synopsis: "",
    description: "setembedchannel <channelid> | set the channel for game embeds",
    options: "",
    async execute(msg, admin, cmd, args, Discord, client) {
        if(!args[0]) return msg.channel.send(this.description);

        await admin.firestore().collection("guilds").doc(msg.guild.id).update({
            embedChannel: args[0]
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        });

        msg.react("✅");
    },
}