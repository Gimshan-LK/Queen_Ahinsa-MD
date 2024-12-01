const axios = require('axios')
const { fetchJson } = require('../lib/functions')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg')
const cheerio = require('cheerio')
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const fg = require('api-dylux')
const yts = require('yt-search')
const { cmd, commands } = require('../command')
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
const {readEnv} = require('../lib/database')
ffmpeg.setFfmpegPath(ffmpegPath);
async function videoToWebp (media) {

  const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
  const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)

  fs.writeFileSync(tmpFileIn, media)

  await new Promise((resolve, reject) => {
      ffmpeg(tmpFileIn)
          .on("error", reject)
          .on("end", () => resolve(true))
          .addOutputOptions([
              "-vcodec",
              "libwebp",
              "-vf",
              "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
              "-loop",
              "0",
              "-ss",
              "00:00:00",
              "-t",
              "00:00:05",
              "-preset",
              "default",
              "-an",
              "-vsync",
              "0"
          ])
          .toFormat("webp")
          .save(tmpFileOut)
  })

  const buff = fs.readFileSync(tmpFileOut)
  fs.unlinkSync(tmpFileOut)
  fs.unlinkSync(tmpFileIn)
  return buff
}

// Fetch API URL
let baseUrl;
(async () => {
    try {
        let baseUrlGet = await fetchJson('https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json');
        baseUrl = baseUrlGet.api;
    } catch (error) {
        console.error('Error fetching base URL:', error);
    }
})();

// Fetch premium users from the premium.json file
async function getPremiumUsers() {
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Premium/premium.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
}

cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tt videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const config = await readEnv();
        if (!q && !q.startsWith("https://")) return reply("*give me tiktok url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`)
let desc = `
    🎟️ *Queen_Ahinsa-MD TIKTOK DOWNLOADER* 🎟️

📌 *Please click what you want to select*

*Region* :- ${data.data.region}

*Title* :- ${data.data.title}

*PlayTime* :- ${data.data.play_time} 

*URL:* ${q}
     `

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
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
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "📼 No-Watermark",
            id: `${prefix}tnw ${q}`
        }),
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "🎟️ With-Watermark",
        id: `${prefix}tww ${q}`
    })
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "🎶 Audio file",
        id: `${prefix}ta ${q}`
    })
    }
]

let opts = {
    header: '',
    footer: FOOTER,
    body: desc,
    image: data.data.cover
}
return await conn.sendButtonMessage(from, buttons, m, opts)
} catch(e) {
console.log(e);
reply(`${e}`)
}
});

cmd({
    pattern: "tnw",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://')) return await reply(msr.not_fo)

  let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`)

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.data.no_wm }, mimetype: "video/mp4", caption: `> *POWERED by ASITHA-MD*` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "tww",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://')) return await reply(msr.not_fo)

  let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`)

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.data.wm }, mimetype: "video/mp4", caption: `> *POWERED by ASITHA-MD*` }, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "ta",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://')) return await reply(msr.not_fo)

  let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`)

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

// Facebook Downloader
cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
const config = await readEnv();
  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "*❌ Please provide a valid URL.*" }, { quoted: mek });
}

  let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });


    const desc = `
💢 *ARROW-MD FB DOWNLOADER* 💢


📌 Please click that what you want to select

