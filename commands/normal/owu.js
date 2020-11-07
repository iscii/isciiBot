module.exports = {
    name: "owu",
    description: "owu",
    execute(msg, cmd) {
        if(cmd == "owo")
            msg.channel.send("owo");
        else
            msg.channel.send("uwu");
    }
}