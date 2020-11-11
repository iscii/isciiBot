module.exports = {
    name: "help",
    description: "help <[g]> | get list of commands (ex: |help // |help g)",
    execute(msg, args, client, Discord) {
        let commands = "";
        let list = client.normCmds;
        if(args[0] == "g") list = client.gameCmds;
        
        var em = new Discord.MessageEmbed()
            .setTitle(msg.guild.name)
            .setThumbnail(msg.guild.iconURL())
            .setFooter("Hiii")
            .setTimestamp();

        for(var key of list)
            commands += `- ${list.get(key[0]).description}\n`;

        em.addField(`${args[0]=="g" ? "Game" : "Normal"} Commands`, commands);
        return msg.channel.send(em);
    },
}