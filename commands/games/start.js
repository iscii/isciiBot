module.exports = {
    name: 'start',
    description: 'start',
    execute(message, args, abb, game) {
        let date = new Date();
        let props = gdata.data();
        if(gdata.exists) {
            let hours = parseInt(Math.abs((date - new Date(props.date)) / (1000 * 60 * 60) % 24));
            console.log(hours);
            if(hours < 11){
                return msg.react("❌");
            }
            await msg.guild.channels.cache.get(embedchannel).messages.fetch(props.embedid).then(async (message) => {
                message.delete();
                game.delete();
                msg.react("✅");
            }).catch((error) => {
                msg.react("❌");
                console.log(error);
            })
        }
    
        switch(abb){
            case "au": 
            case "d2": {
                await game.set({
                    users: [],
                    code: null,
                    region: null,
                    time: null,
                    embedid: null,
                    date: date.toString()
                });
                break;
            }
            case "mc": {
                await game.set({
                    users: [],
                    time: null,
                    embedid: null,
                    date: date.toString()
                });
                break;
            }
            case "osu": {
                await game.set({
                    users: [],
                    time: null,
                    password: null,
                    embedid: null,
                    date: date.toString()
                });
                break;
            }
        }
        createEmbed();
    
        msg.react("✅");
    },
};