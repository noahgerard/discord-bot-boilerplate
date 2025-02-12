import { CommandOptions, SlashCommandProps } from "commandkit";
import { SlashCommandBuilder } from "discord.js";

import { inspect } from "util";

export const data = new SlashCommandBuilder()
  .setName("eval")
  .setDescription("evaluate code")
  .addStringOption((option) =>
    option
      .setName("code")
      .setDescription("The code to evaluate")
      .setRequired(true),
  );

export const run = async ({ interaction, client }: SlashCommandProps) => {
  const code = options.getString("code", true);

  const result = new Promise((resolve) => resolve(eval(code)));

  return result
    .then((output: any) => {
      if (typeof output !== "string") {
        output = inspect(output, { depth: 0 });
      }
      if (output.includes(client.token)) {
        output = output.replace(client.token, "T0K3N");
      }

      return interaction.reply({ content: `\`\`\`js\n${output}\`\`\`` });
    })
    .catch((err) => {
      console.error(err);

      err = err.toString();

      if (err.includes(client.token)) {
        err = err.replace(client.token, "T0K3N");
      }

      return interaction.reply({ content: `\`\`\`js\n${err}\`\`\`` });
    });
};

export const options: CommandOptions = {
  userPermissions: [],
  botPermissions: [],
  deleted: false,
  cooldown: 5 * 1000,
  devOnly: true,
};
