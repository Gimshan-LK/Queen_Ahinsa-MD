
const config = require('../config')
const { cmd, commands } = require('../command')
const {readEnv} = require('../lib/database')
const axios = require('axios')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')
// Fetch premium users from the premium.json file
async function getPremiumUsers() {
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
}
let baseUrl = "https://dark-yasiya-movie-apis.vercel.app"
let key = "&apikey=asitha9key"


cmd({
    pattern: "moviedown2",
    alias: ["md"],
    desc: "Check bot setting.",
    react: "🎬",
    category: "extra",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      
  
      
// Fetch premium users
        const premiumUsers = await getPremiumUsers();
        
        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply("🚩 This command is only available to premium users, buy premium 0743381623");
        }
let data1 = await fetchJson(`${baseUrl}/api/sin/search?text=${q}${key}`)


const config = await readEnv();
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;

        let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: BTN,
                        url: BTNURL,
                        merchant_url: BTNURL
                    }),
                },
                  {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
            display_text: "GITHUB",
            url: "https://github.com/Koyeb-LK/ARROW-MD",
            merchant_url: "https://github.com/Koyeb-LK/ARROW-MD"
        }),}, 
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Select One Movie :)',                        
            sections: [{                            
              title: 'Please select one',
                  rows: [{
                     title: `${data1.result.data[0].title}`,
                     //description: ``,
                     id: `${prefix}mdd ${data1.result.data[0].link}`
                  }]
               }]
            })
         }]
let msg = `📌 Select Your Movie`
  let message = {
            header: 'Queen_Ahinsa-MD MOVIE SEARCH',
            footer: '> *POWERED by Queen_Ahinsa-MD*',
            body: msg
        };

        return conn.sendButtonMessage(from, buttons, m, message);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
      

cmd({
    pattern: "mdd",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  // Fetch premium users
        const premiumUsers = await getPremiumUsers();
        
        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply("🚩 This command is only available to premium users, buy premium 0743381623");
        }
let data2 = await fetchJson(`${baseUrl}/api/sin/search?text=${q}${key}`)
//let tut = Object.keys(data2.result.data).length

const config = await readEnv();
let  urll = await fetchJson(`${baseUrl}/api/sin/movie?url=${q}${key}`)
let cc = `
☘️ *𝗧ɪᴛʟᴇ : ${urll.result.data.title}*

▫️📅. *𝗥ᴇʟᴇᴀꜱᴇ 𝗗ᴀᴛᴇ - ${urll.result.data.date}*
▫️🌎. *𝗖ᴏᴜɴᴛʀʏ - ${urll.result.data.country}*
▫️⏱️. *𝗗ᴜʀᴀᴛɪᴏɴ - ${urll.result.data.runtime}*
▫️🎭. *𝗚ᴇɴʀᴇꜱ - ${urll.result.data.category[0]} ${urll.result.data.category[1]} ${urll.result.data.category[2]}*
▫️👨🏻‍💼. *𝗗ɪʀᴇᴄᴛᴏʀ - ${urll.result.data.director}*

▫️🕵️‍♂️. *𝗖ᴀsᴛ - ${urll.result.data.cast[0].cast_name} ${urll.result.data.cast[1].cast_name}*
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗. *Url* - ${q} 
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by Queen_Ahinsa-MD*
`
const quality = urll.result.data.dl_links[0].link 
  let pp = quality.replace("/u/", "/api/file/")
const quality1 = urll.result.data.dl_links[1].link
  let pp1 = quality1.replace("/u/", "/api/file/")
const quality2 = urll.result.data.dl_links[2].link
  let pp2 = quality2.replace("/u/", "/api/file/")
let abc = `
🔢 *Please reply the number you want to select*

  🎬 *1 | 480p :* ${pp2}
  🎬 *2 | 720p :* ${pp1}
  🎬 *3 | 1080p :* ${pp}

> *POWERED by Queen_Ahinsa-MD*
`
await conn.sendMessage(from, { image: { url: urll.result.data.image}, caption: cc },{ quoted: mek });
const sentMsg = await conn.sendMessage(from, { text:abc },{ quoted: mek });

const messageID = sentMsg.key.id;

conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
  if (messageType === '1') {
await conn.sendMessage(from, { document : { url : pp2 } ,mimetype: "video/mp4",fileName: `🎬 ASITHA-MD 🎬\n${urll.result.data.title}.mkv`,caption :`> ${urll.result.data.title}\n\n> 480p\n\n> *POWERED by ASITHA-MD*` }, { quoted: mek })
  }else if (messageType === '2') {
    await conn.sendMessage(from, { document : { url : pp1  } ,mimetype: "video/mp4",fileName: `🎬 ASITHA-MD 🎬\n${urll.result.data.title}.mkv`,caption :`> ${urll.result.data.title}\n\n> 720p\n\n> *POWERED by ASITHA-MD*` }, { quoted: mek })
  }else if (messageType === '3'){
await conn.sendMessage(from, { document : { url : pp  } ,mimetype: "video/mp4",fileName: `🎬 ASITHA-MD 🎬\n${urll.result.data.title}.mkv`,caption :`> ${urll.result.data.title}\n\n> 1080p\n\n> *POWERED by ASITHA-MD*` }, { quoted: mek })
}  
await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
console.log("Response sent successfully");
} });
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});
