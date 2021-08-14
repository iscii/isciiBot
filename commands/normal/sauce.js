module.exports = {
    name: "sauce",
    synopsis: "",
    description: "sauce <n>| google image search last <n> image attachments in channel and return the results",
    options: "",
    execute(msg, admin, cmd, args, Discord) {
        const search = require("another-node-reverse-image-search");
        msg.channel.messages.fetch({limit: 20})
        .then(messages => {
            messages.forEach(message => {
                console.log(message.content);
            });
            console.log(`recieved ${messages.size} messages`);
        })
        //for each message, if it's an image, search and add results to an embed. format the embed and send the message, separately or together.
        /* search("https://cdn.discordapp.com/attachments/494223131683061763/868615421362839583/91403647_p0_master1200.png", doSomething);
        const doSomething = (results) => {

        } */
    },
}