module.exports = {
    name: "addlink",
    description: "addlink <link> | add a link to the game embed",
    execute(msg, admin, session, sessionGet, gameList, embedChannel, game, args, createEmbed, editEmbed) {
        if (!args[0]) return msg.react("❌");
        if(!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(args[0]))
            return msg.channel.send("That is not a valid url");
        

    },
}