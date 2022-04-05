const express = require('express');
const app = express();
const cors = require("cors");
const { sequelize } = require('./database/models');
const fs = require('fs');
//router import
const accountRouter = require('./routes/AccountRouter')
const ProposalRouter = require('./routes/ProposalRouter')
const { proposals } = require('./database_mongo/models/proposals')
require("dotenv").config();


// '/'로 들어오는 요청은 기본적으로 indexRouter로 이동해서 된다.

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/account', accountRouter)
app.use('/proposals', ProposalRouter);
app.get('/saveData', () => {
    const testData =   {
        id: 1,
        user1: {
          proposal : 1,
          address: "0x6cD3dde9dFf947F8F42aa780D0CCE8f897E8DE5F",
          nfts: [
            {
              address: "0x02e81f5e8bf8b19d0e1f3ad4a4eea757402b6cc0",
              id: "10",
              imageUrl:
                "https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA",
            },
            {
              address: "0x690071b9354031e135b8332ff10e4ad6ddfaf48e",
              id: "4",
              imageUrl:
                "https://lh3.googleusercontent.com/BWKgKXz6JbnK-H1r-n-3xE_wRJNAD3nGylSW-o6clV2GRs1Mn_xmdMXIZ0jIL5ot4-e1P7iy4lWHaNnwJ3S-V4SgFna7PejHbxdJ",
            },
          ],
          ether: 0,
        },
        user2: {
          address: "0xfF4F6981A042a7F161ac699D58c745bAe5B0d839",
          nfts: [
            {
              address: "0x02e81f5e8bf8b19d0e1f3ad4a4eea757402b6cc0",
              id: "10",
              imageUrl:
                "https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA",
            },
          ],
          ether: 0,
        },
      }
    const data = new proposals(testData);
    data.save((err, res) => {
        if (err) return console.log(err);
        console.log(res);
    })
})
// sequelize.sync({ force: false })
//     .then(() => {
//         console.log('데이터베이스 연결 성공');
//     })
//     .catch((err) => {
//         console.error(err);
//     });




//DB connect
const mongoose = require('mongoose');
console.log(process.env.MONGDB);
mongoose
	.connect(
		process.env.MONGDB,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB Connected success !!'))
	.catch((err) => console.log(err));




//디스코드 봇 설정 

  //v12  
// const Discord = require('discord.js');	// discord.js 라이브러리 호출
//const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS"] })	// Client 객체 생성


//v13
const { Client, Intents, MessageEmbed,WebhookClient, MessageActionRow,MessageButton } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_WEBHOOKS] })	// Client 객체 생성

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

// client.users.fetch('707854317943783475  ', false).then((user) => {
//     user.send('hello world');
//    });
});


// client.fetchWebhook('957190200633733120', "Mzu450xIMgQoHog4AEZ2mE2-LMwWDm6qqyipvZcnhMkd8ZBtCQYZwbPuU3ZTzYzQfEYh")
//   .then(webhook => webhook.send('난 이제 살아 있어요!'))
//   .catch(console.error);


client.on('messageCreate', async msg => {
    //   console.log(msg.author);       
    // const user = await client.users.fetch(msg.author.id);
    // user.send(msg.content);
    try { 
    if (msg.webhookId === "958360197607358524") {
        if (msg.embeds[0].title === "SWAP") {
          
            // msg.channel.send(`이건말이여 transaction성공 했을때 보내주는 메세지여~~`); 
            const user = await client.users.fetch(msg.embeds[0].fields[2].value);
            const swap = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Accept')
                    .setStyle('PRIMARY'),
                    new MessageButton()
					.setCustomId('Danger')
					.setLabel('Reject')
                    .setStyle('DANGER'),
                    
            );
            //msg.channel.send({ embeds: [msg.embeds[0]], components: [swap] });
            user.send({ embeds: [msg.embeds[0]], components: [swap] });
            const collector = msg.channel.createMessageComponentCollector({
                time: 10 * 1000
            })
            collector.on("collect", async (msg) => {
                console.log('collect');
            })
        }
       
    };
    
        // !ping 
            if (msg.content === '!야') msg.channel.send(`!호`); // 채팅에서 메세지가 들어왔을 때 실행할 콜백함수입니다.
    
            if (msg.content === '!avatar') msg.channel.send(msg.author.displayAvatarURL()); // 메세지를 보낸 유저의 프로필 사진을 받아옵니다.
    
            // !help
        if(msg.content === '!help') {
            // 저희는 MessageEmbed 생성자로 embed를 생성할 수 있습니다.
            const embed = new MessageEmbed()
            .setTitle("Hello I'm cupcake bot, What do you want?") // 1 - embed의 제목을 담당합니다.
            .setColor('0f4c81') // 2 - embed 사이드 바의 색을 정합니다.
            .setDescription('안녕하세요! 이곳은 추후에 설명할 공간입니다.'); // 3 - 실제로 설명을 담당하는 곳입니다.
            msg.reply({ embeds: [embed] })
        }
            
       
        if (msg.content.startsWith("안녕")) { //메세지가 /안녕 으로 시작된다면
            console.log(msg.author);
            msg.channel.send(`안녀엉!  <@${msg.author.id}>!`) //안녀엉! 이라는 메세지를 채널에 전송합니다.
        }
      
        if (msg.content === 'ch') {
            let name = msg.author.username;
            msg.guild.channels.create('cupcake chat : 1', {
                type: 'text',
                parent: "957914803895148574",
            })
            msg.channel.send("Channel Created!");
        }
        
            
            //console.log(msg.author); 사용자 정보가 발생합니다.
        }catch (e) {
            console.log(e);
        }
        
});

 //memeber가 추가될때 발생하는 이벤트 
 // member가 추가되면 DB에 account와 discordId를 적재할까? 
 client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.cache
   
    const embed = new Discord.MessageEmbed()
        .addField(
                `:point_right: Welcome!`,
                `Hello, welcome to ${member.guild.name} <@${member.user.id}>!`,
                true
                )
        .setColor("YELLOW") // 2 - embed 사이드 바의 색을 정합니다.
        .setImage(
            member.user.avatarURL() // make sure to change this to your image
              );    
    
      channel
      .find((channel) => channel.id === "957813201146359858")
      .send({ embeds: [embed] });
 });
  
 client.on('clickButton', async (button) => {
	console.log('button click');
 });


app.listen(5000, () => {
    console.log('5___port startedd');
    client.login(process.env.TOKEN);    
})
