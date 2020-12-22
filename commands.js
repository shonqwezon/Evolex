const comm = require('./comm.content');

module.exports.list = {
  "help": {
    out: comm.help,
    about: "Список команд"
  },
  "set": {
    out: comm.setpresent,
    about: "Установка сообщения приветствия нового пользователя"
  }
}