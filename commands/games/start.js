module.exports = {
    name: 'start',
    description: 'start | start a session',
    async execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, createEmbed, editEmbed) {
        let date = new Date();
        const props = await sessionGet.data();
        if(props) {
            let hours = parseInt(Math.abs((date - new Date(props.date)) / (1000 * 60 * 60) % 24));
            console.log(hours);
            if (hours < 11) {
                return msg.react("❌");
            }
            await msg.guild.channels.cache.get(embedChannel).messages.fetch(props.embedid).then(async (message) => {
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
        createEmbed(msg, game, embedChannel);
    
        msg.react("✅");
    },
};