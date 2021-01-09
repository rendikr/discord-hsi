const ping = {
  name: 'ping',
  description: 'Ping the bot',
  cooldown: 5,
  execute(message, args) {
    message.reply(`Pong! Server ini memakai regional ${message.guild.region}.`)
  }
}

module.exports = ping
