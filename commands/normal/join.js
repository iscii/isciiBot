module.exports = {
    name: "join",
    description: "join | join voice channel and sit there. sometimes, you just need some company.",
    execute(msg, admin, cmd, args, Discord) {
        if(msg.member.voice.channel)
            msg.member.voice.channel.join();
        else
            msg.channel.send("You are not in a voice channel");
    },
}