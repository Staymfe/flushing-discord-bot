// Des bails par défaut
var Discord = require("discord.js");
const { prefix } = require("./config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")
const moment = require("moment")
var Client = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
]});

let blacklisted = ['fdp', 'ntm', 'connard', 'pute', 'putain', 'ta gueule', 'nique', 'salope', 'PD', 'batard', 'putin', 'enfoiré', 'connare', 'fils de pute', 'bâtard', 'bicot', 'conasse', 'couille molle', 'débile', 'ducon', 'dugland', 'enculé', 'fachiste', 'imbécile', 'lavette'];
let foundInText = false;

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("A tes risques et perils");

// Quand le bot se connecte je veux une réponse pour être sûr
Client.on("ready", () => {
    Client.guilds.cache.get("990020262483341353").commands.cache.delete();
    console.log("Bot opérationnel !");
});

// Quand l'utilisateur créer un message
Client.on("messageCreate", (message) => {
    // Au cas ou...
    if(message.author.bot) return;
    if(message.channel.type === "DM") return;
    if(message.author.bot) return;

    // La Base
    const args = message.content.slice(prefix.length).trim().split(' ');
	const commandvex = args.shift().toLowerCase();

    // Anti Gros Mots
    for(var i in blacklisted) {
        if(message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())){
            foundInText = true;
        }
    }

    if(foundInText) {
        message.delete()
        foundInText = false
    }

    // Commande Avec Le Prefixe la base quoi !
    if(message.content === prefix + "ping") {
        message.reply("Hey Mon Gars Bien ?");
    } else if(message.content === prefix + "help") {
        const embed = new Discord.MessageEmbed()
            .setColor("#cda385")
            .setTitle("Liste des commandes !")
            .setURL("https://discord.gg/jDmzbjBFHj")
            .setAuthor("The Flushing's Bot", "https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024", "https://discord.gg/jDmzbjBFHj")
            .setDescription("Vous y trouverez la liste des commandes du bot ! Bot By !Stay#5541 ! N'oublie pas le préfix {")
            .setThumbnail("https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024")
            .addField("**__{help__**", "Affiche la liste de tout les commands")
            .addField("**__{ping__**", "A tes risques et périls", true)
            .addField("**__{say__**", "Dit ce que tu lui demande")
            .addField("**__{serverinfo__**", "Info su serveur", true)
            .addField("**__{userinfo__**", "Info utilisateur")
            .addField("**__{ban__**", "Ban un membre", true)
            .addField("**__{kick__**", "Kick un membre")
            .addField("**__{prune__**", "Supprime entre 2 et 99 messages")
            .setTimestamp()
            .setFooter("Ce bot appartient à !Stay#5541", "https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024");
        message.reply({  embeds: [embed]});
    } else if(message.content.startsWith("{say")) {
        if(message.content != "{say") {
            let sentence = message.content.split(" ");
            sentence.shift();
            sentence = sentence.join(" ");
            message.delete()
            message.channel.send(sentence);
        } else {
            message.reply("Tu dois indiquer une phrase");
        }
    } else if(message.content === prefix + "embed") {
        if (message.member.roles.cache.has("990020262483341354")) {
            console.log("Un Admin veut faire un embed")
        } else{
            message.delete()
            message.channel.send("Tu ne fait pas parti du staff deso mec");
        }
    } else if(message.content === prefix + "serverinfo") {
        if(message.member.roles.cache.has("990020262483341354")) {
            message.channel.send(`Nom du serveur: ${message.guild.name}\nMembres Totals: ${message.guild.memberCount}`);
        } else{
            message.delete()
            message.channel.send("Tu ne fait pas parti du staff deso mec");
        }
    } else if(commandvex === "userinfo") {
        if(message.member.roles.cache.has("990020262483341354")) {
            const Target = message.mentions.users.first() || message.author;
            const Member = message.guild.members.cache.get(Target.id);

            const Response = new Discord.MessageEmbed()
                .setColor("#cda385")
                .setTitle("Info Utilisateurs !")
                .setURL("https://discord.gg/jDmzbjBFHj")
                .setAuthor(`${Target.username}`, Target.displayAvatarURL, "https://discord.gg/jDmzbjBFHj")
                .setDescription(`Voici les informations de : ${Target.username}`)
                .setThumbnail(Target.displayAvatarURL({dynamic: true}))
                .addField("**__UserId__**", `${Target.id}`, false)
                .addField("**__Roles__**", `${Member.roles.cache.map(r => r).join(" ").replace("@everyone", "")}`)
                .addField("**__Membre du serveur depuis__**", `${moment(Member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n ${moment(Member.joinedAt).startOf("day").fromNow()}`)
                .addField("**__Compte Création__**", `${moment(Target.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n ${moment(Target.createdAt).startOf("day").fromNow()}`)
                .setTimestamp()
                .setFooter("Ce bot appartient à !Stay#5541", "https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024");
                message.channel.send({embeds: [Response]})
        } else{
            message.delete()
            message.channel.send("Tu ne fait pas parti du staff deso mec");
        }
    } else if(commandvex === "kick") {
        if(message.member.roles.cache.has("990020262483341354")) {
            if(args.length) {
                const taggedUser = message.mentions.users.first();
                message.channel.send(`Tu veux kick: ${taggedUser.username}, ok comme tu veux !`);
                message.guild.members.cache.get(taggedUser).kick()
            } else{
                message.channel.send(`La tu kick degun mon gars`)
            }
        } else{
            message.delete()
            message.channel.send("Tu ne fait pas parti du staff deso mec");
        }
    } else if(commandvex === "ban") {
        if(message.member.roles.cache.has("990020262483341354")) {
            if(args.length) {
                const taggedUser = message.mentions.users.first();
                message.channel.send(`Tu veux ban: ${taggedUser.username}, ok comme tu veux !`);
                message.guild.members.cache.get(taggedUser).ban()
            } else{
                message.channel.send(`La tu ban degun mon gars`);
            }
        } else{
            message.delete()
            message.channel.send("Tu ne fait pas parti du staff deso mec");
        }
    } else if(commandvex === 'prune') {
        if(message.member.roles.cache.has("990020262483341354")) {
            const amount = parseInt(args[0]);

            if (isNaN(amount)) {
                return message.reply('Ce n\'es pas un nombre valide');
            } else if (amount < 2 || amount > 100) {
                return message.reply('Le chiffre doit etre entre 2 et 100');
            } else{
                message.channel.bulkDelete(amount, true);
            }
        }
	}
});

Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()) {
        if(interaction.commandName === "ping") {
            interaction.reply("Oe mon gars !")
        }
    }
});

//Ptit Token Secret Mon Gars
Client.login(process.env.TOKEN);