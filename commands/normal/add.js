module.exports = {
    name: "add",
    synopsis: "i.add <abbreviation> <name>",
    description: "add a game to the gamelist",
    options: "",
    async execute(msg, admin, cmd, args, Discord, client) {
        if (!args[1]) return msg.channel.send(this.description);
        if (/[^ ].{3}/.test(args[0])) return msg.channel.send("Please limit the abbreviation to three characters");
        let name = "";
        for (let i = 1; i < args.length; i++) {
            name += args[i] + " ";
        }
        await admin.firestore().collection("guilds").doc(msg.guild.id).set({
            gameList: {
                [`${args[0].toLowerCase()}`]: {
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