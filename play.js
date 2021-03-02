const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const playermanager = require("../../handlers/playermanager");
module.exports = {
    name: "çal",
    category: "Muzik",
    aliases: ["ç"],
    description: "Youtube'dan bir şarkı çalar",
    usage: "çal <şarkı / URL>",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if (!channel)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setAuthor("Bir ses kanalına katılmanız gerekiyor.", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
          );
      if (!args[0])
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setAuthor("Bana bir URL veya Arama terimi vermeniz gerekiyor.", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
          );
      const player = client.manager.players.get(message.guild.id);
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Bu komutu kullanmak için benim ses kanalımda olmanız gerekiyor!", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
          .setDescription(`Kanal ismi: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      playermanager(client, message, args, "song:youtube");
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor("Bir hata oluştu", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
};
