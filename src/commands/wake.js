const request = require('request')

const wake = {
  name: 'wake',
  description: 'Wake the bot',
  cooldown: 5,
  execute(message, args) {
    var wakeUp = request(process.env.BOT_URL, function() {
      message.reply(`Waking up the server...`)
      console.log("WAKE UP DYNO")
    });

    return wakeUp
  }
}

module.exports = wake
