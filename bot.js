
//import discord
const Discord = require("discord.js");
const client = new Discord.Client();
//import youtube download module
const ytdl = require("ytdl-core");
//import utilities
const utilities = require("./utilities.js");
//firebase
const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore(); //13:37

//client.login(process.env.TOKEN);
client.login("NjYyNzgwMDc4MzM3NDI1NDgx.Xg-8DA.7BbXctKTsA9zpp9uJiGONLOjvKc");

global.servers = {}; //object list to store URLs and prevents overlapping music from multiple servers

client.on("ready", () => {
    console.log("bot is ready");
    client.user.setActivity("and giving headpats", { //status
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=fZCzsG1I9Ak"
    });
    prefix = "|";
    gameList = {
        au: "Among Us",
        mc: "Minecraft",
        d2: "Drawful 2",
        fg: "Fall Guys",
        osu: "Osu!"
    }
    embedchannelid = "746864165704171530"; /* "746501018694582346"; */

    //time
    let date = new Date();
    let hour = date.getHours();
    let till = 0;
    if(hour < 7){
        till = 7 - hour;
    }
    else if(hour > 7){
        till = (24 - hour) + 7;
    }
    console.log(till);
    setTimeout(() => {
        client.channels.get("745349500587212943").send("Good Morning!!!");
    }, till * 3600000);

    //find time till 7:00 AM and then create settimeout. say goodmorning. also au.end
});

