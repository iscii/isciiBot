const functions = require("../../functions.js");

module.exports = {
    name: "sauce",
    synopsis: "",
    description: "sauce <messages>| google image search image attachments in last <messages> (default 10) user-sent messages in channel and return the results",
    options: "",
    async execute(msg, admin, cmd, args, Discord) {
        const search = require("another-node-reverse-image-search");
        //const search = require("../../modules/another-node-reverse-image-search"); //for testing purposes
        
        const messagecount = args[0] ? args[0] : 10;
        var i = j = 0; //i = image count, j = progressive page count
        let pages = [];
        //runtest function to wake up the search engine thing. First search never seems to work.
        const test = (results, url) => {};
        const sendResults = (results, url) => {
            j++;
            var em = new Discord.MessageEmbed()
                .setTitle("Sauce")
                .setURL(url)
                .setThumbnail(url)
                .setFooter(`Page ${j}`)
                .setTimestamp()
            
            if(results[0]){
                results.forEach(result => {
                    //length criteria cos sometimes it pulls the raw html instead, prolly to do with some backend load times.
                    em.addField(`${result.title}`,`[${result.res.length < 40 ? result.res : "No Res Found"}](${result.url})\n${result.desc.length < 180 ? result.desc : "No Desc Found"}`);
                })
            }
            else{
                em.setDescription(`Could not find links for ${url}`)
            }
            pages.push(em);
            if(j == i){
                functions.displayMenu(msg, pages, 0, false);
                msg.react("✅");
            }
        }
        //for each message, if it's an image, search and add results to an embed. format the embed and send the message, separately or together.
        search("https://cdn.discordapp.com/attachments/825057174178627614/876616833933926420/91928398_p0_master1200.png", test); //run search once first to prevent buggy first-runs
        await msg.channel.messages.fetch({limit: messagecount})
        .then(messages => {
            console.log(`recieved ${messages.size} messages`);
            messages.filter(message => message.attachments.size > 0).forEach(message => {
                let links = message.attachments.map(attachment => attachment.proxyURL);
                links.forEach(link => {i++;}); //counts expected number of results so we know when to display embeds. async await isn't working here.
                links.forEach(link => {
                    console.log(`search ${link}`);
                    search(link, sendResults);
                });
            })
        });
        if(i == 0)
            msg.react("❌");
        else
            msg.channel.send(`Found ${i} images. Searching Google...`);
    },
}