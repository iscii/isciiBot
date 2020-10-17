//import discord
const Discord = require("discord.js");
const client = new Discord.Client();
const collection = new Discord.Collection();

//import youtube download module
const ytdl = require("ytdl-core");

//firebase
const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore(); //13:37

//import utilities
const utilities = require("./utilities.js");
//other js
const bGames = require("./games.js");

//client.login(process.env.TOKEN);
client.login("NjYyNzgwMDc4MzM3NDI1NDgx.Xg-8DA.7BbXctKTsA9zpp9uJiGONLOjvKc");

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    prefix = "|";
    gameList = {
        au: "Among Us",
        mc: "Minecraft",
        d2: "Drawful 2",
        fg: "Fall Guys",
        osu: "Osu!"
    }

    let guild = await db.collection("guilds").doc(guild.id).get();
    gData = guild.data();

});

client.on("message", msg => {
    if (!message.content.startsWith(prefix)) cmdGeneral(msg);
    else cmdGames(msg);

});
function cmdGeneral(msg) {
}
function cmdGames(msg) {
    const game = msg.content.split(" ")[0].split(".")[0];
    const cmd = msg.content.split(" ")[0].split(".")[1];
    const args = msg.content.split(" ").splice(0, 1)[0];
    
}
