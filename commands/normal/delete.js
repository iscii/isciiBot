module.exports = {
    name: "delete",
    description: "delete",
    execute(msg, embedchannel, args) {
        if (msg.author.id != "303922359595696138") return msg.react("❌");

        msg.guild.channels.cache.get(embedchannel).messages.fetch(args[0]).then((message) => {
            message.delete();
            msg.react("✅");
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        });
    },
}