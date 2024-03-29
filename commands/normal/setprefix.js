module.exports = {
    name: "setprefix",
    synopsis: "",
    description: "setprefix <prefix> | sets the bot's prefix",
    options: "",
    execute(msg, admin, cmd, args, Discord, client) {
        if(!/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/a-z0-9]{2}$/.test(args[0])) return msg.channel.send("Please limit the prefix to a single alphanumeric or symbol character");
        admin.firestore().collection("guilds").doc(msg.guild.id).set({
            prefix: args[0]
        }).then(() => {
            msg.react("✅");
        });
    },
}