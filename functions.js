//eventually move functions here
const Discord = require("discord.js");

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
    createEmbed: async function (msg, game, embedChannel, session) {
        var em = new Discord.MessageEmbed()
            .setTitle(gameList[game].name)
            .setColor(gameList[game].color)
            .setDescription(gameList[game].description)
            .setURL(gameList[game].url)
            .setThumbnail(gameList[game].icon)
            .setFooter("Good Morning!")
            .setTimestamp();

        let ch = await msg.guild.channels.cache.get(embedChannel);
        ch.send(em)
            .then((message => {
                session.update({
                    embedid: message.id
                });
            }));
    },
    editEmbed: async function (msg, game, embedChannel, session) {
        let sessionData = await session.get().then((data) => { return data.data(); });
        if (sessionData == undefined) return console.log("session not started");

        let nameList = "";

        for (let i = 0; i < sessionData.users.length; i++) {
            await msg.guild.members.fetch(sessionData.users[i]).then((member) => {
                let m = member.user.username
                nameList += `\n - ${m}`;
            });
        }

        const message = await msg.guild.channels.cache.get(embedChannel).messages.fetch(sessionData.embedid).catch((error) => {
            console.log("The event's embed exists in a non-embedChannel channel.");
            console.log(error);
        });

        let gameList = await db.collection("guilds").doc(msg.guild.id).get().then((data) => { return data.data().gameList; });

        var em = message.embeds[0]
            .setTitle(gameList[game].name)
            .setColor(gameList[game].color)
            .setDescription(gameList[game].description)
            .setURL(gameList[game].url)
            .setThumbnail(gameList[game].icon);

        em.fields = [];

        if (sessionData.code)
            em.addField('Code', sessionData.code);
        if (sessionData.region)
            em.addField('Region', sessionData.region);
        if (sessionData.time)
            em.addField('Time', sessionData.time);
        if (sessionData.users[0])
            em.addField(`Participants [${sessionData.users.length}]`, nameList);

        message.edit(em);
    },
    displayPoll: async function (msg, create, title) {
        const polls = guild.collection("polls").doc(title);
        const data = await polls.get().then((data) => { return data.data(); });
        const emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

        if (!create) {
            const message = await msg.guild.channels.cache.get(data.embedchannel).messages.fetch(data.embedid).catch((error) => {
                console.log("The embed cannot be found");
                console.log(error);
            });
        }


        var em = new Discord.MessageEmbed()
            .setTitle(data.title)
            .setColor("#40E0D0")
            .setDescription(data.desc)
            .setFooter(`${data.votes} votes`)
            .setTimestamp();
        for (let i = 0; i < data.stats.length; i++) {
            const percent = data.votes > 0 ? Object.values(data.stats[i])[0] / data.votes * 100 : 0;
            const count = Math.floor(percent);
            em.addField(`[${i+1}] ${Object.keys(data.stats[i])[0]}`, (count > 0 ? `|**${"I".repeat(count)}**` : "|") + `${"I".repeat(100 - count)}| ${Object.values(data.stats[i])[0]} [${(percent).toFixed(2)}%]`);
        }

        if (create) {
            msg.channel.send(em).then((message => {
                polls.update({
                    embedid: message.id,
                    embedchannel: message.channel.id
                });
                //for each option, add a number
                for(let i=0;i<data.stats.length;i++){
                    message.react(emotes[i]);
                }
            }));
        }
        else {
            message.edit(em);
        }
    },
}