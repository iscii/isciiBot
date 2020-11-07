module.exports = {
    name: "ping",
    description: "ping",
    execute(msg) {
        msg.channel.send("pong");
    }
}