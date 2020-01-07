//import discord
const Discord = require("discord.js");
const client = new Discord.Client();
//import youtube download module
const ytdl = require("ytdl-core");

global.servers = {}; //object list to store URLs and prevents overlapping music from multiple servers

client.on("ready", () => {
    console.log("bot is ready");
    prefix = "|";
});

client.on("message", (msg) => {
    
    //args[1] returns the second word of the message; this function splits the message into individual words and places them into an array.
    let args = msg.content.substring(prefix.length).split(" "); //.split(" ") turns args into an array.

    initialize();
    
    switch (args[0]){ //learn the switch statement. Note: If you set the argument to a string and case the string, it'll spam the function 5 times.
    
        //replies
        case "ping":
            const OMEGALUL = client.emojis.find(emoji => emoji.name === "OmegaLUL");
            msg.channel.send(`p${OMEGALUL}g`) //back tick (`) is the tilda key -- it encloses a Template Literal. Unlike "" and '' it can contain placeholders.
        break;
        case "owo":
            msg.channel.send("uwu");
        break;
        case "uwu":
            msg.channel.send("owo");
        break;
        case "clear":
            if(!args[1]) return msg.channel.send("Please state the number of messages to clear.");
            let messageCount = parseInt(args[1]) || 1;
            msg.channel.bulkDelete(messageCount);
            msg.channel.send("deleted " + messageCount + " messages");
        break;

        //emotes
        case "emotelist":
            const EMOTELIST =  msg.guild.emojis.map(e => e.toString()).join(" ");
            msg.channel.send(EMOTELIST);
        break;
        case "emote":
            var emote = client.emojis.find(emoji => emoji.name === args[1]);
            if(args[1] == null) return msg.channel.send("The emote '" + args[1] +  "' is not found. Please check for capitalization.")
            msg.channel.send(`${emote}`);
        break;
        case "say":
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
                sayMsg.splice(sayArg[i].split(";")[0], 1, sayArg[i].split(";")[1]);
            }   
            msg.channel.send(sayMsg.join(" ")); //joins the array items separated by spaces.
        break;  

        //music
        case "play": //learn whatever goes on in here lmao
            function play(connection, msg){
                var server = servers[msg.guild.id];
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
                msg.channel.send("playing " + server.queue[0]);
                server.queue.shift(); 
                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, msg);
                    }
                })
            }
            if(!args[1]) return msg.reply("Please provide a link to the music.");
            if(!msg.member.voiceChannel) return msg.reply("You must be in a voice channel.");
            if(!servers[msg.guild.id]) servers[msg.guild.id] = {queue:[]}
            var server = servers[msg.guild.id];
            if(ytdl.validateURL(args[1])){
                server.queue.push(args[1]);
            }
            else {
                return msg.channel.send("Please input a valid URL");
            }
            if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection){ //learn how this works
                play(connection, msg);
            })
        break;
        case "skip":
            var server = servers[msg.guild.id];
            msg.channel.send("Song skipped.");
            if(server.dispatcher) server.dispatcher.end(); //figure out what server.dispatcher does
        break;
        case "stop":
            var server = servers[msg.guild.id];
            if(msg.guild.voiceConnection){
                for (var i = server.queue.length - 1; i <= 0; i--){
                    server.queue.splice(i, 1);
                }
                server.dispatcher.end();
                msg.channel.send("Music stopped.");
            }
            if(msg.guild.connection) msg.guild.voiceConnection.disconnect();
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
                var queueMsg = "";
                for (i = 0; i < server.queue.length; i++){
                    queueMsg +="\n" + (i + 1) + ": " + server.queue[i];
                }
                msg.channel.send(queueMsg);
                msg.channel.bulkDelete(1);
            }
            else {
                msg.channel.send("There are no songs in the queue.");
            }
        break;
    }

    //initialization functions
    function initialize(){
        
    }
});

client.login("NjYyNzgwMDc4MzM3NDI1NDgx.XhEMoQ.WHnPj1FsXJoxwJaI9FzirCv3RWA")
