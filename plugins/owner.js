const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const config = require('../config')


cmd({
    pattern: "owner",
    react: "👾", // Reaction emoji when the command is triggered
    alias: ["silent", "king"],
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let owner = ` 
_________________________
_________________________
   ♨️ O W N E R ♨️
│✫➠ - NAME - 𝑫𝑰𝑳𝑰𝑺𝑯𝑨
│✫➠ - CONTACT -  94775713391
│✫➠ - BOT - Queen_Ahinsa-MD
│✫➠ - CONTRY - SRILANKA
│✫➠ - Youtube - https://www.youtube.com/@srilanka-no1AWM-FF
│✫➠ - REPO - github.com/HerokuZR/Queen_Ahinsa-MD
_________________________
_________________________

> 𝑫𝑬𝑽𝑬𝑳𝑶𝑷𝑬𝑫 𝑩𝒀 𝑫𝑰𝑳𝑰𝑺𝑯𝑨
`
await conn.sendMessage(from, { text: owner ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363232588171807@newsletter',
      newsletterName: "Queen_Ahinsa-MD",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'Queen_Ahinsa-MD',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "0742346814 I'M MSG YOU FROM OWNER ADS" ,
thumbnailUrl: "https://i.ibb.co/SR76mBh/Pu3-ZYHBS5139.jpg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});