client.on("message", async (msg) => {

    //actual commands
    if (msg.content[0] == "|") {

        //args[1] returns the second word of the message; this function splits the message into individual words and places them into an array.
        let args = msg.content.substring(prefix.length).split(" "); //.split(" ") turns args into an array.

        if (msg.guild) {
            switch (args[0]) { //Note: If you set the argument to a string and case the string, it'll spam the function 5 times.
                //replies
                case "ping":
                    console.log("ping");
                    const OMEGALUL = client.emojis.cache.find(emoji => emoji.name == "omegalul");
                    msg.channel.send(`p${OMEGALUL}ng`) //back tick (`) is the tilda key -- it encloses a Template Literal. Unlike "" and '' it can contain placeholders.
                    break;
                case "owo":
                    console.log("owo");
                    msg.channel.send("uwu");
                    break;
                case "uwu":
                    console.log("uwu");
                    msg.channel.send("owo");
                    break;
                case "clear":
                    console.log("clear");
                    if (!args[1]) return msg.channel.send("Please state the number of messages to clear.");
                    let messageCount = parseInt(args[1]) || 1;
                    msg.channel.bulkDelete(messageCount);
                    msg.channel.send("deleted " + messageCount + " messages");
                    break;
                case "serverlist":
                    console.log("servers");
                    var serverList = client.guilds.cache.map(g => g.name);
                    msg.channel.send(serverList);
                    break;
                case "help": //organize the commands
                    console.log("help");
                    //msg.channel.send("Please help " + msg.author.username);
                    //remember to re-add "clear"
                    msg.channel.send("Prefix: | " +
                        "\nCommands: " +
                        "\n ping " +
                        "\n owo " +
                        "\n uwu " +
                        "\n serverlist " +
                        "\n emotelist <server name> " + //args[1] not required: defaulted to current server
                        "\n emote (add <-> at the end of message to anonymise)" +
                        "\n say (add .e.<emote name> for emote, enclose message with <-> to anonymise) " + //defaulted to non-anonymous. Suggestion: could also maybe enclose the message in "-"?
                        "\n schedule <activity>,<activity> <time>-<time> " +
                        "\n fate <number> <number> - give a ratio and it'll flip an uneven coin accordingly" +
                        "\n react <emote name> <message id>" +
                        "\n au/mc/d2/fg/osu.help " +
                        "\n lenny " +
                        "\n spacify "

                    );
                    break;
                /*
                case "patchnotes": //place latest patch notes here
                    msg.channel.send(
                        "In Progress: " +
                        "None" +
                        "\nLatest Updates (|help for command specifics):" +
                        "\n (3/7/2020)" +
                        "\n - |say: allow user to choose whether or not to be anonymous (default non-anonymous)" +
                        "\n - |emote: delete emote command and include anonymity by choice (default non-anonymous)" +
                        "\n (2/23/2020)" +
                        "\n - |emotelist" +
                        "\n - |serverlist"
                    );
                    break;
                */
                //emotes
                case "emote":
                    console.log("emote");
                    var emote = client.emojis.cache.find(e => e.name == args[1]);
                    if (args[1] == null) return msg.channel.send("The emote '" + args[1] + "' is not found. Please check for capitalization.");
                    msg.delete();
                    msg.channel.send(msg.author.username);
                    msg.channel.send(`${emote}`);
                    break;
                case "emotelist":
                    console.log("emotelist");//give the bot 40 emotes (10 lines, 4 emotes per line) per message
                    var message = [];
                    function checkForSplit() {
                        utilities.splitArray(emoteList, 32, message);
                        for (i in message) {
                            compileEmotes(message[i]);
                        }
                    }
                    function compileEmotes(list) {
                        for (i = 4; i < list.length; i += 5) {
                            list.splice(i, 0, "\n");
                        }
                        return msg.channel.send(list.join(""));
                    }
                    if (!args[1]) { //defaults to current guild
                        var emoteList = msg.guild.emojis.cache.map(emoji => "[``" + emoji.name + "`` | " + `${emoji}` + "]  ");
                        checkForSplit();
                    }
                    else {
                        args.shift();
                        var server = client.guilds.cache.find(g => g.name === args.join(" "));
                        var emoteList = server.emojis.cache.map(emoji => "[``" + emoji.name + "`` | " + `${emoji}` + "]  ");
                        checkForSplit();
                    }
                    break;
                case "lenny":
                    msg.delete();
                    msg.channel.send(`${msg.author.username}: ( ͡° ͜ʖ ͡°)`);
                    break;
                case "spacify":
                    console.log("spacify [" + msg.author.username + "] [" + msg.guild.name + "]");
                    msg.delete();
                    if (args[1] == null) return msg.channel.send("Please state the message to be sent.");
                    let spaced = msg.author.username + ": ";
                    for (let i = 9; i < msg.content.length; i++) {
                        spaced += `${msg.content[i]} `;
                    }
                    msg.channel.send(spaced);
                    break;
                case "say": //can probably simplify the things more. -- to make anonymous
                    console.log("say [" + msg.author.username + "] [" + msg.guild.name + "]");
                    msg.delete();
                    if (args[1] == null) return msg.channel.send("Please state the message to be sent.");
                    if (args[1] === "help" && args[2] == null) return msg.channel.send("Makes the bot send a message. Add .e. before an emote name to send an emote.");
                    //checks for anonymity
                    if (args[args.length - 1] == "-" && args[args.length - 1] == "-") {
                        args.splice(0, 2);
                        args.pop();
                    }
                    else {
                        args[0] = "[" + msg.author.username + "]";
                    }
                    //checks for emotes
                    for (var i in args) {
                        if (args[i].includes(".e.")) {
                            var sayEmote = client.emojis.cache.find(emoji => emoji.name === args[i].substring(3));
                            if (sayEmote == null) return msg.channel.send("The emote '" + args[i].substring(3) + "' is not found. Please check for capitalization.");
                            args[i] = `${sayEmote}`;
                        }
                    }
                    msg.channel.send(args.join(" "));
                    console.log(args.join(" "));
                    break;
                case "react": //give the user a way to specify the message it wants to react to. defaulted to the one above.
                    console.log("react [" + msg.author.username + "] [" + msg.guild.name + "] [emote: " + args[1] + "] [msg id:" + args[2] + "]");
                    if (!args[1]) return msg.channel.send("react <emote name> <message id>");
                    console.log(msg.channel.lastMessageID);
                    var emote = client.emojis.cache.find(e => e.name == args[1]);
                    if (!emote) return msg.channel.send("That emote does not exist");
                    if (!args[2]) return msg.channel.send("Please provide the message ID");
                    msg.delete();
                    msg.guild.messages.fetch({ around: args[2], limit: 1 }).then(message => {
                        var reactMessage = message.first();
                        reactMessage.react(emote);
                    });
                    break;

                case "schedule": //|schedule cs,payday,headsnatchers 1:22-4,5-7:59 (make a schedule based off this)
                    //implement an alloted system (give an activity a minimum of time)
                    console.log("schedule");
                    if (!args[1]) return msg.channel.send("schedule <activity>,<activity> <time>-<time>");
                    var activities = utilities.shuffleArray(args[1].split(","));
                    var timestamps = args[2].split(",");
                    var assignments = [];
                    var difference = [];
                    var time = [];
                    var minutes = 0;
                    var tempvar;
                    var tempvar2;

                    //distribute
                    for (i = 0; i < timestamps.length; i++) {
                        minutes = (timestamps[i].split("-")[1].split(":")[0] - timestamps[i].split("-")[0].split(":")[0]) * 60;
                        if (timestamps[i].split("-")[0].split(":")[1])
                            minutes -= parseInt(timestamps[i].split("-")[0].split(":")[1]);
                        if (timestamps[i].split("-")[1].split(":")[1])
                            minutes += parseInt(timestamps[i].split("-")[1].split(":")[1]);
                        for (x = 0; x < (activities.length); x++) { //can simplify this a lot more, i bet
                            if (x < activities.length - 1) {
                                difference[x] = utilities.getRandomInteger(1, minutes); //push a value between 1 and sum, then subract, then push again, and subtract. set the last array value to the remaining sum.
                                minutes -= difference[x]; //for example: 3 activities: minutes = 180. gRI = 35, set difference[0] to 35. minutes = 145. gRI = 65. set difference[1] = 65. break out of for loop, set difference[2] = 80.
                            }
                            if (x == activities.length - 1) {
                                difference[x] = minutes;
                            }
                            //convert minutes to time
                            if (x == 0) {
                                if (timestamps[i].split("-")[0].split(":")[1]) {
                                    time[x] = parseInt(timestamps[i].split("-")[0]) + ":" + (parseInt(timestamps[i].split("-")[0].split(":")[1]) + difference[x]);
                                }
                                else {
                                    time[x] = timestamps[i].split("-")[0] + ":" + difference[x];
                                }
                            }
                            else {
                                tempvar2 = (parseInt(time[x - 1].split(":")[1]) + difference[x]);
                                time[x] = time[x - 1].split(":")[0] + ":" + tempvar2;
                            }
                            if (time[x].split(":")[1] >= 60) { //3:59 + 1 = 4:00
                                tempvar = time[x].split(":");
                                tempvar[0] = parseInt(time[x].split(":")[0]) + parseInt(time[x].split(":")[1] / 60);
                                tempvar[1] = time[x].split(":")[1] % 60;
                                time[x] = tempvar.join(":");
                            }
                            if (time[x].split(":")[0] > 12) { //12:00 + 1 = 1:00
                                tempvar = time[x].split(":");
                                tempvar[0] = time[x].split(":")[0] % 12;
                                time[x] = tempvar.join(":");
                            }
                            if (time[x].split(":")[1] < 10) { //4:50 + 11 = 5:01
                                tempvar = time[x].split(":");
                                tempvar[1] = "0" + time[x].split(":")[1];
                                time[x] = tempvar.join(":");
                            }
                            assignments.push(activities[x] + ": [" + time[x] + "] (" + difference[x] + " minutes)");
                        }
                    }
                    msg.channel.send(assignments);
                    break;

                case "fate":
                    console.log("fate");
                    if (!args[1]) return msg.channel.send("Please state a valid antecedent");
                    if (!args[2]) return msg.channel.send("Please state a valid consequent");
                    var antec = parseInt(args[1]);
                    var conseq = parseInt(args[2]);
                    var decider = utilities.getRandomInteger(0, (antec + conseq));

                    if (decider <= antec) msg.channel.send("Yes");
                    else msg.channel.send("No");
                    console.log(decider);
                    break;

                case "games":{
                    let abbs = Object.keys(gameList);
                    let list = `Games [${abbs.length}]`;
                    for (item in abbs) {
                        list += `\n - ${abbs[item]} (${gameList[abbs[item]]})`;
                    }
                    msg.channel.send(list);
                    break;
                }
                case "censor:": {
                    msg.channel.send("wip");
                    break;
                }
                case "poll": {
                    msg.channel.send("wip");
                    break;
                    //args[1] = message

                    /*preset emotes for y/n
                        - when a user clicks one, remove their reaction and add the vote count to a progress-bar
                        type thing, which displays the percent yes/no or smtn (like yt poll posts)
                        (keeps it anonymous) 
                    x button to delete the poll (only if poll creator/bean/me)    
                    */
                    let em = new Discord.MessageEmbed()
                        .setColor()
                        .setTimestamp()
                        .setDescription(/* message */)
                        .addField({name: /* yes */"name", value: /* changing value */"value"})
                        .addField({name: /* no */"name", value: /* changing value */"value"});
                }
            }
        }
        else { //messages from dms
            //client.channels.get(channelID).send(msg.toString());
        }
    }
    else {
        if (msg.content.split(" ")[0].includes(".") && msg.guild.id == "745349499958067230") {
            var type = msg.content.split(".");
            var abbs = Object.keys(gameList); //abbreviations
            for (item in abbs) {
                if (type[0] == abbs[item]) { //check if the game exists in list
                    let args = msg.content.substring(3).split(" ");

                    //set data vars
                    const game = db.collection("sessions").doc(abbs[item]);
                    var gdata = await game.get();

                    //basic party game commands
                    switch (args[0]) {
                        case "help": {
                            msg.channel.send(`Prefix: ${abbs[item]}` +
                                "\nCommands: " +
                                "\n start *code*" +
                                "\n end " +
                                "\n code " +
                                "\n setcode " +
                                "\n join " +
                                "\n clear " +
                                "\n leave " +
                                "\n ping "
                            );
                            break;
                        }
                        case "start": {
                            let now = new Date();
                            if(gdata.exists) {
                                let hours = parseInt(Math.abs((now - new Date(gdata.timestamp)) / (1000 * 60 * 60) % 24));
                                if(hours < 11){
                                    return msg.react("❌");
                                }
                                await game.delete();
                            }

                            switch(abbs[item]){
                                case "au": 
                                case "d2": {
                                    await game.set({
                                        users: [],
                                        code: null,
                                        time: null,
                                        embedid: null,
                                        timestamp: now
                                    });
                                    break;
                                }
                                case "mc": {
                                    await game.set({
                                        users: [],
                                        time: null,
                                        embedid: null,
                                        timestamp: now
                                    });
                                    break;
                                }
                                case "osu": {
                                    await game.set({
                                        users: [],
                                        time: null,
                                        password: null,
                                        embedid: null,
                                        timestamp: now
                                    });
                                    break;
                                }
                            }
                            createEmbed();

                            msg.react("✅");
                            break;
                        }
                        case "end": {
                            if(!gdata.exists) return msg.react("❌");
                            let props = gdata.data();
                            
                            msg.guild.channels.cache.get(embedchannelid).messages.fetch(props.embedid).then((message) => {
                                message.delete();
                                game.delete();
                                msg.react("✅");
                            }).catch((error) => {
                                msg.react("❌");
                                console.log(error);
                            })

                            break;
                        }
                        case "join": {
                            if(!gdata.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            let props = gdata.data();
                            if(props.users.includes(msg.author.id)) return msg.react("❌");

                            await game.update({
                                users: admin.firestore.FieldValue.arrayUnion(msg.author.id)
                            });

                            editEmbed();

                            msg.react("✅");
                            break;
                        }
                        case "leave": {
                            if(!gdata.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            let props = gdata.data();
                            if(!props.users.includes(msg.author.id)) return msg.react("❌");

                            await game.update({
                                users: admin.firestore.FieldValue.arrayRemove(msg.author.id)
                            });

                            editEmbed();

                            msg.react("✅");
                            break;
                        }
                        case "clear": {
                            await game.update({
                               users: [] 
                            });
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "ping": {
                            if(!gdata.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            let props = gdata.data();

                            let pingmessage = `ping! ${gameList[abbs[item]]} [ `;
                            for (let i = 0; i < props.users.length; i++) {
                                pingmessage += `<@!${props.users[i]}> `;
                            }
                            pingmessage += "]";
                            msg.channel.send(pingmessage);
                            msg.react("✅");
                            break;
                        }
                        case "setcode": {
                            /* if (!args[1]) return msg.channel.send("Please provide the new code"); */
                            if (args[1].length != 4 || /[^a-zA-Z]+/g.test(args[1])) return msg.channel.send("That is not a valid code");

                            if (!gdata.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (abbs[item] != "au" && abbs[item] != "d2") return msg.channel.send("Codes are not available for this game");
                            let code = args[1].toUpperCase();
                            if (!(/^[A-Z]{4}$/g.test(code))) return msg.react("❌");

                            await game.update({
                               code: code 
                            });
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "settime": {
                            if (!gdata.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (!(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(args[1]))) return msg.channel.send("State time in the format HH:MM");

                            await game.update({
                                time: args[1]
                            });
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        //manual commands cos ppl r too lazy to change channels
                        case "list": {
                            let props = gdata.data();

                            if (!gdata.exists) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (!props.users[0]) return msg.channel.send("The list is empty");

                            let nameList = `Players [${props.users.length}]`;
                            for (let i = 0; i < props.users.length; i++) {
                                nameList += "\n - " + (msg.guild.members.cache.get(props.users[i])).user.username;
                            }
                            msg.channel.send(nameList);
                            break;
                        }
                        case "code": {
                            let props = gdata.data();

                            if (abbs[item] != "au" && abbs[item] != "d2") return msg.channel.send("Codes are not available for this game");
                            if (!props.code) return msg.channel.send("There is no code");
                            msg.channel.send(props.code);
                            break;
                        }
                        case "delete": {
                            if (msg.author.id != "303922359595696138" && msg.author.id != "267080878503493632") return msg.react("❌");

                            msg.guild.channels.cache.get(embedchannelid).messages.fetch(args[1]).then((message) => {
                                message.delete();
                                msg.react("✅");
                            }).catch((error) => {
                                msg.react("❌");
                                console.log(error);
                            });
                            break;
                        }
                        //fun responses
                        case "fuck": {
                            if(args[1] == "you"){
                                let fu = client.emojis.cache.find(e => e.name == "kannafu");
                                return msg.channel.send(fu);
                            }
                            if(args[1] == "me"){
                                let x = utilities.getRandomInteger(0, 5);
                                let nos = ["いやだ", "no", "nein", "不", "아니", "never"];
                                return msg.channel.send(nos[x]);
                            }
                        }
                    }
                    //other game commands
                    async function createEmbed() {
                        var em = new Discord.MessageEmbed()
                            .setTitle(`${gameList[abbs[item]]}`)
                            .setTimestamp()
                            .setFooter("good morning gamers");

                        gdata = await game.get();
                        const props = gdata.data();

                        switch (abbs[item]) {
                            case "au": {
                                em
                                    .setColor('#ff2929')
                                    .setDescription("Play with 4-10 players online or via local WiFi as you attempt to lynch two imposters but end up lynching your friendships instead")
                                    .setURL('https://uploadhaven.com/download/c923e0b51044411fb1707340b858385a')
                                    .setThumbnail('https://cdn.discordapp.com/emojis/745802940580888706.png?v=1');
                                if (props.code) {
                                    em.addField('Code', props.code);
                                }

                                break;
                            }
                            case "mc": {
                                em
                                    .setColor('#4a6f28')
                                    .setDescription("If you need a description of minecraft you are hereby crippled")
                                    .addField('IP', 'partygames.ochi.pw\n144.217.111.35:25605')
                                    .setThumbnail('https://cdn.discordapp.com/icons/745349499958067230/59e07aecbc4cd38bba8e5f048d4fd477.png?size=128');
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
                        }
                        msg.guild.channels.cache.get(embedchannelid).send(em)
                            .then((message => {
                                game.update({
                                    embedid: message.id
                                });
                            }))
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    async function editEmbed() {
                        gdata = await game.get();
                        const props = gdata.data();

                        let nameList = `[${props.users.length}]`;
                        for (let i = 0; i < props.users.length; i++) {
                            nameList += "\n - " + (msg.guild.members.cache.get(props.users[i])).user.username;
                        }
                        const message = await msg.guild.channels.cache.get(embedchannelid).messages.fetch(props.embedid);
                        var em = message.embeds[0];
                        em.fields = [];
                        switch (abbs[item]) {
                            case "au":
                            case "d2": {
                                if (props.code)
                                    em.addField('Code', props.code);
                                if (props.time)
                                    em.addField('Time', props.time);
                                if (props.users[0])
                                    em.addField('Players', nameList);
                                break;
                            }
                            case "mc": {
                                if (props.users[0])
                                    em.addField('Players', nameList);
                                break;
                            }
                        }

                        msg.guild.channels.cache.get(embedchannelid).messages.fetch(props.embedid).then((message) => {
                            message.edit(em);
                        });
                    }
                    return;
                }
            }
        }
    }
});

function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1, str.length - 1);
}
/*
//initialization functions
function initialize(){
    iMusic();

function authorize(authorpermissionID, permission){ //take in member's role ID and check if the role meets 'permission' requirements. if so, return true.
    //in switchcase: if(authorize(msg.author.role, staff)){return;} or {return msg.channel.send("you do not have sufficient authority")}
    //return true/false
    //should probably rename the parameters to their actual names once you figure them out.
}*/
