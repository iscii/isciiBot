module.exports = {
    name: "owu",
    description: "owo // uwu | owu?",
    execute(msg, admin, cmd, args) {
        if(cmd == "owo")
            msg.channel.send("owo");
        else
            msg.channel.send("uwu");
    }
}