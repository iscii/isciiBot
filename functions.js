//eventually move functions here
const Discord = require("discord.js");

const admin = require("firebase-admin");
const { indexesOfArray } = require("./utilities.js");
const db = admin.firestore();

const utilities = require("./utilities.js");

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
    displayPoll: async function (msg, title, embedid, end) { //title is only passed upon creation
        const polls = guild.collection("polls").doc(title ? title : embedid);
        const get = await polls.get();
        const data = get.data();
        console.log(data);
        const emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

        const message = title ? null : await msg.guild.channels.cache.get(data.embedchannel).messages.fetch(embedid).catch((error) => {
            console.log("The embed cannot be found");
            console.log(error);
        });

        var em = new Discord.MessageEmbed()
            .setTitle(data.title)
            .setColor("#40E0D0")
            .setDescription(data.desc)
            .setFooter(`${data.voted.length} ${data.voted.length == 1 ? "vote" : "votes"}`)
            .setTimestamp();

        for (let i = 0; i < data.stats.length; i++) {
            const percent = data.voted.length > 0 ? Object.values(data.stats[i])[0] / data.voted.length * 100 : 0;
            const count = Math.floor(percent/2);
            em.addField(`[${i + 1}] ${Object.keys(data.stats[i])[0]}`, (count > 0 ? `|**${"I".repeat(count)}**` : "|") + `${"I".repeat(50 - count)}| ${Object.values(data.stats[i])[0]} [${(percent).toFixed(2)}%]`);
        }

        if (end) {
            em.addField("This poll has ended");
            polls.delete();
        }

        if (!message) {
            msg.channel.send(em).then((async message => {
                data.embedchannel = message.channel.id;
                const polls2 = guild.collection("polls").doc(message.id)
                await polls2.set(data).then(() => {
                    polls.delete();
                });

                for (let i = 0; i < data.stats.length; i++) {
                    message.react(emotes[i]);
                }
                const filter = (reaction, user) => {
                    return reaction.users.cache.has(client.user.id) && (user.id !== client.user.id);
                }
                const collector = message.createReactionCollector(filter, { time: (data.days * 86400000) });
                collector.on("collect", async (reaction, user) => {
                    /* if(data.voted.includes(user.id)) {
                        message.reactions.resolve(reaction).users.remove(user);
                        return msg.channel.send("You have already voted").then((message)=> {
                            setTimeout(() => {
                                message.delete();
                            }, 1000);
                        });
                    } */
                    const voted = data.voted;
                    voted.push(user.id);
                    const idx = utilities.indexesOf(emotes, reaction.emoji.name)[0];
                    let stats = data.stats;
                    stats[idx][Object.keys(stats[idx])[0]] += 1;

                    await polls2.update({
                        voted: voted,
                        stats: stats
                    })

                    message.reactions.resolve(reaction).users.remove(user);
                    this.displayPoll(msg, null, message.id, false);
                });
                collector.on("end", collected => {
                    message.reactions.removeAll().catch(error => console.log("Failed to clear reactions", error));
                    this.displayPoll(msg, null, message.id, true);
                });
            }));
        }
        else {
            message.edit(em);
        }
    },
}