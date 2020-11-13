module.exports = {
    name: "say",
    description: "say <message [.e.<emotename>] [prefix]> | say stuff. include <.e.> to emote, <prefix> to anonymize. (ex: |say hi | // |say hi .e.poop)",
    async execute(msg, admin, cmd, args, Discord) {
        if (args[0] == null) return msg.channel.send("Please state the message to be sent.");
        msg.delete(); //* unknown message error: two instances of bot running; one deletes, the other can't find
        let prefix = await admin.firestore().collection("guilds").doc(msg.guild.id).get().then((data) => {return data.data().prefix;});

        //checks for anonymity
        if (args[args.length - 1] == prefix) {
            args.pop();
        }
        else {
            args.unshift(`[${msg.author.username}]`);
        }

        //checks for emotes
        for (var i in args) {
            if (args[i].includes(".e.")) {
                var sayEmote = msg.client.emojis.cache.find(emoji => emoji.name === args[i].substring(3));
                if (sayEmote == null) return msg.channel.send("The emote '" + args[i].substring(3) + "' is not found. Please check for capitalization.");
                args[i] = `${sayEmote}`;
            }
        }
        msg.channel.send(args.join(" "));
    },
}