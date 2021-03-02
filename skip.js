const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { autoplay } = require("../../handlers/functions");
module.exports = {
    name: "geç",
    category: "Musik",
    aliases: [],
    description: "Mevcut şarkıyı geçersiniz.",
    usage: "geç",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Bir ses kanalına katılmanız gerekiyor.", "//EMOJİ URL//")
        );
      const player = client.manager.players.get(message.guild.id);
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Hiçbir şey oynamıyor", "//EMOJİ URL//")
        );
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor("Bu komutu kullanmak için benim ses kanalımda olmanız gerekiyor!", "//EMOJİ URL//")
          .setDescription(`Kanal ismi: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      if (player.queue.size == 0) {
        if(player.get("otomatikoynatma")) return autoplay(client, player, "geç");
        player.destroy();
        return message.channel.send(new MessageEmbed()
          .setAuthor("Durduruldu ve Kanalınızdan ayrıldı", "//EMOJİ URL//")
          .setColor(ee.color)
        );
      }
      player.stop();
      return message.channel.send(new MessageEmbed()
        .setAuthor("Bir sonraki Şarkıya geçildi", "//EMOJİ URL//")
        .setColor(ee.color)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor(`Bir hata oluştu`, "//EMOJİ URL//")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
};
