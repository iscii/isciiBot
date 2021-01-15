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
//client.login(process.env.TOKEN); //-- use this if ever plan on making repo public
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
        prefix: "i."
    });
});

client.on("guildDelete", (guild) => {
    console.log(`Left ${guild.name}`);
    db.collection("guilds").doc(guild.id).delete();
});

client.on("ready", async () => {
    console.log("bot is ready");
    connection = null;
    /*
    var x = client.guilds.cache.array();
    for (i in x) {
        db.collection("guilds").doc(x[i].id).update({

        }, { merge: true });
    }*/
    //time
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; //getmonth starts from 0
    let hour = date.getHours();
    let till = 0;

    if (hour < 6) {
        till = 7 - hour;
    }
    else if (hour > 7) {
        till = (24 - hour) + 7;
        day++;
    }

    let bd = await db.collection("birthdays").doc(month + "." + day).get();
    let ppl = bd.data();
    /*
    let game = await db.collection("sessions").doc("au").get();
    let props = game.data();
    */
    console.log(till);
    setTimeout(() => {
        client.channels.fetch("745349500587212943").then(async (channel) => { //745349500587212943
            //good morning
            channel.send(`Good Morning!!! ${client.emojis.cache.find(emoji => emoji.name == "miyanohey")}`);
            /*
            //end au session
            client.channels.cache.get(embedchannel).messages.fetch(props.embedid).then((message) => {
                message.delete();
                db.collection("sessions").doc("au").delete();
            }).catch((error) => {
                console.log(error);
            })*/
            //birthdays
            if (ppl) {
                let users = "";
                for (item in ppl.users) {
                    users += `<@!${ppl.users[item]}> `;
                }
                channel.send(`Happy Birthday!!! :birthday: ${users}`);
            }
        });
    }, till * 3600000);
});

client.on("message", async (msg) => {
    if (msg.author.bot) return;
    //holidays!! set a bot calendar thing that announces holidays/birthdays set by users
    //replace game w event
    //make bot autoping users in a queue
    //tic tac toe and rps
    //serveremotes list
    //music
    guild = db.collection("guilds").doc(msg.guild.id);
    guildGet = await guild.get();
    guildData = guildGet.data();
    prefix = guildData.prefix;

    if (msg.content.toLowerCase().startsWith(prefix)) cmdGeneral(msg);
    else cmdGames(msg);
});

async function cmdGeneral(msg) {
    const cmd = msg.content.slice(prefix.length).trim().split(" ")[0];
    const args = msg.content.slice(prefix.length).trim().split(" ").splice(1);
    if (msg.content.includes(prefix)) {
        //temporary for join and leave until you figure how to pass connection thru functions
        if (cmd == "join") {
            if (msg.member.voice.channel) connection = await msg.member.voice.channel.join(); else msg.channel.send("You are not in a voice channel");
            return;
        }
        if (cmd == "leave" && connection) return connection.disconect();
        if (client.normCmds.get(cmd) == undefined) return; //msg.channel.send("That command does not exist");
        if (cmd == "help") return client.normCmds.get("help").execute(msg, args, client, Discord, prefix);

        console.log(`${cmd} ${args}`);

        try {
            client.normCmds.get(cmd).execute(msg, admin, cmd, args, Discord, client);
        }
        catch (error) {
            msg.channel.send("There was an error");
            console.log(error);
        }
    }
}
async function cmdGames(msg) {
    const game = msg.content.toLowerCase().trim().split(" ")[0].split(".")[0];
    const cmd = msg.content.trim().split(" ")[0].split(".")[1];
    const args = msg.content.trim().split(" ").splice(1);

    gameList = guildData.gameList;
    embedChannel = guildData.embedChannel;

    if (msg.content.includes(".") && (gameList != undefined && gameList.hasOwnProperty(game))) {
        if (client.gameCmds.get(cmd) == undefined) return; //msg.channel.send("That command does not exist");
        if (cmd == "help") return client.normCmds.get("help").execute(msg, args, client, Discord, prefix);

        console.log(`${game} ${cmd} ${args}`);

        session = guild.collection("sessions").doc(game);
        sessionGet = await session.get()

        try {
            client.gameCmds.get(cmd).execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord, createEmbed, editEmbed);
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
        .setColor(gameList[game].color)
        .setDescription(gameList[game].description)
        .setURL(gameList[game].url)
        .setThumbnail(gameList[game].icon)
        .setFooter("Good Morning!")
        .setTimestamp();
    console.log("create embed");
    console.trace();
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
}
//disclaimer: I know there's a ton of redundant code and im a lil lazy to fix them pls forgiv