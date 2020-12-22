const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const commands = require('./commands.js');

let prefix = config.prefix;

module.exports.help = function (bot, mess, args) {
  if(args != null) {
    let comm = commands.list[args];
    if(comm != null) mess.channel.send(comm.about);
    else mess.channel.send("`Данной команды не существует!`");
  }
  else {
    let answer = "";
    for(arg in commands.list) {
      let comm = commands.list[arg];
      answer += `Команда **${prefix}${arg}** - ${comm.about}\n`;
    }
    mess.channel.send(answer);
  }
  return false;
}

module.exports.setpresent = function (bot, mess, args) { 
  if(mess.member.hasPermission('ADMINISTRATOR')) {
    if(args != null) {
      fs.writeFile("present.txt", args, (err) => {
        if(err) mess.author.send("`Error, try again or call QISHON`");
        else mess.author.send("```\nВы успешно установили текст!\nВаш текст:\n"+args+"\n```");
      });  
    }
    else mess.author.send("`Вы не указали текст!`");
    return true;
  }
  else {
    mess.reply("`У вас нет прав!`");
    return false;
  }
} 

module.exports.play = function (bot, mess, args) {
  if(args != null) {
    if (mess.member.voice.channel) {
      mess.member.voice.channel.join();
      
    }
    else mess.channel.send("`Присоединитесь к голосовому каналу!`");
  }

  else mess.channel.send("`Вы не указали ссылку на music!`");
  return false;
}