const {cmd , commands} = require('../command')
const fg =  require('api-dylux')
const yts = require('yt-search')


cmd({
    pattern: "video",
    desc: "download video",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply("please give me a url or tittle")
const search = await yts(q)
const data = search.videos[0];
const url  = data.url

let desc = ` 
           🎬 YT VIDEO DOWNLOADER 🎬

 🎬 ‎Title: ${data.title}
 🕝 Duration: ${data.timestamp}
 🌏 Uploaded: ${data.ago}
 🧿 Views: ${data.views}
 🤵 Author: ${data.author.name}
  📎 Url: ${data.url}
`


const {cmd , commands} = require('../command')
const fg =  require('api-dylux')
const yts = require('yt-search')


cmd({
    pattern: "video",
    desc: "download video",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply("please give me a url or tittle")
const search = await yts(q)
const data = search.videos[0];
const url  = data.url

let desc = ` 
            DILISHA-MD WHATSAPP BOT

      SRILANKA NO1 WHATSAPP MUSIC GROUP 🇱🇰 
                HAPPY LIFE YOU 🥸
____________________________________________
⭕ tittle: ${data.tittle}
⭕ despcription: ${data.description}
⭕ time: ${data.time}
⭕ ago: ${data.ago}
⭕ views: ${data.views}
____________________________________________

        A RESPONCE BY FAMILY MUSIC
                   POWER BY ⭕DILISHA⭕                    
`


await conn.sendMessage(from, { image: { url : data.thumbnail }, caption: message }, { quoted : mek })


//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url
    
// SEND VIDEO NORMAL TYPE and DOCUMENT TYPE
await conn.sendMessage(from, { video: { url: ytdl.result.dl_link }, mimetype: "video/mp4" }, { quoted: mek })
await conn.sendMessage(from, { document: { url: ytdl.result.dl_link }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: `${data.title}`}, { quoted: mek })
  
} catch(e){
console.log(e)
reply(e)
}
})
