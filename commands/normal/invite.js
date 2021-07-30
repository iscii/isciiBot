module.exports = {
    name: "invite",
    synopsis: "",
    description: "invite | get my invite link :J",
    options: "",
    async execute(msg, admin, cmd, args, Discord, client) {
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