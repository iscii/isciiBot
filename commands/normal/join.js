module.exports = {
    name: "join",
    synopsis: "",
    description: "join | join voice channel and sit there. sometimes, you just need some company.",
    options: "",
    async execute(msg, connection, admin, cmd, args, Discord, client) {
        if(msg.member.voice.channel) connection = msg.member.voice.channel.join(); else msg.channel.send("You are not in a voice channel");
    },
}