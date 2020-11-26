const { VoiceChannel } = require("discord.js")

module.exports = {
    name: "leave",
    description: "leave | leave voice channel",
    execute(msg, admin, cmd, args, Discord) {
        //add client to all the parameters
        msg.member.voice.channel.leave();
    },
}