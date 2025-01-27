const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "genshin",
  aliases: ["name"],
  category: "api",
  description: "Get info about character / weapon / set of artifacts",

  run: async (client, message, args) => {
    let name = args.join(" ").split(" ").join("-").toLowerCase();

    let response = await (
      await fetch(`https://api.genshin.dev/characters/${name.toLowerCase()}`)
    ).json();

    if (response.name) {
      let rarity = "";

      for (let i = 0; i < response.rarity; i++) {
        rarity += process.env.STAR_EMOJI;
      }

      const Embed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR)
        .setTitle(response.name)
        .setDescription(response.description)
        .setThumbnail(`https://api.genshin.dev/characters/${name}/icon.png`)
        .addFields(
          {
            name: "Rarity",
            value: rarity,
            inline: true,
          },
          {
            name: "Nation",
            value: response.nation,
            inline: true,
          },
          {
            name: "Birthday",
            value: response.birthday.substr(response.birthday.length - 5),
            inline: true,
          },
          {
            name: "Constellation",
            value: response.constellation,
            inline: true,
          },
          {
            name: "Vision",
            value: response.vision,
            inline: true,
          },
          {
            name: "Weapon",
            value: response.weapon,
            inline: true,
          }
        );
      return message.channel.send(Embed);
    }

    response = await (
      await fetch(`https://api.genshin.dev/weapons/${name}`)
    ).json();

    if (response.name) {
      let rarity = "";

      for (let i = 0; i < response.rarity; i++) {
        rarity += process.env.STAR_EMOJI;
      }

      const Embed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR)
        .setTitle(response.name)
        .setDescription(response.passiveDesc)
        .setThumbnail(`https://api.genshin.dev/weapons/${name}/icon.png`)
        .addFields(
          {
            name: "Rarity",
            value: rarity,
            inline: true,
          },
          {
            name: "Name",
            value: response.passiveName,
            inline: true,
          },
          {
            name: "How to get",
            value: response.location,
            inline: true,
          },
          {
            name: "Type",
            value: response.type,
            inline: true,
          },
          {
            name: "Supporting stat",
            value: response.subStat,
            inline: true,
          },
          {
            name: "Base attack",
            value: response.baseAttack,
            inline: true,
          }
        );
      return message.channel.send(Embed);
    }

    response = await (
      await fetch(`https://api.genshin.dev/artifacts/${name}`)
    ).json();

    if (response.name) {
      let rarity = "";

      for (let i = 0; i < response.max_rarity; i++) {
        rarity += process.env.STAR_EMOJI;
      }

      const Embed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR)
        .setTitle(response.name)
        .setDescription(`Max rarity: ${rarity}`)
        .setThumbnail(
          `https://api.genshin.dev/artifacts/${name}/flower-of-life.png`
        )
        .addFields(
          {
            name: "2 piece bonus",
            value: response["2-piece_bonus"],
            inline: true,
          },
          {
            name: "4 piece bonus",
            value: response["4-piece_bonus"],
            inline: true,
          }
        );

      return message.channel.send(Embed);
    }

    message.channel.send("Error :no_entry_sign:");
  },
};
