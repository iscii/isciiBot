module.exports = {
    name: "remove",
    description: "remove <abbreviation> | remove a game from gamelist",
    async executeexecute(msg, admin, cmd, args, Discord, client) {
        if(!args[0]) return msg.channel.send(this.description);
        let doc = admin.firestore().collection("guilds").doc(msg.guild.id);
        let docGet = await doc.get();
        let gameList = docGet.data().gameList;

        if(!gameList.hasOwnProperty(args[0])) return msg.react("❌");
        delete gameList[args[0]];

        await doc.set({
            gameList: gameList
        }).catch((error) => {
            msg.react("❌");
            console.log(error);
        });

        msg.react("✅");
    },
}