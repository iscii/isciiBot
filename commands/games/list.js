module.exports = {
    name: "list",
    description: "list | lists the event's queue, if you're too lazy to check their events channel",
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!sessionGet.exists) return msg.channel.send(`Please start the game session with ${game}.start`);
        let props = sessionGet.data();
        let nameList = "";
        for(user of props.users){
            await msg.guild.members.fetch(user).then((member) => {
                let m = member.user.username
                nameList += `\n - ${m}`;
            });
        }
        em = new Discord.MessageEmbed()
            .setTitle(gameList[game].name)
            .setColor("000000")
            .addField(`Players [${props.users.length}]`, nameList)
        msg.channel.send(em);
    },
}