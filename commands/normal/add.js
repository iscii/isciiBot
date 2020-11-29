module.exports = {
    name: "add",
    description: "add <abbreviation> <name> | add a game to gamelist",
    async executeexecute(msg, admin, cmd, args, Discord, client) {
        if (!args[1]) return msg.channel.send(this.description);
        if (/[^ ].{3}/.test(args[0])) return msg.channel.send("please limit the abbreviation to three characters");
        let name = "";
        for (let i = 1; i < args.length; i++) {
            name += args[i] + " ";
        }
        await admin.firestore().collection("guilds").doc(msg.guild.id).set({
            gameList: {
                [args[0]]: {
                    name: name,
                    color: "#000000",
                    description: "",
                    url: null,
                    icon: null,
                }
            }
        }, { merge: true })
        .catch((error) => {
            msg.react("❌");
            console.log(error);
        });;
        
        msg.react("✅");
    },
}