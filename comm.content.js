const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const commands = require('./commands.js');

const queue = new Map();

module.exports.help = function (bot, mess, args) {
  if(args != null) {
    let comm = commands.list[args];
    if(comm != null) mess.channel.send(comm.about);
    else mess.channel.send("Данной команды не существует!");
  }
  else {
    let answer = "";
    for(arg in commands.list) {
      let comm = commands.list[arg];
      answer += `Команда !${arg} - ${comm.about}\n`;
    }
    mess.channel.send(answer);
  }
  return false;
}

module.exports.setpresent = function (bot, mess, args) { 
  if(mess.member.hasPermission('ADMINISTRATOR')) {
    if(args != null) {
      fs.writeFile("present.txt", args, (err) => {
        if(err) mess.author.send("Error, try again or call QISHON");
        else mess.author.send("Вы успешно установили текст!\nВаш текст:\n"+args);
      });  
    }
    else mess.author.send("Вы не указали текст!");
    return true;
  }
  else {
    mess.reply("У вас нет прав!");
    return false;
  }
} 

/*
module.exports.play = function (bot, mess, args) {
	if (mess.member.voice.channel) {
    mess.member.voice.channel.join();
    bot.on('voiceStateUpdate', (oldState, newState) => {
      if(oldState.channel && !newState.channel) { //если пользователь вышел из канала
        console.log(mess.member);
      }
    }); 
  }
  else mess.channel.send("Присоединитесь к голосовому каналу!");
  return false;
}


  let oldVoice = oldState.channelID; 
  let newVoice = newState.channelID;
  if (oldVoice != newVoice) {
      if (oldVoice == null) {
          found++;
      }
      if (newVoice == null) {
          found--;
          if(found == 1) return channel.leave();
        }
   }
*/