Fb-Url: -=-${q} 
`;
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
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
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "🪫 SD QUALITY",
            id: `${prefix}fbsd ${q}`
        }),
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "🔋 HD QUALITY",
        id: `${prefix}fbhd ${q}`
    })
    },
    {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "🎶 Audio file",
        id: `${prefix}fba ${q}`
    })
    }
]

let opts = {
    header: '',
    footer: FOOTER,
    body: desc,
    image: data.data.image

}
return await conn.sendButtonMessage(from, buttons, m, opts)
} catch(e) {
console.log(e);
reply(`${e}`)
}
});

cmd({
    pattern: "fbsd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://')) return await reply(msr.not_fo)

  let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: `> *POWERED by ARROW-MD*` }, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
cmd({
    pattern: "fbhd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://')) return await reply(msr.not_fo)

  let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: `> *POWERED by ARROW-MD*` }, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "fba",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv();
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://')) return await reply(msr.not_fo)

  let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: data.data.sd }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

async function xnxxs(query) {
    return new Promise((resolve, reject) => {
      const baseurl = 'https://www.xnxx.com';
      fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
        const $ = cheerio.load(res, {xmlMode: false});
        const title = [];
        const url = [];
        const desc = [];
        const results = [];
        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb').each(function(c, d) {
            url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
          });
        });
        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb-under').each(function(c, d) {
            desc.push($(d).find('p.metadata').text());
            $(d).find('a').each(function(e, f) {
              title.push($(f).attr('title'));
            });
          });
        });
        for (let i = 0; i < title.length; i++) {
          results.push({title: title[i], info: desc[i], link: url[i]});
        }
        resolve({status: true, result: results});
      }).catch((err) => reject({status: false, result: err}));
    });
  }

cmd({
    pattern: "xnxxdown",
    react: "🫣",
    alias: ["xnxxsearch"],
    desc: "Search and get details from xnxx.",
    category: "download",
    use: '.xnxxs <query>',
    filename: __filename
},
async (conn, mek, m, { from, q, sender, reply }) => {
    try {

      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   

    const config = await readEnv();
      // Fetch premium users
        const premiumUsers = await getPremiumUsers();
        
        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }
        // Ensure a search query is provided
        if (!q) return reply("Please provide a search term!");

        // Fetch owner data from GitHub (for logo, button, footer, etc.)
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data;
        let LOGO = ownerdata.imageurl;
        let BTN = ownerdata.button;
        let FOOTER = ownerdata.footer;
        let BTNURL = ownerdata.buttonurl;
        let prefix = config.PREFIX;

        // Perform the XNXX search
        const searchResults = await xnxxs(q);
        const videos = searchResults.result.slice(0, 5); // Limit to top 5 results

        if (!videos.length) return reply("No results found.");

        let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: BTN,
                        url: BTNURL,
                        merchant_url: BTNURL
                    }),
                },
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Select One :)',                        
            sections: [{                            
              title: 'Please select one',
              highlight_label: 'Recomended',
                  rows: [{
                     title: `${searchResults.result[0].title}`,
                     //description: ``,
                     id: `${prefix}xnxxdl ${searchResults.result[0].link}`
                  }, {
                     title: `${searchResults.result[1].title}`,
                     //description: ``,
                     id: `${prefix}xnxxdl ${searchResults.result[1].link}`
                  }, {
                     title: `${searchResults.result[2].title}`,
                     //description: ``,
                     id: `${prefix}xnxxdl ${searchResults.result[2].link}`
                  }, {
                     title: `${searchResults.result[3].title}`,
                     //description: ``,
                     id: `${prefix}xnxxdl ${searchResults.result[3].link}`
                  }, {
                     title: `${searchResults.result[4].title}`,
                     //description: ``,
                     id: `${prefix}xnxxdl ${searchResults.result[4].link}`
                  }, {
                     title: `${searchResults.result[5].title}`,
                     //description: ``,
                     id: `${prefix}xnxxdl ${searchResults.result[5].link}`
                  }]
               }]
            })
         }]

        // Prepare the message content
        let msg = `
*Queen_Ahinsa-MD XNXX DOWNLOADER*

🫣 *XNXX Search Results* for: *${q}*

