module.exports = {
    name: "delete",
    description: "delete",
    execute(msg, admin, cmd, args) {
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