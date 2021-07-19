const Discord = require('discord.js')
const fetch = require('node-fetch')

const { botColor, warframeLanguage } = require('../../config.json')

module.exports = {
  name: 'warframe',
  category: 'api',
  description: 'Получить данные из Warframe',

  run: async (client, message, args) => {
    let response = await (await fetch(`https://api.warframestat.us/pc/${warframeLanguage}`)).json()
    
    const Embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle(`Warframe`)
      .setDescription(response.news[0].message)            
      .addFields(
        { name: 'Скидка', value: `${response.dailyDeals[0].item}: ~~${response.dailyDeals[0].originalPrice}~~ - ${response.dailyDeals[0].salePrice}. До ${response.dailyDeals[0].endString}` }
      )
      .setTimestamp()
    
    if (response.voidTrader.active === false) {
      Embed.addFields(
        { name: 'Торговец', value: `Появится ${response.voidTrader.startString}, ${response.voidTrader.location}` }
      )
    } else {
      Embed.addFields(
        { name: 'Торговец', value: `Исчезнет ${response.voidTrader.endString}, ${response.voidTrader.location}` }
      )
    }          

    message.channel.send(Embed)
  }
}