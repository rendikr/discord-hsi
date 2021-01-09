const Discord = require('discord.js');

const spar = {
  name: 'spar',
  description: 'Spar / Scrim players with 3 players per team',
  cooldown: 5,
  execute(message, args) {
    let playerPerTeam = 3

    if (args.length == 0) {
      return message.reply(`Bro, kasih info tambahan ya. Contohnya gini:\n**!!spar <complete voice channel name> <player per team>**. Silahkan ulangi perintahnya :)`)
    }

    console.log(`[ +++ args.length] : ${args.length}`)
    // get the spar channel name
    let voiceChannelName = ''
    for (const index in args) {
      const arg = args[index]

      if (index == args.length - 1) {
        playerPerTeam = arg
        continue
      }

      if (index === 0) {
        voiceChannelName = arg
      } else {
        voiceChannelName = voiceChannelName + ' ' + arg
      }
    }

    voiceChannelName = voiceChannelName.trim()

    // get the spar channel
    let channels = message.guild.channels.cache
    const sparChannel = channels.find(c => {
      if (c.type == 'voice' && c.name.toLowerCase() == voiceChannelName.toLowerCase()) {
        return c
      }
    })

    if (sparChannel === undefined) {
      return message.reply(`Bro, voice channel name nya tidak ditemukan. Silahkan ulangi perintahnya :)`)
    } else {
      // message.channel.send(`Channel <${sparChannel.name}> ditemukan!`)
      message.channel.send(`Player per team: ${playerPerTeam}`)
      const sparChannelMembers = sparChannel.members
      const sparChannelMemberCount = sparChannelMembers.size

      // message.channel.send(`Sedang ada ${sparChannelMemberCount} anggota dalam Channel tersebut!`)

      if (sparChannelMemberCount <= playerPerTeam) {
        return message.reply(`\`Jumlah player dalam channel tidak mencukupi!\nPlayer dalam channel: ${sparChannelMemberCount}\nPlayer per team: ${playerPerTeam}\``)
      } else {
        message.channel.send(`**memulai proses pembagian team...**`)

        let memberList = []

        sparChannel.members.forEach(m => {
          memberList.push({'id' : m.id, 'name': m.displayName})
        })

        const shuffledMemberList = shuffle(memberList)

        setTimeout(() => {
          message.channel.send(`**pembagian team selesai...**`)
          message.channel.send(`berikut adalah team yang terbentuk:`)

          const totalTeamNum = Math.ceil(sparChannelMemberCount / playerPerTeam)

          for (let teamNum = 0; teamNum < totalTeamNum; teamNum ++) {
            const teamEmbed = new Discord.MessageEmbed()
              .setTitle(`TEAM ${teamNum + 1}`)
            // message.channel.send()
            const chunks = shuffledMemberList.splice(0, playerPerTeam)
            chunks.forEach(member => {
              teamEmbed.addFields(
                {
                  name: 'Member', value: `<@` + member.id + `>`
                }
              )
            })

            message.channel.send(teamEmbed)
          }

          setTimeout(() => {
            message.channel.send(`Good Luck and Have Fun!`)
          }, 2000)
        }, 5000)
      }
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  }
}

module.exports = spar
