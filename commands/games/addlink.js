module.exports = {
    name: "addlink",
    synopsis: "",
    description: "addlink <link> | add a link to the game embed [wip]",
    options: "",
    execute(msg, session, sessionGet, gameList, embedChannel, game, args, client, admin, Discord) {
        if (!args[0]) return msg.react("❌");
        if(!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(args[0]))
            return msg.channel.send("That is not a valid url");
    },
}