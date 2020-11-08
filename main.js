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
for (const file of normCmdFiles){
    const command = require(`./commands/normal/${file}`);
    client.normCmds.set(command.name, command);
}
for (const file of gameCmdFiles){
    const command = require(`./commands/games/${file}`);
    client.gameCmds.set(command.name, command);
}

//client
client.on("guildCreate", async (guild) => {
    console.log("Joined a new guild: " + guild.name);
    let newGuild = await db.collection("guilds").doc(guild.id).get();
});

client.on("ready", async () => {
    console.log("bot is ready");
    //make these firebase dynamic and set them to a variable here
    prefix = "|";
    gameList = {
        au: "Among Us",
        d2: "Drawful 2",
        pw: "Project Winter",
        ph: "Phasmophobia"
    }
    embedchannel = "746864165704171530"; /* "746501018694582346" */;
});

client.on("message", async (msg) => {
    if (msg.author.bot) return;

    //holidays!! set a bot calendar thing that announces holidays/birthdays set by users
    guild = db.collection("guilds").doc(msg.guild.id);
    guildGet = await guild.get();
    guildData = guildGet.data();

    if (msg.content.startsWith(prefix)) cmdGeneral(msg);
    else cmdGames(msg);
});
function cmdGeneral(msg) {
    const cmd = msg.content.slice(prefix.length).trim().split(" ")[0];
    const args = msg.content.slice(prefix.length).trim().split(" ").splice(1);

    //console.log(cmd + args);
    if(msg.content.includes("|"))
        client.normCmds.get(cmd).execute(msg, admin, cmd, args);
}
async function cmdGames(msg) {
    const game = msg.content.trim().split(" ")[0].split(".")[0];
    const cmd = msg.content.trim().split(" ")[0].split(".")[1];
    const args = msg.content.trim().split(" ").splice(1);

    //console.log(game + cmd + args);

    if(game in gameList && msg.content.includes(".")){
        session = guild.collection("sessions").doc(game);
        sessionGet = await session.get();
        sessionData = sessionGet.data();
        
        client.gameCmds.get(cmd).execute(msg, admin, session, sessionGet, gameList, embedchannel, game, args, createEmbed, editEmbed);
    }
}
async function createEmbed(msg, game) {
    var em = new Discord.MessageEmbed()
        .setTitle(`${gameList[game]}`)
        .setTimestamp()
        .setFooter("good morning gamers");

    sessionGet = await session.get();
    const props = sessionGet.data();

    switch (game) {
        case "au": {
            em
                .setColor('#ff2929')
                .setDescription("Play with 4-10 players online or via local WiFi as you attempt to lynch two imposters but end up lynching your friendships instead")
                .setURL('https://gofile.io/d/CfY2cQ')
                .setThumbnail('https://cdn.discordapp.com/emojis/745802940580888706.png?v=1');
            if (props.code) {
                em.addField('Code', props.code);
            }

            break;
        }
        case "d2": {
            em
                .setColor('#34ebe1')
                .setDescription("Self-degradation by means of exposure to the reality of your lack of creativity and analysis")
                .setThumbnail('https://jackboxgames.b-cdn.net/wp-content/uploads/2019/07/drawful2.png');
            if (props.code) {
                em.addField('Code', props.code);
            }
            break;
        }
        case "pw": {
            em
                .setColor('#042850')
                .setDescription("sup bistch")
                .setThumbnail('https://cdn.mos.cms.futurecdn.net/gsSeq45MywRitkmmaSRgnk.jpg');
            if (props.code) {
                em.addField('Code', props.code);
            }
            break;
        }
        case "ph": {
            em
                .setColor("#000000")
                .setDescription("Some horror game I don't know about")
                .setThumbnail('https://steamcdn-a.akamaihd.net/steam/apps/739630/header.jpg?t=1600451822')
        }
    }
    msg.guild.channels.cache.get(embedchannel).send(em)
        .then((message => {
            session.update({
                embedid: message.id
            });
        }))
        .catch((error) => {
            console.log(error);
        });
}
async function editEmbed(msg, game) {
    sessionGet = await session.get();
    const props = sessionGet.data();

    let nameList = `[${props.users.length}]`;
    for (let i = 0; i < props.users.length; i++) {
        nameList += "\n - " + (msg.guild.members.cache.get(props.users[i])).user.username;
    }
    const message = await msg.guild.channels.cache.get(embedchannel).messages.fetch(props.embedid);
    var em = message.embeds[0];
    em.fields = [];
    switch (game) {
        case "au":
        case "d2":
        case "pw": {
            if (props.code)
                em.addField('Code', props.code);
            if (props.region)
                em.addField('Region', props.region);
            if (props.time)
                em.addField('Time', props.time);
            if (props.users[0])
                em.addField('Players', nameList);
            break;
        }
        case "ph": {
            if (props.time)
                em.addField('Time', props.time);
            if (props.users[0])
                em.addField('Players', nameList);
            break;
        }
    }

    message.edit(em);
}