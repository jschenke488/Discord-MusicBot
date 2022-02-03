const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { InviteTargetType, RouteBases, Routes } = require('discord-api-types/v9');

const command = new SlashCommand()
  .setName("poker")
  .setDescription("Starts a Poker session")
  .setRun(async (client, interaction) => {
    if (!interaction.member.voice.channel) {
      const joinEmbed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription(
          "You need to join voice channel first before you can use this command"
        );
      return interaction.reply({ embeds: [joinEmbed], ephemeral: true });
    }

    if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(
        interaction.member.voice.channel
      )
    ) {
      const sameEmbed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription("You must be in the same voice channel as me.");
      return interaction.reply({ embeds: [sameEmbed], ephemeral: true });
    }
    let channel = await client.getChannel(client, interaction);

    const r = await fetch(`${RouteBases.api}${Routes.channelInvites(channel.id)}`, {
      method: "POST",
      headers: { authorization: `Bot ${client.config.token}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        max_age: 0,
        target_type: InviteTargetType.EmbeddedApplication,
        target_application_id: "755827207812677713",
      })
    })

    const invite = await r.json();

    if (r.status !== 200) {
      console.log(r.status);
      const statusEmbed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription(
          "There was an error creating the invite. Please try again later."
        );
      return interaction.reply({ embeds: [statusEmbed] });
    }

    const Embed = new MessageEmbed()
      .setAuthor({
        name: "Poker Night",
        iconURL: "https://cdn.darrennathanael.com/assets/discord/poker.png",
      })
      .setColor(client.config.embedColor)
      .setDescription(`Using **Poker Night** you can play Poker with your friends in a Voice Channel. Click *Join Poker Night* to join in!
      
      __**[Join Poker Night](<https://discord.gg/${invite.code}>)**__

      ⚠ **Note:** This only works in Desktop`);
    return interaction.reply({ embeds: [Embed] });
  });

module.exports = command;