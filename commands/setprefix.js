const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    //!setprefix <symbol>

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("🚫***You can not do that.***");
    if(!args[0] || args[0 == "helpme"]) return message.reply("Usage: !prefix <prefered prefix> *Only one is reccomended*");

    let prefixes = JSON.parse(fs.readFileSync("/../prefix.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("/../prefix.json", JSON.stringify(prefixes), (err) =>{
        if(err) console.log(err)
    })

    let prefixEmbed = new Discord.RichEmbed()
    .setColor(colors.green)
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

    message.channel.send(prefixEmbed);

}
module.exports.help = {
    name: "setprefix"
  }
