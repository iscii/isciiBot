module.exports = {
    name: "ping",
    description: "ping",
    execute(msg, admin, cmd, args) {
        msg.channel.send("pong");
    }
}