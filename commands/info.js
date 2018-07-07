const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client({disableEveryone: true});

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;

    let icembed = new Discord.RichEmbed()
    .setTitle("Server Info")
    .setColor("RANDOM")
    .addField("Info", "A PM with more info has been sent to you.")
    
    let infoembed = new Discord.RichEmbed()
    .setTitle("***Server Info***")
    .setColor(colors.green)
    .addField("***About***", "This is a server run by DankDimer#2285")
    .addField("***Reports***", "Reports are only seen by people that have authorization to go into the staff chat> Your report will be taken seriously if it is a serious report. If there is anything that you would like to talk about in private, please DM the staff.")
    .addField("***Kicks and Bans***", "If you have been banned on our server, then you have most likely broken one of our rules. If you feel the punishment was false, please DM DankDimer#2285 with proof to appeal. Same goes with mutes")
    .setFooter("Supernova Bot")

    message.channel.send(icembed);
    message.author.send(infoembed);
    return;

    }
    module.exports.help = {
        name: "info"
      }
