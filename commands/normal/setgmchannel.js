module.exports = {
    name: "setgmchannel",
    synopsis: "",
    description: "(WIP) setgmchannel <channelid> | set the channel for good mornings",
    options: "",
    async execute(msg, admin, cmd, args, Discord, client) {
        if(!args[0]) return msg.channel.send(this.description);

        await admin.firestore().collection("guilds").doc(msg.guild.id).update({
            gmChannel: args[0]
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        });

        msg.react("✅");
    },
}