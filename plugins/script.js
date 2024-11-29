const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "script",
    alias: ["sc","repo","info"],
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let repo =`
*╭──────────────●●►*
> *BOT OWNER:*
*|* *QUEEN_AHINSA-MD*

> *QUEEN_AHINSA-MD REPO:*
*|* *https://github.com/Koyeb-LK/Queen_Ahinsa-MD*

> *SUPPORT GROUP:*
*|* *https://chat.whatsapp.com/IzbIrQ9bl858zCGxIZzFq4*
*╰──────────────●●►*

> *CREATED BY QUEEN_AHINSA-MD*
`
await conn.sendMessage(from, { text: repo ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363232588171807@newsletter',
      newsletterName: "QUEEN_AHINSA-MD",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'Queen_Ahinsa-MD,
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/Koyeb-LK/Queen_Ahinsa-MD" ,
thumbnailUrl: "https://i.ibb.co/SR76mBh/Pu3-ZYHBS5139.jpg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})}catch(e){
console.log(e)
reply(`${e}`)
}
});
