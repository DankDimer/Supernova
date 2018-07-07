const Discord = require("discord.js");
const colors = require("./colors.json");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    
    .setDescription("**Recommend Servers**")
    .setColor(colors.red)
    .addField("```This command is still being developed.``")
    .addField("Want your server on here?", "If so than contact me (DankDimer#2285)")
    .addField("Created by", "DankDimer#2285");
   
    return message.author.send(serverembed);

    }
    module.exports.help = {
        name: "servers"
      }
