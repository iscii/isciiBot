const functions = require("../../functions.js")

module.exports = {
    name: "help",
    description: "help [g] | get list of commands (ex: |help // |help g)",
    execute(msg, args, client, Discord, prefix) {
        let list = client.normCmds;
        if(args[0] == "g") list = client.gameCmds;
        
        var em = new Discord.MessageEmbed()
            .setTitle(msg.guild.name)
            .setThumbnail(msg.guild.iconURL())
            .setFooter("Hiii")
            .setTimestamp();
        
        em.addField("Info", `${args[0]=="g" ? "Game Commands\nPrefix: <abbreviation>.\t(ex: ex.start)" : `Normal Commands\nPrefix: ${prefix}\t(ex: ${prefix}help)`}`)
        for(var key of list){
            em.addField(key[0], "- "+list.get(key[0]).description);
        }

        return msg.channel.send(em);
    },
}