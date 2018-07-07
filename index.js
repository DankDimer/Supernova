const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs")
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let black = botconfig.black;
let cooldown = new Set();
let cdseconds = 5;
const colors = require("./colors.json");
const bot = new Discord.Client({disableEveryone: true});
let coins = require("./coins.json")
let xp = require("./xp.json")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

bot.on("channelCreate", async channel => {

    console.log(`${channel.name} has been created`)

    let sChannel = channel.guild.channels.find(`name`, "events")
    sChannel.send(`${channel} has been created`)

})

bot.on("guildMemberRemove", async member =>{
    console.log(`${member.id} left the server!`)

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
    let lrandom = Math.floor(Math.random()* 5) + 1;
    //creating random leave message with if else statement
    if(lrandom === 1){
        welcomechannel.send(`Sad to see you leave ${member}.`)
    }else if (lrandom === 2){
        welcomechannel.send(`Coast is clear everyone, ${member} has left the server.`)
    }else if(lrandom === 3){
        welcomechannel.send(`GOOD RIDDANCE. ${member} has left the server.`)
    }else if(lrandom === 4){
        welcomechannel.send(`Why have you left us ${member}, please come back!`)
    }else{
        welcomechannel.send(`Get your pitchforks, ${member} has abandon us!`)
    };
})

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} Joined The Server!`)


    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");    
let jrandom = Math.floor(Math.random()* 5) + 1;
//creating a custom and random join message
if(jrandom === 1){
    welcomechannel.send(`Looks like ***${member}*** has joined the server!`)
}else if(jrandom === 2){
    welcomechannel.send(`OH NO. Looks like ***${member}*** has joined the server!`)
}else if(jrandom === 3){
    welcomechannel.send(`No need to fear, for ***${member}*** is here!`)
}else if(jrandom === 4){
    welcomechannel.send(`Everyone hide! ***${member}*** is here!!`)
}else if(jrandom === 5){
    welcomechannel.send(`${member} HAS ARRIVED TO THE PARTY!`)
}else if(jrandom === 6){
    welcomechannel.send(`HIDE UR MEMES. ***${member}*** has joined thet server`)
}

});

bot.on("ready", async () => {
 console.log(`${bot.user.username} is online! `);
 bot.user.setActivity(" with Complex Code! | !help ")
}); 


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8"))

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] ={
            prefixes: botconfig.prefix
        };
    }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("#000000")
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});
});
client.login(process.env.BOT_TOKEN)
