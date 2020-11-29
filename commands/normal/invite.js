const { Emoji } = require("discord.js");

module.exports = {
    name: "invite",
    description: "invite | get my invite link :J",
    async executeexecute(msg, admin, cmd, args, Discord, client) {
        em = new Discord.MessageEmbed()
            .setTitle("Click Me!")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=662780078337425481&permissions=8&scope=bot")
            .setColor("ff7c6b")
            .setThumbnail(msg.client.user.avatarURL())
            .setDescription("isciiBot");
        msg.channel.send(em);
        msg.react("✅");
    },
}