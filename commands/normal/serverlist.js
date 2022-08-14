module.exports = {
    name: "serverlist",
    synopsis: "",
    description: "serverlist",
    options: "",
    async execute(msg, admin, cmd, args, Discord) {
        console.log(args);
        var serverList = client.guilds.cache.map(g => g.name);
        msg.channel.send(serverList);
    },
}