const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const config = require('../config')
const {readEnv} = require('../lib/database')
const fs = require('fs');
const path = require('path');



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// .song command
cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const config = await readEnv();
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
        if(!q) return reply(msr.giveme)
        //if (q.includes('https://youtu.be/')) return await reply(msr.not_fo)
    


        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*🎶ＡＲＲＯＷ-𝗠𝗗 𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url}
*|__________________________*
`;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"


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
            url: "https://github.com/ASITHA-MD/ASITHA-MD",
            merchant_url: "https://github.com/ASITHA-MD/ASITHA-MD"
        }),
      },
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Audio 🎵",
            id: `${prefix}ytmp3 ${data.url}`
        }),
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "Document 📑",
        id: `${prefix}ytdoc ${data.url}`
    })
    }
]

let opts = {
    image: data.thumbnail,
    header: '',
    footer: FOOTER,
    body: desc

}
return await conn.sendButtonMessage(from, buttons, m, opts) 
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// .video command
cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const config = await readEnv();
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
        if(!q) return reply(msr.giveme)
        //if (q.includes('https://youtu.be/')) return await reply(msr.not_fo)
    

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*📽️ＡＲＲＯＷ-MD VIDEO-DOWNLOADER📽️*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url}
*|__________________________*
`;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"



let buttons = [{
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
            display_text: BTN,
            url: BTNURL,
            merchant_url: BTNURL
        }),
    },
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Video 144p 🎥",
            id: `${prefix}ytmp4 ${data.url} & 0`
        })},
    {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "Video 240p 🎥",
                id: `${prefix}ytmp4 ${data.url} & 1`
            })},
    {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "Video 360p 🎥",
                id: `${prefix}ytmp4 ${data.url} & 2`
            })},          
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Video 480p 🎥",
            id: `${prefix}ytmp4 ${data.url} & 3`
        })},        
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Video 720p 🎥",
            id: `${prefix}ytmp4 ${data.url} & 4`
        }) },      
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Video 1080p 🎥",
            id: `${prefix}ytmp4 ${data.url} & 5`
        })},
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "Document 144p 📑",
        id: `${prefix}ytvdoc ${data.url} & 0`
    })
    },
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Document 240p 📑",
            id: `${prefix}ytvdoc ${data.url} & 1`
        })
        },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "Document 360p 📑",
        id: `${prefix}ytvdoc ${data.url} & 2`
    })
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "Document 480p 📑",
        id: `${prefix}ytvdoc ${data.url} & 3`
    })},
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Document 720p 📑",
            id: `${prefix}ytvdoc ${data.url} & 4`
        })
        },
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Document 1080p 📑",
            id: `${prefix}ytvdoc ${data.url} & 5`
        })
        }
]


let opts = {
    image: data.thumbnail,
    header: '',
    footer: FOOTER,
    body: desc

}
return await conn.sendButtonMessage(from, buttons, m, opts)

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// .ytmp3 command
cmd({
    pattern: "ytmp3",
    react: "⬇",
    category: "download",
    dontAddCommandList: false,
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo)

    
    
    const down = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp3?url=${q}`)
    const downloadUrl = down.result.download_url;
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
//.ytdoc command
cmd({
    pattern: "ytdoc",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo)

    const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

    
    const down = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp3?url=${q}`)
    const downloadUrl = down.result.download_url;

    const search = await yts(q);
const data1 = search.videos[0];

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "audio/mpeg", fileName: data1.title + ".mp3", caption: `${FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
fs.unlinkSync(imagePath);
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
// .ytmp4 command
cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const config = await readEnv();
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg;

        const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo);

        const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
        const downloadUrl = jsonResponse.result[rr].dl_link;

        // Reacting with upload icon
        await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});


        // Sending the video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }});
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
//.ytvdoc command
cmd({
    pattern: "ytvdoc",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   

      const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo);

    const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
const downloadUrl = jsonResponse.result[rr].dl_link;

const search = await yts(q);
const data3 = search.videos[0];

        // Reacting with upload icon
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});

await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "video/mp4",fileName:  data3.title+ ".mp4", caption: `${FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "yts",
    react: "🔎",
    alias: ["ytsearch", "ytfind"],
    desc: "Search YouTube and provide download options.",
    category: "search",
    use: '.yts <query>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, sender, reply }) => {
    try {
      const config = await readEnv();
        // Ensure a search query is provided
        if (!q) return reply("Please provide a search term!");
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;

        // Perform YouTube search using yt-search
        const searchResults = await yts(q);
        const videos = searchResults.videos.slice(0, 5); // Limit to top 5 results

        if (!videos.length) return reply("No results found.");

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
            url: "https://github.com/ASITHA-MD/ASITHA-MD",
            merchant_url: "https://github.com/ASITHA-MD/ASITHA-MD"
        }),}, 
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Select One :)',                        
            sections: [{                            
              title: 'Please select one',
              highlight_label: 'Recomended',
                  rows: [{
                     title: `${searchResults.videos[0].title}`,
                     //description: ``,
                     id: `${prefix}ytselect ${searchResults.videos[0].url}`
                  }, {
                     title: `${searchResults.videos[1].title}`,
                     //description: ``,
                     id: `${prefix}ytselect ${searchResults.videos[1].url}`
                  }, {
                     title: `${searchResults.videos[2].title}`,
                     //description: ``,
                     id: `${prefix}ytselect ${searchResults.videos[2].url}`
                  }, {
                     title: `${searchResults.videos[3].title}`,
                     //description: ``,
                     id: `${prefix}ytselect ${searchResults.videos[3].url}`
                  }, {
                     title: `${searchResults.videos[4].title}`,
                     //description: ``,
                     id: `${prefix}ytselect ${searchResults.videos[4].url}`
                  }, {
                     title: `${searchResults.videos[5].title}`,
                     //description: ``,
                     id: `${prefix}ytselect ${searchResults.videos[5].url}`
                  }]
               }]
            })
         }]
        // Prepare message content
        let msg = `
⫷⦁[ * '-'_꩜ ＡＲＲＯＷ 𝙈𝘿  𝙔𝙏𝙎 𝙎𝙀𝘼𝙍𝘾𝙃 ꩜_'-' * ]⦁⫸

🔎 *YouTube Search Results* for: *${q}*

Please select a video:
        `;

        // Send button message with search results
        let message = {
            image: searchResults.videos[0].thumbnail,
            header: 'YouTube Search Results',
            footer: '> *POWERED by ASITHA-MD*',
            body: msg
        };

        return conn.sendButtonMessage(from, buttons, m, message);

    } catch (e) {
        console.log(e);
        reply("An error occurred while searching on YouTube.");
    }
});

// Add command to handle video selection
cmd({
    pattern: "ytselect",
    react: "🎥",
    use: ".ytselect",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        const config = await readEnv();
        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;


        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let desc = ` SELECT WHAT YOU NEED `
        // Prepare buttons for downloading video or audio

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
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Download Audio 🎶",
            id: `${prefix}song ${data.url}`
        }),
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "Download Video 📹",
        id: `${prefix}video ${data.url}`
    })
    }
]

let opts = {
    image: data.thumbnail,
    header: '',
    footer: FOOTER,
    body: desc

}
return await conn.sendButtonMessage(from, buttons, m, opts)

    } catch (e) {
        console.log(e);
        reply("An error occurred while processing your selection.");
    }
});
