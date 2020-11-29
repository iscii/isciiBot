module.exports = {
    name: "delete",
    description: "delete <message id> <channel id> | hehe only I can delete messages you mortals (this is for testing purposes pls don't remove my rights)",
    executeexecute(msg, admin, cmd, args, Discord, client) {
        if (msg.author.id != "303922359595696138") return msg.react("❌");
        let channel = msg.guild.id;
        if(args[1]) channel = args[1];

        msg.guild.channels.cache.get(channel).messages.fetch(args[0]).then((message) => {
            message.delete();
            msg.react("✅");
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        });
    },
}