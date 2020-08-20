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
    auInfo = {
        code: null,
        queue: []
    };
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
            switch (args[0]){ //Note: If you set the argument to a string and case the string, it'll spam the function 5 times.
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
                    if(!args[1]) return msg.channel.send("Please state the number of messages to clear.");
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
                                    "\n react <emote name> <message id>"
                    );
                break;
                case "au.help":
                    console.log("au.help");
                    msg.channel.send("Prefix: | " + 
                                    "\nCommands: " +
                                    "\n au.code " +
                                    "\n au.setcode " +
                                    "\n (Coming soon vv) " +
                                    "\n au.joinqueue " +
                                    "\n au.clearqueue "
                    );
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
                    if(args[1] == null) return msg.channel.send("The emote '" + args[1] + "' is not found. Please check for capitalization.");
                    msg.delete();
                    if(args[2] == "-") msg.channel.send(`${emote}`);
                    else msg.channel.send("[" + msg.author.username + "] " + `${emote}`);
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
                        var emoteList = msg.guild.emojis.cache.map(emoji => "[``" + emoji.name + "`` | " + `${emoji}` + "]  ");
                        checkForSplit();
                    }
                    else{
                        args.shift();
                        var server = client.guilds.cache.find(g => g.name === args.join(" "));
                        var emoteList = server.emojis.cache.map(emoji => "[``" + emoji.name + "`` | " + `${emoji}` + "]  ");
                        checkForSplit();
                    }
                break;
                case "say": //can probably simplify the things more. -- to make anonymous
                    console.log("say [" + msg.author.username + "] [" + msg.guild.name + "]");
                    msg.delete();
                    if(args[1] == null) return msg.channel.send("Please state the message to be sent.");
                    if(args[1] === "help" && args[2] == null) return msg.channel.send("Makes the bot send a message. Add .e. before an emote name to send an emote.");
                    //checks for anonymity
                    if(args[args.length - 1] == "-" && args[args.length - 1] == "-"){
                        args.splice(0, 2);
                        args.pop();
                    }
                    else{
                        args[0] = "[" + msg.author.username + "]";
                    }
                    //checks for emotes
                    for(var i in args){
                        if(args[i].includes(".e.")){
                            var sayEmote = client.emojis.cache.find(emoji => emoji.name === args[i].substring(3));
                            if(sayEmote == null) return msg.channel.send("The emote '" + args[i].substring(3) +  "' is not found. Please check for capitalization.");
                            args[i] = `${sayEmote}`;
                        }
                    }
                    msg.channel.send(args.join(" "));
                    console.log(args.join(" "));
                break; 
                case "react": //give the user a way to specify the message it wants to react to. defaulted to the one above.
                    console.log("react [" + msg.author.username + "] [" + msg.guild.name + "] [emote: " + args[1] + "] [msg id:" + args[2] + "]");
                    if(!args[1]) return msg.channel.send("react <emote name> <message id>");
                    console.log(msg.channel.lastMessageID);
                    var emote = client.emojis.cache.find(e => e.name == args[1]);
                    if(!emote) return msg.channel.send("That emote does not exist");
                    if(!args[2]) return msg.channel.send("Please provide the message ID");
                    msg.delete();
                    msg.guild.messages.fetch({around: args[2], limit: 1}).then(message => {
                        var reactMessage = message.first();
                        reactMessage.react(emote);
                    });
                break;

                case "schedule": //|schedule cs,payday,headsnatchers 1:22-4,5-7:59 (make a schedule based off this)
                //implement an alloted system (give an activity a minimum of time)
                    console.log("schedule");
                    if(!args[1]) return msg.channel.send("schedule <activity>,<activity> <time>-<time>");
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

                case "au.joinqueue":

                break;

                case "au.clearqueue":

                break;

                case "au.code":
                    if(!auInfo.code) return msg.channel.send("There is no code");
                    return msg.channel.send(auInfo.code);
                break;

                case "au.setcode":
                    if(!args[1]) return msg.channel.send("Please provide the new code");
                    if(args[1].length != 4) return msg.channel.send("That is not a valid code");

                    auInfo.code = args[1].toUpperCase();
                    msg.channel.send("Code set to " + args[1].toUpperCase());
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

function authorize(authorpermissionID, permission){ //take in member's role ID and check if the role meets 'permission' requirements. if so, return true.
    //in switchcase: if(authorize(msg.author.role, staff)){return;} or {return msg.channel.send("you do not have sufficient authority")}
    //return true/false
    //should probably rename the parameters to their actual names once you figure them out.
}*/