Please select a video:
        `;

        // Send button message with search results
        let message = {
            header: 'XNXX Search Results',
            footer: FOOTER,
            body: msg
        };

        return conn.sendButtonMessage(from, buttons, m, message);

    } catch (e) {
        console.log(e);
        reply("An error occurred while searching on XNXX.");
    }
});

async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdown",
    alias: ["dlxnxx","xnxxdl"],
    react: '🫣',
    desc: "Download xnxx videos",
    use: '.xnxx <xnxx link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   

  const config = await readEnv();
 //if (!isMe) return await reply('🚩 This command is only available to premium users. Buy Premium 0743381623')
 if (!q) return reply('*Please give me url !!*')

  // Fetch premium users
        const premiumUsers = await getPremiumUsers();
        
        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(mrs.pre_cmd);
        }
  
  let res = await xdl(q)
  let title = res.result.title
  await conn.sendMessage(from, { video: { url: res.result.files.high }, caption: `${title}\n\n> *POWERED by ASITHA-MD*`}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})




const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "xvs",
    react: "🫣",
    alias: ["xvideossearch"],
    desc: "Search and get details from xvideos.",
    category: "search",
    use: '.xvs <query>',
    filename: __filename
  },
  async (conn, mek, m, { from, q, sender, reply }) => {
    try{      
  
  const config = await readEnv();
  
      // Fetch premium users
        const premiumUsers = await getPremiumUsers();
        
        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);
  
        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply("🚩 This command is only available to premium users.");
        }
        // Ensure a search query is provided
        if (!q) return reply("Please provide a search term!");
  
        // Fetch owner data from GitHub (for logo, button, footer, etc.)
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data;
        let LOGO = ownerdata.imageurl;
        let BTN = ownerdata.button;
        let FOOTER = ownerdata.footer;
        let BTNURL = ownerdata.buttonurl;
  
        // Perform the XNXX search
const searchResults = await fetchJson(`${apilink}/search/xvideo?q=${q}`).catch(err => {
    console.error(err);
    return null; // Return null or handle error
});

if (!searchResults || searchResults.result.length === 0) {
    return await reply("No results found!");
}

let buttonss = [
    {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
            display_text: BTN,
            url: BTNURL,
            merchant_url: BTNURL
        }),
    },
    {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
            title: 'Select One Movie :)',
            sections: [{
                title: 'Please select one',
                rows: searchResults.result.map(result => ({
                    title: `${result.title}`,
                    id: `${config.PREFIX}xvdl ${result.url}`
                }))
            }]
        })
    }
];
        // Prepare the message content
        let msg = `
  ⫷⦁[ Queen_Ahinsa 𝘔𝘋 𝙓𝙑𝙄𝘿𝙀𝙊𝙎 𝙎𝙀𝘼𝙍𝘾𝙃 ]⦁⫸

  
  🫣 *XVIDEOS Search Results* for: *${q}*
  
  Please select a video:
        `;
  
        // Send button message with search results
        let message = {
            header: 'XVIDEOS Search Results',
            footer: FOOTER,
            body: msg
        };
  
        return conn.sendButtonMessage(from, buttonss, m, message);
  
    } catch (e) {
        console.log(e);
        reply("An error occurred while searching on XNXX.");
    }
  });

  cmd({
    pattern: "xvdown",
    alias: ["dlxv","xvdl"],
    react: '🫣',
    desc: "Download xvideos videos",
    category: "download",
    use: '.xv <xvideos link>',
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{      
  
  const config = await readEnv();
  //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
  if (!q) return reply('*Please give me url !!*')
  
  // Fetch premium users
        const premiumUsers = await getPremiumUsers();
        
        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);
  
        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply("🚩 This command is only available to premium users.");
        }
  
  let xv_info = await fetchJson(`${apilink}/download/xvideo?url=${q}`)
  const msg = `
    🔞 *XVIDEO DOWNLOADER* 🔞

       
• *Title* - ${xv_info.result.title}

• *Views* - ${xv_info.result.views}

• *Like* - ${xv_info.result.like}

• *Deslike* - ${xv_info.result.deslike}

• *Size* - ${xv_info.result.size}

> *POWERED by Queen_Ahinsa-MD*
`



await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


  } catch (e) {
  reply('*Error !!*')
  console.log(e)
  }
  })
  

