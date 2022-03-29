const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('야').setDescription('호라고 대답합니다!'),
	new SlashCommandBuilder().setName('서버').setDescription('서버정보를 봅니다.'),
	new SlashCommandBuilder().setName('유저').setDescription('유저정보를 봅니다..'),
]
    .map(command => command.toJSON());
    


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);  