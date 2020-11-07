module.exports = {
    name: 'start',
    description: 'start',
    async execute(msg, session, sessionGet, embedchannel, game, createEmbed) {
        let date = new Date();
        const props = sessionGet.data();
        if(sessionGet.exists) {
            let hours = parseInt(Math.abs((date - new Date(props.date)) / (1000 * 60 * 60) % 24));
            console.log(hours);
            if (hours < 11) {
                return msg.react("❌");
            }
            await msg.guild.channels.cache.get(embedchannel).messages.fetch(props.embedid).then(async (message) => {
                session.delete();
                message.delete();
                msg.react("✅");
            }).catch((error) => {
                msg.react("❌");
                console.log(error);
            })
        }

        await session.set({
            users: [],
            code: null,
            region: null,
            time: null,
            embedid: null,
            date: date.toString()
        });
        createEmbed(msg, game);
    
        msg.react("✅");
    },
};