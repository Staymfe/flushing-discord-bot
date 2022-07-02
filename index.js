// Des bails par défaut
var Discord = require("discord.js");
const { prefix } = require("./config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")
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
Client.on("messageCreate", (message, args) => {
    // Au cas ou...
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;

    // Anti Gros Mots
    for(var i in blacklisted) {
        if(message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())){ foundInText = true;}
    }

    if(foundInText) {
        message.delete()
    }

    // Commande Avec Le Prefixe la base quoi !
    if(message.content === prefix + "ping") {
        message.reply("T'a mere enft chuis pas ton chien.");
    } else if(message.content === prefix + "help") {
        const embed = new Discord.MessageEmbed()
            .setColor("#cda385")
            .setTitle("Liste des commandes !")
            .setURL("https://discord.gg/jDmzbjBFHj")
            .setAuthor("The Flushing's Bot", "https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024", "https://discord.gg/jDmzbjBFHj")
            .setDescription("Vous y trouverez la liste des commandes du bot ! Bot By !Stay#5541 ! N'oublie pas le préfix {")
            .setThumbnail("https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024")
            .addField("**__{help__**", "Affiche la liste de tout les commands")
            .addField("**__{ping__**", "A tes risques et périls")
            .setTimestamp()
            .setFooter("Ce bot appartient à !Stay#5541", "https://cdn.discordapp.com/avatars/931674220327501904/94d73611a0a756907539d324d3fac493.png?size=1024");
        message.channel.send({  embeds: [embed]});
    } else if(message.content === prefix + "flushingbotwelcomeguys") {
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
            .setCustomId("flushingbotwelcomeguys")
            .setLabel("Dire Bonjour !")
            .setStyle("DANGER")
            .setEmoji("💖"));

        message.channel.send({content: "Je suis le nouveau Bot du serve let's go !", components: [row]});
    }
});

Client.on("interactionCreate", interaction => {
    if(interaction.isButton()) {
        if(interaction.customId === "flushingbotwelcomeguys") {
            interaction.reply("Bonjour !")
        }
    } else if(interaction.isCommand()) {
        if(interaction.commandName === "ping") {
            interaction.reply("Pong t'a mere")
        }
    }
});

//Ptit Token Secret Mon Gars
Client.login(process.env.TOKEN);