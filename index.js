/*ownerID = "303922359595696138";
prefix = "|";
bot token = "NjYyNzgwMDc4MzM3NDI1NDgx.XhEMoQ.WHnPj1FsXJoxwJaI9FzirCv3RWA";
*/

//import discord
const Discord = require("discord.js");
const client = new Discord.Client();
//import youtube download module
const ytdl = require("ytdl-core");
//import utilities
const utilities = require("./utilities.js");

client.login(process.env.TOKEN);
//client.login("NjYyNzgwMDc4MzM3NDI1NDgx.Xk8ZzQ.5Yqc_tcIg8wyLj-DEVNH3Gkh1rY");

global.servers = {}; //object list to store URLs and prevents overlapping music from multiple servers

client.on("ready", () => {
    console.log("bot is ready");
    client.user.setActivity("and giving headpats", { //status
        type: "STREAMING",
        url: "https://www.twitch.tv/ninja"
    });
    prefix = "|";
});

client.on("message", (msg) => {

    //5% dad jokes
    let args = msg.content.split(" ");
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

    //actual commands
    if(msg.content[0] == prefix){

        //args[1] returns the second word of the message; this function splits the message into individual words and places them into an array.
        let args = msg.content.substring(prefix.length).split(" "); //.split(" ") turns args into an array.

        if(msg.guild){
            switch (args[0]){ //learn the switch statement. Note: If you set the argument to a string and case the string, it'll spam the function 5 times.
                //replies
                case "ping":
                    console.log("ping");
                    const OMEGALUL = client.emojis.find(emoji => emoji.name == "omegalul");
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
                    if(!args[1]) return msg.channel.send("Please state the number of messages to clear.");
                    let messageCount = parseInt(args[1]) || 1;
                    msg.channel.bulkDelete(messageCount);
                    msg.channel.send("deleted " + messageCount + " messages");
                break;
                case "serverlist":
                    console.log("servers");
                    var serverList = client.guilds.map(g => g.name);
                    msg.channel.send(serverList);
                break;
                case "help": //organize the commands
                    console.log("help");
                    //msg.channel.send("Please help " + msg.author.username);
                    //remember to re-add "clear"
                    msg.channel.send("Prefix: | \nCommands: \n ping \n owo \n uwu \n serverlist \n emotelist <server name> \n emote \n say (add .e.<emote name> for emote) \n schedule <activity>,<activity> <time>-<time> \n fate <number> <number> - give a ratio and it'll flip an uneven coin accordingly");
                break;

                //emotes
                case "emote":
                    console.log("emote");
                    var emote = client.emojis.find(emoji => emoji.name === args[1]);
                    if(args[1] == null) return msg.channel.send("The emote '" + args[1] + "' is not found. Please check for capitalization.")
                    msg.channel.send(`${emote}`);
                break;
                case "emotelist":
                    console.log("emotelist");//give the bot 40 emotes (10 lines, 4 emotes per line) per message
                    var message = [];
                    function checkForSplit(){
                        utilities.splitArray(emoteList, 32, message);
                        for(i in message){
                            compileEmotes(message[i]);
                        }
                    }
                    function compileEmotes(list){
                        for(i = 4; i < list.length; i += 5){
                            list.splice(i, 0, "\n");
                        }
                        return msg.channel.send(list.join(""));
                    }
                    if(!args[1]){ //defaults to current guild
                        var emoteList = msg.guild.emojis.map(emoji => "[``" + emoji.name + "`` | " + emoji + "]  ");
                        checkForSplit();
                    }
                    else{
                        args.shift();
                        var server = client.guilds.find(g => g.name === args.join(" "));
                        var emoteList = server.emojis.map(emoji => "[``" + emoji.name + "`` | " + emoji + "]  ");
                        checkForSplit();
                    }
                break;
                case "say": //to-do
                    console.log("say [" + msg.guild.name + "] [" + msg.author.username + "]");
                    msg.channel.bulkDelete(1);
                    if(args[1] == null) return msg.channel.send("Please state the message to be sent.");
                    if(args[1] === "help" && args[2] == null) return msg.channel.send("Makes the bot send a message. Add .e. before an emote name to send an emote.");
                    var sayMsg = args.slice(1); //slice is the substring function for arrays
                    var sayArg = [];
                    for (var i = 0; i < args.length; i++){
                        if (args[i].includes(".e.")){
                            var sayEmote = client.emojis.find(emoji => emoji.name === args[i].substring(3));
                            if(sayEmote == null) return msg.channel.send("The emote '" + args[i].substring(3) +  "' is not found. Please check for capitalization.")
                            sayArg.push((i - 1).toString() + ";" + `${sayEmote}`);
                        }
                    }
                    for (var i = 0; i < sayArg.length; i++){
                        sayMsg.splice(sayArg[i].split(";")[0], 1, sayArg[i].split(";")[1]); //pls understand this splice function ty
                    }   
                    msg.channel.send(sayMsg.join(" ")); //joins the array items separated by spaces.
                    console.log(sayMsg.join(" "));
                break; 

                case "schedule": //|schedule cs,payday,headsnatchers 1:22-4,5-7:59 (make a schedule based off this)
                //implement an alloted system (give an activity a minimum of time)
                    console.log("schedule");
                    if(!args[1]) return msg.channel.send("Please provide the activity and timestamps");
                    var activities = utilities.shuffleArray(args[1].split(","));
                    var timestamps = args[2].split(",");
                    var assignments = [];
                    var difference = [];
                    var time = [];
                    var minutes = 0;
                    var tempvar;
                    var tempvar2;

                    //distribute
                    for (i = 0; i < timestamps.length; i++){
                        minutes = (timestamps[i].split("-")[1].split(":")[0] - timestamps[i].split("-")[0].split(":")[0]) * 60;
                        if(timestamps[i].split("-")[0].split(":")[1])
                            minutes -= parseInt(timestamps[i].split("-")[0].split(":")[1]);
                        if(timestamps[i].split("-")[1].split(":")[1])
                            minutes += parseInt(timestamps[i].split("-")[1].split(":")[1]);
                        for (x = 0; x < (activities.length); x++){ //can simplify this a lot more, i bet
                            if(x < activities.length - 1){
                                difference[x] = utilities.getRandomInteger(1, minutes); //push a value between 1 and sum, then subract, then push again, and subtract. set the last array value to the remaining sum.
                                minutes -= difference[x]; //for example: 3 activities: minutes = 180. gRI = 35, set difference[0] to 35. minutes = 145. gRI = 65. set difference[1] = 65. break out of for loop, set difference[2] = 80.
                            }
                            if(x == activities.length - 1){
                                difference[x] = minutes;
                            }
                            //convert minutes to time
                            if(x == 0){
                                if(timestamps[i].split("-")[0].split(":")[1]){
                                    time[x] = parseInt(timestamps[i].split("-")[0]) + ":" + (parseInt(timestamps[i].split("-")[0].split(":")[1]) + difference[x]);
                                }
                                else {
                                    time[x] = timestamps[i].split("-")[0] + ":" + difference[x];
                                }
                            }
                            else{
                                tempvar2 = (parseInt(time[x - 1].split(":")[1]) + difference[x]);
                                time[x] = time[x - 1].split(":")[0] + ":" + tempvar2;
                            }
                            if(time[x].split(":")[1] >= 60){ //3:59 + 1 = 4:00
                                tempvar = time[x].split(":");
                                tempvar[0] = parseInt(time[x].split(":")[0]) + parseInt(time[x].split(":")[1] / 60);
                                tempvar[1] = time[x].split(":")[1] % 60;
                                time[x] = tempvar.join(":");
                            }
                            if(time[x].split(":")[0] > 12){ //12:00 + 1 = 1:00
                                tempvar = time[x].split(":");
                                tempvar[0] = time[x].split(":")[0] % 12;
                                time[x] = tempvar.join(":");
                            }
                            if(time[x].split(":")[1] < 10){ //4:50 + 11 = 5:01
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
                    if(!args[1]) return msg.channel.send("Please state a valid antecedent");
                    if(!args[2]) return msg.channel.send("Please state a valid consequent");
                    var antec = parseInt(args[1]);
                    var conseq = parseInt(args[2]);
                    var decider = utilities.getRandomInteger(0, (antec + conseq));
                    
                    if(decider <= antec) msg.channel.send("Yes");
                    else msg.channel.send("No");
                    console.log(decider);
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
        else{ //messages from dms
            //client.channels.get(channelID).send(msg.toString());
        }
    }
});

/*
//initialization functions
function initialize(){
    iMusic();
}
function iMusic(){
    currentSong = "";
    playCooldown = true;
    repeat = false;

    
            //music
            
            case "play": //learn whatever goes on in here lmao
                //BUG: when you skip, the player sometimes freezes and the play function is not called. comtinue calling skip and the queue will not skip the next song.
                if(playCooldown){
                    if(!args[1]) return msg.reply("Please provide a link to the music.");
                    if(!msg.member.voiceChannel) return msg.reply("You must be in a voice channel.");
                    if(!servers[msg.guild.id]) servers[msg.guild.id] = {queue:[]}
                    playCooldown = !playCooldown; //sets to false so user cannot add a song till the promise is returned
                    var server = servers[msg.guild.id];
                    function play(connection, msg){
                        console.log("play");
                        var prevMsg = msg;
                        server.dispatcher = connection.playStream(ytdl(server.queue[0].url, {filter: "audioonly"}));
                        currentSong = [server.queue[0].songTitle, args[1]];
                        msg.channel.send("Playing [" + server.queue[0].songTitle + "]");
                        if(!repeat)
                            server.queue.shift();
                        server.dispatcher.on("end", function(){
                            if (server.queue[0]){
                                play(connection, msg);
                            }
                            else {
                                connection.disconnect();
                            }
                        })
                    }
                    var server = servers[msg.guild.id];
                    ytdl.getInfo(link, async (err, info) => {
                        if(err) console.log(err);
                        if(ytdl.validateURL(link)){
                            server.queue.push({
                                songTitle: info.title,
                                url: link,
                                requester: msg.author.tag,
                                announceChannel: msg.channel.id
                            });
                            if(server.dispatcher){
                                msg.channel.send("Added [" + server.queue[server.queue.length - 1].songTitle + "] to the queue.");
                            }
                        }
                        else {
                            return msg.channel.send("Please input a valid URL.");
                        }
                        if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection){ //learn how this works
                            play(connection, msg);
                        })
                        playCooldown = !playCooldown; //sets to true so user can call command
                    });
                }
                else
                    msg.reply("You must wait a bit before adding another song.");
            break;
            case "skip":
                if(playCooldown){
                    playCooldown = !playCooldown;
                    var server = servers[msg.guild.id];
                    msg.channel.send("Skipped [" + currentSong[0] + "]");
                    if(server.dispatcher) server.dispatcher.end(); //figure out what server.dispatcher does
                    playCooldown = !playCooldown;
                }
                else
                    msg.reply("You must wait a bit before skipping another song.");
            break;
            case "stop":
                var server = servers[msg.guild.id];
                console.log("stop");
                if(msg.guild.voiceConnection){
                    for (var i = server.queue.length - 1; i <= 0; i--){
                        server.queue.splice(i, 1);
                    }
                    server.dispatcher.end();
                    msg.channel.send("Music stopped.");
                }
                if(msg.guild.connection){
                    console.log("dc");
                    msg.guild.voiceConnection.disconnect();
                } 
            break;
            case "join":
                if(!msg.guild.voiceConnection){ //checks if the bot is already in a voice channel
                    if(msg.member.voiceChannel){ //checks if the member is in a voice channel
                        msg.member.voiceChannel.join();
                        msg.channel.send("Joining voice channel.");
                    }
                    else {
                        msg.channel.send("You are not in a voice channel.");
                    }
                }
                else {
                    return msg.channel.send("Bot is already in a voice channel.");
                }
            break;
            case "leave":
                if(msg.guild.voiceConnection){
                    msg.guild.voiceConnection.disconnect();
                    msg.channel.send("Leaving voice channel.");
                }
                else {
                    return msg.channel.send("Bot is not in a voice channel.");
                }
            break;
            case "queue":
                var server = servers[msg.guild.id];
                if(server.queue[0]){
                    var queueMsg = "1: [" + currentSong[0] + "]\nLink: " + currentSong[1];
                    for (i = 0; i < server.queue.length; i++){
                        queueMsg += "\n" + (i + 2) + ": [" + server.queue[i].songTitle;
                    }
                    msg.channel.send(queueMsg);
                }
                else msg.channel.send("There are no songs in the queue.");
            break;
            

}
function iVariables(){
    //cooldowns
    //let cooldown = new Set(); //command cooldown -- COOLDOWNS
    //let cdTime = 2; //time in seconds
}
*/

