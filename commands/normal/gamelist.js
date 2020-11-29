module.exports = {
    name: "gamelist",
    description: "gamelist | get all games in the gamelist",
    async executeexecute(msg, admin, cmd, args, Discord, client) {
        let doc = admin.firestore().collection("guilds").doc(msg.guild.id);
        let docGet = await doc.get();
        let gameList = docGet.data().gameList;
        let games = "";
        var em = new Discord.MessageEmbed()
            .setTitle(msg.guild.name)
            .setThumbnail(msg.guild.iconURL())
            .setDescription("An assembly of cultured gamers. United we stand, one by one we fall... by that fucker in the vent")
            .setFooter("Hello!")
            .setTimestamp();

        for(var i in gameList)
            games += `- [${i}] ${gameList[i].name}\n`;

        em.addField('Games', games);
        msg.channel.send(em);
    },
}