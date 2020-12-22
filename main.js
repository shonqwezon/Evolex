const Discord = require('discord.js');
const fs = require('fs');

const config = require('./config.json');
const commands = require('./commands.js');


const bot = new Discord.Client();
const token = config.token;
const prefix = config.prefix;

bot.on('ready', () => { 
    console.log(`Bot ${bot.user.username} is started`);
    bot.generateInvite(['ADMINISTRATOR']).then((link) => { console.log(link); });    
});

bot.on('message', (msg) => { 
    if (msg.author.username != bot.user.username && msg.author.discriminator != bot.user.discriminator && msg.content[0] == prefix) {
        let mes = msg.content.substr(1);
        if(mes.indexOf(' ') > -1) mes = mes.substr(0, mes.indexOf(' '));
        let comm = commands.list[mes];
        console.log(mes);

        let args = msg.content.substr(2 + mes.length);
        console.log("Args is " + args + " " + args.length);
        if(args.length == 0) args = null;

        if(comm != null) { if(comm.out(bot, msg, args)) msg.delete(); }
        else msg.channel.send("Данной команды не существует!");
            
    }
  });

  bot.on('guildMemberAdd', (member) => {
      console.log(member + "connected");
      fs.access("present.txt", (err) => {
        if(!err) {
            fs.readFile("present.txt", (err, data) => {
                if(err) console.log(err);
                if(data.toString().length != 0) member.send(data.toString());
              });
        }
    });
  });

bot.login(token);



