module.exports = {
    name: "setprefix",
    description: "setprefix <prefix> | sets the bot's prefix",
    execute(msg, admin, cmd, args, Discord) {
        if(!/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/a-z0-9]{1}$/.test(args[0])) return msg.channel.send("Please limit the prefix to a single alphanumeric or symbol character");
        admin.firestore().collection("guilds").doc(msg.guild.id).set({
            prefix: args[0]
        }).then(() => {
            msg.react("✅");
        });
    },
}