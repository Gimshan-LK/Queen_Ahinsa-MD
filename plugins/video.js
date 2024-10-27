// YT MP3 DOWNLOAD COMMAND 

const { cmd } = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://tinyurl.com/2axc42rt' // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "video",
    desc: "download video.",
    category: "download",
    react: "🎬",
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
try{

if(!q) return reply('Give me song name or url !')
    
const search = await fetchJson(`${apilink}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${apilink}/download/ytmp4?url=${data.url}`)
    
let message = `‎‎           🎶 YT VIDEO DOWNLOADER 🎶


 🎵 ‎Title: ${data.title}
 ⏱ Duration: ${data.timestamp}
 🌏 Uploaded: ${data.ago}
 🧿 Views: ${data.views}
 🤵 Author: ${data.author.name}
  📎 Url: ${data.url}
`
  
await conn.sendMessage(from, { image: { url : data.thumbnail }, caption: message }, { quoted : mek })
  
// SEND VIDEO NORMAL TYPE and DOCUMENT TYPE
await conn.sendMessage(from, { video: { url: ytdl.result.dl_link }, mimetype: "video/mp4" }, { quoted: mek })
await conn.sendMessage(from, { document: { url: ytdl.result.dl_link }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: `${data.title}`}, { quoted: mek })
  
} catch(e){
console.log(e)
reply(e)
}
})

// FOLLOW US : https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27
