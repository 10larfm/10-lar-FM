const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "kapat",
    category: "Muzik",
    aliases: ["çık"],
    description: "Mevcut müziği durdurur ve bot kanalı terk eder",
    usage: "kapat",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Bir ses kanalına katılmanız gerekiyor.", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
        );
      const player = client.manager.players.get(message.guild.id);
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Hiçbir şey oynamıyor", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
        );
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Bu komutu kullanmak için benim ses kanalımda olmanız gerekiyor!", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
          .setDescription(`Kanal ismi: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      if (!player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Bu sunucuda şu anda çalınan şarkı yok.", "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
        );
      player.destroy();
      return message.channel.send(new MessageEmbed()
        .setAuthor("Durduruldu ve Kanalınızdan ayrıldı", "https://cdn.discordapp.com/emojis/796354949755437086.png?v=1")
        .setColor(ee.color)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor(`Bir hata oluştu`, "https://cdn.discordapp.com/emojis/796283006280663060.png?v=1")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
};
