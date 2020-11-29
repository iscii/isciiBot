module.exports = {
    name: "owu",
    description: "owo // uwu | owu?",
    executeexecute(msg, admin, cmd, args, Discord, client) {
        if(cmd == "owo")
            msg.channel.send("owo");
        else
            msg.channel.send("uwu");
    }
}