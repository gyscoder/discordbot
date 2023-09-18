const Discord = require("discord.js");
const cliente = new Discord.Client();
const configuracao = require("./config.json");
cliente.on("ready", () => {
    console.log(`bot foi iniciado com ${cliente.users.cache.size} usuários, em ${cliente.channels.cache.size} canais, em ${cliente.guilds.cache.size} servidores.`);
    cliente.user.setActivity(`eae mané, bagulho é doido memo`, {
        type: 'PLAYING'
    });
});
cliente.on("guildCreate", guild => {
    console.log(`o bot entrou no servidor ${guild.name} (id: ${guild.id}. População: ${guild.memberCount}) `);
    cliente.user.setActivity(`Estou em ${cliente.guilds.cache.size} servidores`);
});
cliente.on("guildDelete", guild => {
    console.log(`o bot foi removido do servidor: ${guild.name} (id: ${guild.id}. População: ${guild.memberCount}) `);
    cliente.user.setActivity(`Estou em ${cliente.guilds.cache.size} servidores`);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cliente.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    const argumentos = message.content.slice(configuracao.prefixo.length).trim().split(/ +/g);
    const comando = argumentos.shift().toLowerCase();
    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! a latência do bot é ${m.createdTimestamp - message.createdTimestamp}ms. A latência da API é ${Math.round(cliente.ws.ping)}ms`);
    }
    if (comando === "bnoite") {
        const m = await message.channel.send("@everyone Boa noite ");
    }
	
	const serverQueue = queue.get(message.guild.id);

	if (comando === "play") {
		execute(message, serverQueue);
		return;
	} else if (comando === "skip") {
		skip(message, serverQueue);
		return;
	} else if (comando === "stop") {
		stop(message, serverQueue);
		return;
	} else {
		message.channel.send("You need to enter a valid command!");
	}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cliente.login(configuracao.token); //loga o bot