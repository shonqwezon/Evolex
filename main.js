const Discord = require ('discord.js');
const bot = new Discord.Client();
const config = require('/config.json');
const token = config.token;
const prefix = config.prefix;

bot.on('ready', () => { 
    console.log(`Bot ${bot.user.username} is started`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { console.log(link); });
});

bot.on('message', msg => {
    if (msg.content === prefix + 'habr') {
        msg.reply('Max is пидарас');
    }
});

bot.login(token);