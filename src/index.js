const app = require('./app')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const request = require('request')
const chatPrefix = process.env.MESSAGE_PREFIX || '!!'
const discordToken = process.env.DISCORD_TOKEN
const port = process.env.PORT
const botAutoWake = process.env.BOT_AUTO_WAKE || false

client.once('ready', () => {
  console.log('Discord Client Ready!')

  if (botAutoWake) {
    var reqTimer = setTimeout(function wakeUp() {
      request(process.env.BOT_URL, function() {
        console.log("WAKE UP DYNO");
      });
      return reqTimer = setTimeout(wakeUp, 1200000);
    }, 1200000);
  }
});

client.login(discordToken)

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

/** MESSAGE */
client.on('message', message => {
  if (message.author.bot || !message.content.startsWith(chatPrefix)) return

  const commandBody = message.content.slice(chatPrefix.length)
  const args = commandBody.trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  console.log(`[ +++ commandBody] : ${commandBody}`)
  console.log(`[ +++ args] : ${args}`)
  console.log(`[ +++ commandName] : ${commandName}`)

  if (!client.commands.has(commandName)) return

  const command = client.commands.get(commandName)

  if (!command) return

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('Bro, chat ke gue cuman di server Hunt Indo aja ya, gak usah di PM. Jangan ada rahasia di antara kita');
  }

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply(`Terjadi kesalahan! perintah **${commandName}** tidak dapat diproses`)
    // message.reply(`Wadaw, perintah **${commandName}** tersebut gak bisa gue proses di PM!?\nJangan pake perintah **${commandName}** di PM yak :D`)
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
