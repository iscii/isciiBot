/*ownerID = "303922359595696138";
prefix = "|";
*/

//import discord
const Discord = require("discord.js");
const client = new Discord.Client();
//import youtube download module
const ytdl = require("ytdl-core");
//import utilities
const utilities = require("./utilities.js");

client.login(process.env.TOKEN);
//client.login("");

global.servers = {}; //object list to store URLs and prevents overlapping music from multiple servers

client.on("ready", () => {
    console.log("bot is ready");
    client.user.setActivity("and giving headpats", { //status
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    });
    prefix = "|";
    gameInfo = [];
    gameList = {
        au: "Among Us",
        mc: "Minecraft",
        d2: "Drawful 2",
        fg: "Fall Guys",
        osu: "Osu!"
    }
    embedchannelid = "746864165704171530"; /* "746501018694582346"; */
});

client.on("message", (msg) => {

    //5% dad jokes
    //let args = msg.content.split(" ");
    /*
    if(args[0].toLowerCase() == "i'm" || args[0].toLowerCase() == "im"){
        if(utilities.getRandomInteger(0, 100) <= 10)
            return msg.channel.send("hi " + args.slice(1, args.length).join(" ") + ", i'm dad");
        else return;
    }
    if((args[0] + args[1]).toLowerCase() == "iam"){
        if(utilities.getRandomInteger(0, 100) <= 10)
            return msg.channel.send("hi " + args.slice(2, args.length).join(" ") + ", i'm dad");
        else return;
    }
    */
    /*
    for(item in args){
        if(args[item].toLowerCase().includes("fuck") || args[item].toLowerCase().includes("hate")){
            return msg.channel.send("Please remember that we are all friends and it's just a game");
        }
    }
    */
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

                //emotes
                case "emote":
                    console.log("emote");
                    var emote = client.emojis.cache.find(e => e.name == args[1]);
                    if (args[1] == null) return msg.channel.send("The emote '" + args[1] + "' is not found. Please check for capitalization.");
                    msg.delete();
                    if (args[2] == "-") msg.channel.send(`${emote}`);
                    else msg.channel.send("[" + msg.author.username + "] " + `${emote}`);
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
                    console.log("spacify [" + msg.author.username + "] [" + msg.guild.name + "] ");
                    msg.delete();
                    if (args[1] == null) return msg.channel.send("Please state the message to be sent.");
                    let spaced = "[" + msg.author.username + "]";
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

                case "games":
                    let abbs = Object.keys(gameList);
                    let list = `Games [${abbs.length}]`;
                    for (item in abbs) {
                        list += `\n - ${abbs[item]} (${gameList[abbs[item]]})`;
                    }
                    msg.channel.send(list);
                    break;
                /* for testing purposes
                case "test":
                    var var1 = args[1];
                    var var2 = args[2];
                    var array1 = [];
                    array1 = var1 + ":" + var2;
                    var replacement = array1.split(":");
                    replacement[1] = 5;
                    array1 = replacement.join(":");
                    console.log(array1.split(":"));
                break;
                */
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

                    //get index of game in gameInfo
                    var idx = null;
                    for (let i = 0; i < gameInfo.length; i++) {
                        if (gameInfo[i].abb == abbs[item]) idx = i;
                    }

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
                        /*
                        case "list": { //TODO remove this once the embed is in place
                            if (idx == null) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (!gameInfo[idx].players[0]) return msg.channel.send("The list is empty");

                            let nameList = `Players [${gameInfo[idx].players.length}]`;
                            for (let i = 0; i < gameInfo[idx].players.length; i++) {
                                nameList += "\n - " + (msg.guild.members.cache.get(gameInfo[idx].players[i])).user.username;
                            }
                            msg.channel.send(nameList);
                            break;
                        }
                        case "code": { //TODO remove this once the embed is in place
                            if (abbs[item] != "au" && abbs[item] != "d2") return msg.channel.send("Codes are not available for this game");
                            if (!gameInfo[idx].code) return msg.channel.send("There is no code");
                            msg.channel.send(gameInfo[idx].code);
                            break;
                        }*/

                        case "join": {
                            if (idx == null) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (gameInfo[idx].players.includes(msg.author.id)) return msg.react("❌");

                            gameInfo[idx].players.push(msg.author.id);
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "leave": {
                            if (idx == null) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);

                            for (let i = 0; i < gameInfo[idx].players.length; i++) {
                                if (gameInfo[idx].players[i] == msg.author.id) {
                                    gameInfo[idx].players.splice(i, 1);
                                    return msg.react("✅");
                                }
                            }
                            editEmbed();
                            msg.react("❌");
                            break;
                        }
                        case "clear": {
                            gameInfo[idx].list = [];
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "ping": {
                            let pingmessage = `ping! ${gameList[abbs[item]]} [ `;
                            for (let i = 0; i < gameInfo[idx].players.length; i++) {
                                pingmessage += `<@!${gameInfo[idx].players[i]}> `;
                            }
                            pingmessage += "]";
                            msg.channel.send(pingmessage);
                            msg.react("✅");
                            break;
                        }
                        case "setcode": {
                            /* if (!args[1]) return msg.channel.send("Please provide the new code");
                            if (args[1].length != 4 || /[^a-zA-Z]+/g.test(args[1])) return msg.channel.send("That is not a valid code");

                            gameInfo.code = args[1].toUpperCase(); */
                            if (idx == null) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (abbs[item] != "au" && abbs[item] != "d2") return msg.channel.send("Codes are not available for this game");
                            let code = args[1].toUpperCase();
                            if (!(/^[A-Z]{4}$/g.test(code))) return msg.react("❌");

                            gameInfo[idx].code = code;
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "settime": {
                            if (idx == null) return msg.channel.send(`Please start the game session with ${abbs[item]}.start`);
                            if (!(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(args[1]))) return msg.channel.send("State time in the format HH:MM");

                            gameInfo[idx].time = args[1];
                            editEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "start": {
                            if (idx != null) return msg.react("❌"); //if index was set (the game session exists) return
                            let code = null;
                            if (/^[a-zA-Z]{4}$/g.test(args[1])) code = args[1].toUpperCase();

                            idx = gameInfo.length;
                            gameInfo.push(eval(`new ${capitalize(abbs[item])}(code)`));
                            createEmbed();
                            msg.react("✅");
                            break;
                        }
                        case "end": {
                            if (idx == null) return msg.react("❌");
                            msg.guild.channels.cache.get(embedchannelid).messages.fetch(gameInfo[idx].embedid).then((message) => {
                                message.delete();
                                gameInfo.splice(idx, 1);
                                msg.react("✅");
                            }).catch((error) => {
                                msg.react("❌");
                                console.log(error);
                            })
                            break;
                        }
                        case "delete5": {
                            if (msg.author.id != "303922359595696138" && msg.author.id != "267080878503493632") return msg.react("❌");

                            msg.guild.channels.cache.get(embedchannelid).bulkDelete(5);
                            msg.react("✅");
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
                    }
                    //other game commands
                    function createEmbed() {
                        var em = new Discord.MessageEmbed()
                            .setTitle(`${gameList[abbs[item]]}`)
                            .setTimestamp()
                            .setFooter("good morning gamers");
                        switch (abbs[item]) {
                            case "au": {
                                em
                                    .setColor('#ff2929')
                                    .setDescription("Play with 4-10 players online or via local WiFi as you attempt to lynch two imposters but end up lynching your friendships instead")
                                    .setURL('https://uploadhaven.com/download/c923e0b51044411fb1707340b858385a')
                                    .setThumbnail('https://cdn.discordapp.com/emojis/745802940580888706.png?v=1');
                                if (gameInfo[idx].code) {
                                    em.addField('Code', gameInfo[idx].code);
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
                                if (gameInfo[idx].code) {
                                    em.addField('Code', gameInfo[idx].code);
                                }
                                break;
                            }
                        }
                        msg.guild.channels.cache.get(embedchannelid).send(em)
                            .then((message => {
                                gameInfo[idx].embedid = message.id;
                            }))
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    async function editEmbed() {
                        let nameList = `[${gameInfo[idx].players.length}]`;
                        for (let i = 0; i < gameInfo[idx].players.length; i++) {
                            nameList += "\n - " + (msg.guild.members.cache.get(gameInfo[idx].players[i])).user.username;
                        }
                        const message = await msg.guild.channels.cache.get(embedchannelid).messages.fetch(gameInfo[idx].embedid);
                        var em = message.embeds[0];
                        em.fields = [];
                        switch (abbs[item]) {
                            case "au":
                            case "d2": {
                                if (gameInfo[idx].code)
                                    em.addField('Code', gameInfo[idx].code);
                                if (gameInfo[idx].time)
                                    em.addField('Time', gameInfo[idx].time);
                                if (gameInfo[idx].players[0])
                                    em.addField('Players', nameList);
                                break;
                            }
                            case "mc": {
                                if (gameInfo[idx].players[0])
                                    em.addField('Players', nameList);
                                break;
                            }
                        }

                        msg.guild.channels.cache.get(embedchannelid).messages.fetch(gameInfo[idx].embedid).then((message) => {
                            message.edit(em);
                        });
                    }
                    return;
                }
            }
        }
    }
});

//game classes
function Au(code) {
    this.abb = "au";

    this.code = code;
    this.time = null;
    this.players = [];

    this.embedid = null;
}
function Mc() {
    this.abb = "mc";

    this.time = null;
    this.players = [];

    this.embedid = null;
}
function D2(code) {
    this.abb = "d2";

    this.code = code;
    this.time = null;
    this.players = [];

    this.embedid = null;
}
function Osu(password) {
    this.abb = "osu";

    this.password = password;
    this.time = null;
    this.players = [];

    this.embedid = null;
}
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
