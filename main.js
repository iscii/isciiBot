//discord
const Discord = require("discord.js");
const client = new Discord.Client();
//const collection = new Discord.Collection();

//firebase
const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore(); //13:37

//fs
const fs = require("fs");
client.normCmds = new Discord.Collection();
client.gameCmds = new Discord.Collection();

//local js
const utilities = require("./utilities.js");

//login
//client.login(process.env.TOKEN); -- use this if ever plan on making repo public
client.login("NjYyNzgwMDc4MzM3NDI1NDgx.Xg-8DA.7BbXctKTsA9zpp9uJiGONLOjvKc");

//get command files
const normCmdFiles = fs.readdirSync("./commands/normal").filter(file => file.endsWith(".js"));
const gameCmdFiles = fs.readdirSync("./commands/games").filter(file => file.endsWith(".js"));
for (const file of normCmdFiles) {
    if (file == "1-format.js") continue;
    const command = require(`./commands/normal/${file}`);
    client.normCmds.set(command.name, command);
}
for (const file of gameCmdFiles) {
    if (file == "1-format.js") continue;
    const command = require(`./commands/games/${file}`);
    client.gameCmds.set(command.name, command);
}

//client
client.on("guildCreate", (guild) => {
    console.log(`Joined ${guild.name}`);
    db.collection("guilds").doc(guild.id).set({
        exists: true,
        prefix: "|"
    });
});

client.on("guildDelete", (guild) => {
    console.log(`Left ${guild.name}`);
    db.collection("guilds").doc(guild.id).delete();
});

client.on("ready", async () => {
    console.log("bot is ready");
    /*
    var x = client.guilds.cache.array();
    for (i in x) {
        db.collection("guilds").doc(x[i].id).update({

        }, { merge: true });
    }*/
});

client.on("message", async (msg) => {
    if (msg.author.bot) return;
    //holidays!! set a bot calendar thing that announces holidays/birthdays set by users
    //make bot autoping users in a queue
    //tic tac toe and rps
    //serveremotes list
    //join channel so ppl dont feel lonely
    guild = db.collection("guilds").doc(msg.guild.id);
    guildGet = await guild.get();
    guildData = guildGet.data();
    prefix = guildData.prefix;

    if (msg.content.startsWith(prefix)) cmdGeneral(msg);
    else cmdGames(msg);
});
function cmdGeneral(msg) {
    const cmd = msg.content.slice(prefix.length).trim().split(" ")[0];
    const args = msg.content.slice(prefix.length).trim().split(" ").splice(1);

    if (msg.content.includes(prefix)) {
        if (client.normCmds.get(cmd) == undefined) return msg.channel.send("That command does not exist");
        if (cmd == "help") return client.normCmds.get("help").execute(msg, args, client, Discord, prefix);

        console.log(`${cmd} ${args}`);

        try {
            client.normCmds.get(cmd).execute(msg, admin, cmd, args, Discord);
        }
        catch (error) {
            msg.channel.send("There was an error");
            console.log(error);
        }
    }
}
async function cmdGames(msg) {
    const game = msg.content.trim().split(" ")[0].split(".")[0];
    const cmd = msg.content.trim().split(" ")[0].split(".")[1];
    const args = msg.content.trim().split(" ").splice(1);

    gameList = guildData.gameList;
    embedChannel = guildData.embedChannel;

    if (msg.content.includes(".") && (gameList != undefined && gameList.hasOwnProperty(game))) {
        if (client.gameCmds.get(cmd) == undefined) return msg.channel.send("That command does not exist");
        if (cmd == "help") return client.normCmds.get("help").execute(msg, args, client, Discord, prefix);

        console.log(`${game} ${cmd} ${args}`);

        session = guild.collection("sessions").doc(game);
        sessionGet = await session.get();

        try {
            client.gameCmds.get(cmd).execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed);
        }
        catch (error) {
            msg.channel.send("There was an error");
            console.log(error);
        }
    }
}
async function createEmbed(msg, game, embedChannel) {
    var em = new Discord.MessageEmbed()
        .setTitle(gameList[game].name)
        .setTimestamp()
        .setFooter("Good Morning!")
        .setColor(gameList[game].color)
        .setDescription(gameList[game].description)
        .setURL(gameList[game].url)
        .setThumbnail(gameList[game].icon);

    let ch = await msg.guild.channels.cache.get(embedChannel);
    ch.send(em)
        .then((message => {
            session.update({
                embedid: message.id
            });
        }));
}

async function editEmbed(msg, game, embedChannel) {
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
        console.log("The game's embed exists in a non-embedChannel channel.");
        console.log(error);
    });

    let gameList = await db.collection("guilds").doc(msg.guild.id).get().then((data) => { return data.data().gameList; });

    var em = message.embeds[0]
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
        em.addField(`Players [${sessionData.users.length}]`, nameList);

    message.edit(em);
}
//disclaimer: I know there's a ton of redundant code and im a lil lazy to fix them pls forgiv