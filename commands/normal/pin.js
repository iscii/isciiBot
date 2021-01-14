module.exports = {
    name: "pin",
    description: "pin <message id> | hehe only I can pin messages you mortals (this is exploit but pls don't remove my rights)",
    execute(msg, admin, cmd, args, Discord) {
        if(msg.author.id != "303922359595696138") return msg.react("❌");
        if(!args[0]) return msg.channel.send("Please provide the message id")
        msg.channel.messages.fetch(args[0]).then((msg) => {
            msg.pin();
            msg.react("✅");
        }).catch((error) => {
            msg.channel.send("The message could not be pinned");
            console.log(error);
            msg.react("❌");
        });
    },
}