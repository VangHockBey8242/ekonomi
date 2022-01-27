const Discord = require('discord.js');
var ayarlar = require("../ayarlar.json")
const db = require('quick.db')
exports.run = function(client, message,  args) {
    const hesapdurumu = db.fetch(`hesapdurum_${message.author.id}`);
    const hesapismi = db.fetch(`hesapismi_${message.author.id}`);
    if(!hesapdurumu) {
    const embed = new Discord.MessageEmbed()
    .setAuthor("Airla", client.user.avatarURL())
    .setDescription(`Bir hesabınız bulunmamakta lütfen hesap açınız. s!hesap-oluştur hesapismi`)
    message.channel.send(embed)
    } else {

  let miktar = args[0]
  let para = db.fetch(`bakiye_${message.author.id}`)
  if(!miktar) return message.channel.send(new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      .setColor("GREEN")
      .setDescription(`**Slot-Machine** oynamak için miktar girmen gerekiyor!`))
 
    
if(miktar > para) return message.channel.send(new Discord.MessageEmbed()

                                              .setColor("RED")
                                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                                        .setDescription(`Slot-Machine oynamak için cüzdanında ${para ? "sadece " + para + ' 💸 var!' : 'hiç paran yok!'}`))
  
if(miktar < 100) return message.channel.send(new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      .setColor("GREEN")
      .setDescription(`**Slot-Machine** oynamak için en az 100 💸 yatırabilirsin!`))
  if(isNaN(miktar) || miktar < 0) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`🤔 Girdiğin miktar geçerli bir sayı değil !?`))
 let kazandin = miktar*3     
  let slots = ["🍓","🍎","🍍","🍌","🍒","🍇","🍍","🍇","🍇","🍍","🍎","🍎","🍎","🍓","🍓",];
  //

  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));
  //
  let ust1 = Math.floor((Math.random() * slots.length));
  let ust2 = Math.floor((Math.random() * slots.length));
  let ust3 = Math.floor((Math.random() * slots.length));
  //
  let alt1 = Math.floor((Math.random() * slots.length));
  let alt2 = Math.floor((Math.random() * slots.length));
  let alt3 = Math.floor((Math.random() * slots.length));
  

  if (slots[result1] === slots[result2] && slots[result2] === slots[result3] ) {
    let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
       .setTitle('__Slot Machine__')
 .setDescription(`**${kazandin} 💸 kazandın!** \n
${slots[ust1]} | ${slots[ust2]} | ${slots[ust3]} |
${slots[result1]} | ${slots[result2]} | ${slots[result3]} | :arrow_left:
${slots[alt1]} | ${slots[alt2]} | ${slots[alt3]} |`, true)
       .setColor("GREEN")
   message.channel.send(embed)
     db.bakiye(`para_${message.author.id}`, kazandin)

  } else {
    let embed2 = new Discord.MessageEmbed()
    .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
       .setTitle('__Slot Machine__')   
 .setDescription(`**${miktar} 💸 kaybettin!** \n
${slots[ust1]} | ${slots[ust2]} | ${slots[ust3]} |
${slots[result1]} | ${slots[result2]} | ${slots[result3]} | :arrow_left:
${slots[alt1]} | ${slots[alt2]} | ${slots[alt3]} |`, true)
       .setColor("RED")
   message.channel.send(embed2)
  db.add(`bakiye_${message.author.id}`, -miktar)
  }
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slot","slot-machine","slotmachine","s"],
  permLevel: 0
};

exports.help = {
  name: 'slots',
};