module.exports = {
    name: "sauce",
    synopsis: "",
    description: "sauce <n>| google image search last <n> image attachments in channel and return the results",
    options: "",
    execute(msg, admin, cmd, args, Discord) {
        msg.channel.messages.fetch({limit: 20})
        .then(messages => {
            messages.forEach(message => {
                console.log(message.content);
            });
            console.log(`recieved ${messages.size} messages`);
        })
    },
}