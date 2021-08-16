const functions = require("../../functions.js")

module.exports = {
    name: "help",
    synopsis: "",
    description: "help [g] | get list of commands (ex: |help // |help g)",
    options: "",
    execute(msg, args, client, Discord, prefix) {
        let list = client.normCmds;
        if (args[0] === "g") list = client.gameCmds;

        //array of message embeds
        let pages = [];
        for (let i = 0; i < Math.ceil(list.size / 5); i++) {
            pages[i] = new Discord.MessageEmbed()
                .setTitle(msg.guild.name)
                .setThumbnail(msg.guild.iconURL())
                .setFooter(`Page ${i+1}`)
                .setTimestamp()
                .addField("Info", `${args[0] === "g" ? "Game Commands\nPrefix: <abbreviation>.\t(ex: ex.start)" : `Normal Commands\nPrefix: ${prefix}\t(ex: ${prefix}help)`}`);
        }

        let c = 0;
        for (var key of list) {
            pages[Math.floor(c/5)].addField(key[0], "- " + list.get(key[0]).description);
            c++;
        }
    
        //improve descriptions
        //if categorize, organize command files into folders and use fs to get name of folder and organize per page or smtn
        functions.displayMenu(msg, pages, 0, false);
    },
}