const request = require('request')

const wake = {
  name: 'wake',
  description: 'Wake the bot',
  cooldown: 5,
  execute(message, args) {
    var wakeUp = request(process.env.BOT_URL, function() {
      message.channel.send(`Wake the duck up, ~~samurai~~ SparBot. We have an event to burn`)
      console.log("WAKE UP DYNO")
    });

    return wakeUp
  }
}

module.exports = wake
