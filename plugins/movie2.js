const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { readEnv } = require('../lib/database');
const { cmd } = require('../command');
const os = require("os");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson } = require('../lib/functions');
const axios = require('axios');
const { PixaldrainDL } = require("pixaldrain-sinhalasub");
//const { getMovies, getMovieDL, getMoviesSearch } = require('dark-yasiya-sinhalasub.lk');
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cheerio = require('cheerio')
const ffmpeg = require('fluent-ffmpeg')
const { File } = require('megajs')


// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();

async function getPremiumUsers() {
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
}

const { storenumrepdata } = require('../lib/nonbutton)
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


const yourName = "*POWERED by ARROW-MD*"; // YOURBOTNAME 💚 කියන තැනට ඔයාගේ බොට්ගේ නම හරි ඔයාගෙ නම හරි දාන්න.




//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    react: "🎥",
    desc: "download tw videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me twitter url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        reply("*Downloading...*")
        //send video (hd,sd)
        m.react('⬆️')
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })
        m.react('✅')
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })  
        m.react('✅')
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//gdrive(google drive) dl
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: "📀",
    desc: "download gdrive files",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me gdrive url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${q}`)
        reply("*Downloading...⏳*")
        m.react('⬆️')
        await conn.sendMessage(from, { document: { url: data.data.download }, fileName: data.data.fileName, mimetype: data.data.mimeType, caption: `${data.data.fileName}\n\n> ${yourName}` }, { quoted: mek })  
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//mediafire dl
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: "📚",
    desc: "download mfire files",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me mediafire url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${q}`)
        reply("*Downloading...*")
        m.react('⬆️')
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: `${data.data.name}\n\n${yourName}` }, { quoted: mek })                                                                                                                 
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
//instgarm download 


cmd({

    pattern: "ig",
    desc: "To get the bot informations.",
    react: "🎥",
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
    
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

         let res = await igdl(q);
        
         let data = await res.data;
         for (let i = 0; i < 20; i++) {
            let media = data[i];
            let downloadurl = media.url
             m.react('⬆️')
            await conn.sendMessage(from,{video: {url:downloadurl},mimetype:"video/mp4",caption: `> ${yourName}`},{quoted:mek})
             m.react('✅')
         }

}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({
    pattern: "apk",
    react: '🗽',
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("🔄")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*「 𝗔𝗣𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 」*
*╭──📦 APK Details 📦──◦•◦❥•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰───────────────◦•◦❥•*\n\n\> *POWERED by ASITHA-MD*`

await conn.sendMessage(from,{image: {url: data.datalist.list[0].icon},caption: desc},{quoted: mek})
await conn.sendMessage(from,{document: {url: data.datalist.list[0].file.path_alt},fileName: data.datalist.list[0].name,mimetype: 'application/vnd.android.package-archive',caption: `> *POWERED by ARROW-MD*`},{quoted: mek})
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({
    pattern: "mega",
  category: "download",
  react: "⬇️",
    desc: "Download Mega file and send it.",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !isUrl(q) || !q.includes('mega.nz')) {
            return reply("Please provide a valid Mega.nz file URL.")
        }

        // Extract file link and key (if present)
        const [fileURL, fileKey] = q.split("#");

        if (!fileKey) {
            return reply("Error: Decryption key is missing in the provided URL.");
        }

        // Use File.fromURL() to create a valid file instance
        const file = File.fromURL(`${fileURL}#${fileKey}`);

        // Track progress
        file.on('progress', (bytesLoaded, bytesTotal) => {
            const percent = (bytesLoaded / bytesTotal * 100).toFixed(2);
            reply(`Downloading: ${percent}% (${(bytesLoaded / 1024 / 1024).toFixed(2)} MB of ${(bytesTotal / 1024 / 1024).toFixed(2)} MB)`);
        });

        const buffer = await file.downloadBuffer();  // Download the file as a buffer

        // Send the file as a document
        await conn.sendMessage(from, { document: buffer, mimetype: "application/octet-stream", fileName: "mega_downloaded_file" }, { quoted: mek });
        reply("File sent successfully!");

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});








cmd({
    pattern: "sd",
    react: "🎥",
    desc: "Download movie for sinhalasub.lk",
    category: "download",
    use: '.sinhalasub < Movie Name >',
    filename: __filename
},
    
async(conn, mek, m,{from, prefix, quoted, q, reply}) => {
try{
const config = await readEnv();	
if(!q) return await reply('Mv name plz')
	
const oka_tama_prashne = await fetchJson(`https://dark-yasiya-api-new.vercel.app/movie/sinhalasub/search?text=${q}`)
let hi_patiyo = oka_tama_prashne.result.data
let numrep = []
  

		
              let pakaya = `MOVIE-SEARCH

`
	
	                hi_patiyo.forEach((movie, htta) => {
				
                  pakaya += ` *${formatNumber( htta + 1)} ||* ${movie.title}\n\n`
				
                  numrep.push(`${prefix}menu ${movie.link}` )
                  })	      
  
	

	 const mass = await conn.sendMessage(from, { image: { url: `https://i.postimg.cc/zvpdnfsK/1727229710389.jpg`  }, caption: `${pakaya}\n\n` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg)
	
} catch (e) {
console.log(e)
reply(e)
}
})


cmd({
    pattern: "sinhalasub",
    alias: ["ms"],
    desc: "Check bot setting.",
    react: "🎬",
    category: "extra",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

        const config = await readEnv();
        const s = await getMovies(q);

        // Check if the search returned any results
        if (s.result.length === 0) {
            return reply("🚫 No movies found for your search query.");
        }

        // Create buttons for each movie found in the search results
        let buttons = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Movie :)',
                sections: [{
                    title: 'Please select one',
                    rows: s.result.map(movie => ({
                        title: `${movie.title}`,
                        id: `${config.PREFIX}mds ${movie.link}`
                    }))
                }]
            })
        }];

        let message = {
            header: 'ARROW-MD SIHALASUB.LK MOVIE SEARCH',
            footer: '> *POWERED by ARROW-MD*',
            body: `📌 Select Your Movie`
        };

        return conn.sendButtonMessage(from, buttons, m, message);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "mds",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

        const config = await readEnv();
        const data2 = await SinhalaSub.movie(q);
        const sss = await getMovieDL(q);

        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values දෙනවා
        let cc = `
☘️ *Tɪᴛʟᴇ :* ${sss?.result?.title ?? 'cannot be found'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${sss?.result?.date ?? 'cannot be found'}
▫️🌎 *Cᴏᴜɴᴛʀʏ :* ${sss?.result?.country ?? 'cannot be found'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.result?.duration ?? 'cannot be found'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.result?.categories?.length > 0 ? data2.result.categories.join(', ') : 'cannot be found'}
▫️🖊️ *Sᴜʙᴛɪᴛʟᴇ Aᴜᴛʜᴏʀ :* ${data2?.result?.subtitle_author ?? 'cannot be found'}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.result?.director?.name ?? 'cannot be found'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.result?.cast?.length > 0 ? data2.result.cast.map(cast => cast.name).join(', ') : 'cannot be found'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Url :* ${q} 
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ARROW-MD*
`;

        const quality = "SD 480p";
        const quality1 = "HD 720p";
        const quality2 = "FHD 1080p";

        const directLink = await PixaldrainDL(q, quality, "direct");
        const directLink1 = await PixaldrainDL(q, quality1, "direct");
        const directLink2 = await PixaldrainDL(q, quality2, "direct");

        let abc = `
🔢 *Please reply the number you want to select*

  🎬 *1 | 480p :* ${directLink ?? 'cannot be found'}
  🎬 *2 | 720p :* ${directLink1 ?? 'cannot be found'}
  🎬 *3 | 1080p :* ${directLink2 ?? 'cannot be found'}

> *POWERED by ARROW-MD*
`;

        await conn.sendMessage(from, { image: { url: data2?.result?.images?.[0] ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek });
        const sentMsg = await conn.sendMessage(from, { text: abc }, { quoted: mek });

        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Message එක reply එකක්ද කියලා බලනවා
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                if (messageType === '1') {
                    await conn.sendMessage(from, { document: { url: directLink }, mimetype: "video/mp4", fileName: `🎬 ARROW-MD 🎬\n${sss?.result?.title ?? 'Movie'}.mkv`, caption: `> ${sss?.result?.title ?? 'Movie'}\n\n> 480p\n\n> *POWERED by ARROW-MD*` }, { quoted: mek });
                } else if (messageType === '2') {
                    await conn.sendMessage(from, { document: { url: directLink1 }, mimetype: "video/mp4", fileName: `🎬 ARROW-MD 🎬\n${sss?.result?.title ?? 'Movie'}.mkv`, caption: `> ${sss?.result?.title ?? 'Movie'}\n\n> 720p\n\n> *POWERED by ARROW-MD*` }, { quoted: mek });
                } else if (messageType === '3') {
                    await conn.sendMessage(from, { document: { url: directLink2 }, mimetype: "video/mp4", fileName: `🎬 ARROW-MD 🎬\n${sss?.result?.title ?? 'Movie'}.mkv`, caption: `> ${sss?.result?.title ?? 'Movie'}\n\n> 1080p\n\n> *POWERED by ARROW-MD*` }, { quoted: mek });
                }
              await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

            }
        });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "download",
    react: "☠️",
    alias: ["dn"],
    desc: "Movie download",
    category: "extra",
    use: '.activate_18+',
    dontAddCommandList: false,
    filename: __filename
},
async(conn, mek, m, { from, q, sender, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        const premiumUsers = await getPremiumUsers();
        
        // User එක premiumද කියලා බැලීම
        const isPreUser = premiumUsers.includes(sender);

        // User එක premium නෙවේ නම්, access deny කරන්න
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

        if (!q) return reply('❗ කරුණාකර download link එකක් ලබා දෙන්න.');

        const data = q.trim();
        const urlRegex = /^(https?:\/\/[^\s]+)/;

        // URL එකේ format එක validate කරනවා
        if (!urlRegex.test(data)) {
            return reply('❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න.');
        }

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        // Document (file) එක යවනවා
        await conn.sendMessage(from, { 
            document: { url: data },
            caption: `\n\n> *POWERED by ARROW-MD*`,
            mimetype: "video/mp4",
            fileName: `💥ARROW-MD💥.mp4`
        });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('❗ Error: ' + e.message);
    }
});

cmd({
    pattern: "downjid",
    react: "✔️",
    alias: ["upmv"],
    desc: "Movie Searcher",
    category: "extra",
    use: '.activate_18+',
    dontAddCommandList : false ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const premiumUsers = await getPremiumUsers();
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }
if ( !m.quoted ) return reply('*ℹ Please mention a Derect Link*')
if ( !q ) return 
const data = q.split(" & ")[0] 
const datas = q.split(" & ")[1] 
 await conn.sendMessage(data, { document : { url : m.quoted.msg  } ,caption: `\n${datas}\n\n> *POWERED by ARROW-MD*`  ,mimetype: "video/mp4" , fileName: `🎬 ARROW-MD 🎬\n${datas}.mp4` } )
		} catch (e) {
reply('❗ Error' + e )
l(e)
}
})

//===============??????????///??=-;#-#7#/2?#=#--2=


















































































//*#*#8#-#8#?#(#






























cmd({
    pattern: "cinesubz",
    alias: ["cz"],
    desc: "Check bot setting.",
    react: "🎬",
    category: "extra",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

        const config = await readEnv();
        const data = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/search?q=${q}&apikey=asitha2005`)

        // Check if the search returned any results
        if (data.data.data.datalength === 0) {
            return reply("🚫 No movies found for your search query.");
        }

        // Create buttons for each movie found in the search results
        let buttons = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Movie :)',
                sections: [{
                    title: 'Please select one',
                    rows: data.data.data.data.map(data => ({
                        title: `${data.title}`,
                        id: `${config.PREFIX}mdc ${data.link}`
                    }))
                }]
            })
        }];

        let message = {
            header: '```📽️CINESUBZ.CO MOVIE® & TV-SHOWS®📽️```',
            footer: '> *POWERED by ARROW-MD*',
            body: `*📌 Select Your Movie*`,
            image: `https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg`
        };

        return conn.sendButtonMessage(from, buttons, m, message);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "mdc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }
	    const configs = await readEnv();

        if (q.includes("https://cinesubz.co/tvshows")) {

		const tvdata2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/tvshow?url=${q}&apikey=asitha2005`)
		let episodes = tvdata2.data.data.episodesDetails.flatMap(season =>
           season.episodes.map(episode => ({
                 title: `${episode.number} - ${episode.title}`,
                 link: episode.url
    }))
);

let buttons = [{
    name: "single_select",
    buttonParamsJson: JSON.stringify({
        title: 'Select One Episode :)',
        sections: [{
            title: 'Please select one',
            rows: episodes.map(episode => ({
                title: `${episode.title}`,
                id: `${configs.PREFIX}mddc ${episode.link} & ${episode.title}`
            }))
        }]
    })
}];
	let message = {
            header: '```📽️CINESUBZ.CO TV-SHOWS®📽️```',
            footer: '> *POWERED by ARROW-MD*',
            body: `*📌 Select Your Episode*`,
        };

		let ccd = `
*📽️CINESUBZ.CO TV-SHOWS®📽️*

☘️ *Tɪᴛʟᴇ :* ${tvdata2?.data?.data?.mainDetails?.maintitle ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${tvdata2?.data?.data?.mainDetails?.dateCreated ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${tvdata2?.data?.data?.mainDetails?.genres?.length > 0 ? tvdata2.data.data.mainDetails.genres.join(', ') : (tvdata2?.data?.data.moviedata?.tags?.length > 0 ? tvdata2.data.data.moviedata.tags.join(', ') : 'Null')}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${tvdata2?.data?.data?.castDetails?.cast?.length > 0 ? tvdata2.data.data.castDetails.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ASITHA-MD*
`;

         await conn.sendMessage(from, { image: { url: tvdata2?.data?.data.mainDetails?.imageUrl?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: ccd }, { quoted: mek }); 
      return conn.sendButtonMessage(from, buttons, m, message);
	
	}

if (q.includes("https://cinesubz.co/movies")) {
        const config = await readEnv();
        const data2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/movie?url=${q}&apikey=asitha2005`)

        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values දෙනවා
        let cc = `
*📽️CINESUBZ.CO MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${data2?.data?.data?.moviedata?.title ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.data?.data?.mainDetails?.dateCreated ?? 'Null'}
▫️🌎 *Cᴏᴜɴᴛʀʏ :* ${data2?.data?.data?.mainDetails?.country ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.data?.data?.mainDetails?.runtime ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.data?.data?.moviedata?.genres?.length > 0 ? data2.data.data.moviedata.genres.join(', ') : (data2?.data?.data.moviedata?.tags?.length > 0 ? data2.data.data.moviedata.tags.join(', ') : 'Null')}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.data?.data?.moviedata?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.data?.data?.moviedata?.cast?.length > 0 ? data2.data.data.moviedata.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VatlhKF5vKAI4qzFSU3c
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ARROW-MD*
`;

const link = data2.data.data.dllinks.directDownloadLinks.map(directDownloadLink => directDownloadLink.link)
const _1080 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[2]}&apikey=asitha2005`)
const _720 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[1]}&apikey=asitha2005`)
const _480 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[0]}&apikey=asitha2005`)
	
const links = _480.data.data[0].href
const size = _480.data.data[0].fileSize
const linkss = _720.data.data[0].href
const sizee = _720.data.data[0].fileSize
const linksss = _1080.data.data[0].href
const sizeee = _1080.data.data[0].fileSize
let prefix = config.PREFIX;

let buttonss = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Size 📑',
                sections: [{
                    title: 'Please select one',
                    rows: [{
                     title: `*480p :- ${size}*`,
                     //description: ``,
                     id: `${prefix}dbl ${links} & ${data2?.data?.data?.moviedata?.title ?? 'Null'} & 480p`
                   }, {
                     title: `*720p :- ${sizee}*`,
                    //description: ``,
                     id: `${prefix}dbl ${linkss} & ${data2?.data?.data?.moviedata?.title ?? 'Null'} & 720p`
                  }, {
                     title: `*1080p :- ${sizeee}*`,
                    //description: ``,
                     id: `${prefix}dbl ${linksss} & ${data2?.data?.data?.moviedata?.title ?? 'Null'} & 1080p`
                  }]
                }]
            })
        }];

        let message = {
            header: '```🎥 DOWNLOAD-MOVIE 🎥``` ',
            footer: '> *POWERED by ARROW-MD*',
            body: `*✨ Select Your Size*`
  };

    await conn.sendMessage(from, { image: { url: data2?.data?.data.mainDetails?.imageUrl?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek }); 
    return conn.sendButtonMessage(from, buttonss, m, message);
}
    //await conn.sendMessage(from, { text: `${links},\n\n 720p ${size}\n\n${linkss},\n\n${linksss}`}, { quoted: mek }); 
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});



cmd({
    pattern: "mddc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}
	    const linkk = q.split(" & ")[0]
        const titell = q.split(" & ")[1] 

         const linnk = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/episode?url=${linkk}&apikey=asitha2005`)
          const link = linnk.data.data.dllinks.directDownloadLinks.map(directDownloadLink => directDownloadLink.link)
const _1080 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[2]}&apikey=asitha2005`)
const _720 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[1]}&apikey=asitha2005`)
const _480 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[0]}&apikey=asitha2005`)

const config = await readEnv();
const links = _480.data?.data[0]?.href ?? 'Null'
const size = _480.data?.data[0]?.fileSize ?? 'Null'
const linkss = _720.data?.data[0]?.href ?? 'Null'
const sizee = _720.data?.data[0]?.fileSize ?? 'Null'
const linksss = _1080.data?.data[0]?.href ?? 'Null'
const sizeee = _1080.data?.data[0]?.fileSize ?? 'Null'
let prefix = config.PREFIX;

let buttonsss = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Size 📑',
                sections: [{
                    title: 'Please select one',
                    rows: [{
                     title: `*480p :- ${size}*`,
                     //description: ``,
                     id: `${prefix}dbl ${links} & ${titell} & 480p`
                   }, {
                     title: `*720p :- ${sizee}*`,
                    //description: ``,
                     id: `${prefix}dbl ${linkss} &  ${titell} & 720p`
                  }, {
                     title: `*1080p :- ${sizeee}*`,
                    //description: ``,
                     id: `${prefix}dbl ${linksss} & ${titell} & 1080p`
                  }]
                }]
            })
        }];

        let message = {
            header: '```🎥 DOWNLOAD-TV-SHOWS® 🎥``` ',
            footer: '> *POWERED by ARROW-MD*',
            body: `*✨ Select Your Size*`
  };
	   return conn.sendButtonMessage(from, buttonsss, m, message); 


	    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "dbl",
    react: "⬇️",
    filename: __filename
},
async(conn, mek, m, { from, q, sender, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        const premiumUsers = await getPremiumUsers();
        
        // User එක premiumද කියලා බැලීම
        const isPreUser = premiumUsers.includes(sender);

        // User එක premium නෙවේ නම්, access deny කරන්න
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }
        const link = q.split(" & ")[0]
        const titel = q.split(" & ")[1] 
        const si = q.split(" & ")[2]     

        if (!link) return reply('❗ කරුණාකර download link එකක් ලබා දෙන්න.');

        const urlRegex = /^(https?:\/\/[^\s]+)/;

        // URL එකේ format එක validate කරනවා
        if (!urlRegex.test(link)) {
            return reply('❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න.');
        }

        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        // Document (file) එක යවනවා
        await conn.sendMessage(from, { 
            document: { url: link },
            caption: `\n*${titel}*\n\n> *${si}*\n\n> *POWERED by ARROW-MD*`,
            mimetype: "video/mp4",
            fileName: `🎬 ARROW-MD 🎬${titel}.mp4`
        });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('❗ Error: ' + e.message);
    }
});





//==========





cmd({
    pattern: "forward",
    desc: "forward msgs",
    alias: ["fo"],
    category: "owner",
    use: '.forward < Jid address >',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

if (!isOwner) {
	return reply("*Owner Only ❌*")}
	
if (!q || !m.quoted) {
reply("*give me message ❌*")
}



let p;
let message = {}

            message.key = mek.quoted?.fakeObj?.key;

            if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
            
		let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype

const mimeType = require('mime-types');
let ext = mimeType.extension(mime);		    

                mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = (p ? p : mek.quoted.documentWithCaptionMessage.message.documentMessage.caption) + "." + ext;
            }

            message.message = mek.quoted;
const mass =  await conn.forwardMessage(q, message, true)
return reply(`*Message forwarded to:*\n\n ${q}`)
            
})





cmd({
    pattern: "firemovieshub",
    alias: ["fh"],
    desc: "Check bot setting.",
    react: "🎬",
    category: "extra",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

        const config = await readEnv();
        const data = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/search?text=${q}`)

        // Check if the search returned any results
        if (data.result && data.result.length > 0) {
            return reply("🚫 No movies found for your search query.");
        }

        // Create buttons for each movie found in the search results
        let buttons = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Movie :)',
                sections: [{
                    title: 'Please select one',
                    rows: data.result.data.map(data => ({
                        title: `${data.title}`,
                        id: `${config.PREFIX}fdc ${data.link}`
                    }))
                }]
            })
        }];

        let message = {
            header: '```📽️MOVIE.HUB MOVIE® & TV-SHOWS®📽️```',
            footer: '> *POWERED by ARROW-MD*',
            body: `*📌 Select Your Movie*`,
            image: `https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg`
        };

        return conn.sendButtonMessage(from, buttons, m, message);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});



cmd({
    pattern: "fdc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

if (q.includes("https://firemovieshub.com/tvshows")) {
                const configs = await readEnv();
		const tvdata2 = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/tvshow?url=${q}`)
let buttonns = [{
    name: "single_select",
    buttonParamsJson: JSON.stringify({
        title: 'Select One Episode :)',
        sections: [{
            title: 'Please select one',
            rows: tvdata2.result.data.episodes.map(episode => ({
                title: `${episode.number}  ${episode.name}`,
                id: `${configs.PREFIX}mbddc ${episode.link} & ${episode.name}`
            }))
        }]
    })
}];
	let message = {
            header: '```📽️MOVIE.HUB TV-SHOWS®📽️```',
            footer: '> *POWERED by ARROW-MD*',
            body: `*📌 Select Your Episode*`,
        };

		let cc = `
*📽️MOVIE.HUB TV-SHOWS®📽️*

☘️ *Tɪᴛʟᴇ :* ${tvdata2?.result?.data?.title ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${tvdata2?.result?.data?.date ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${tvdata2?.result?.data?.duration ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${tvdata2?.result?.data?.category?.length > 0 ? tvdata2.result.data.category.join(', ') : 'Null'}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${tvdata2?.result?.data?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${tvdata2?.result?.data?.cast?.length > 0 ? tvdata2.result.data.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VatlhKF5vKAI4qzFSU3c
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ARROW-MD*
`;

         await conn.sendMessage(from, { image: { url: tvdata2?.result?.data?.mainImage?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek }); 
      return conn.sendButtonMessage(from, buttonns, m, message);
	
	}





if (q.includes("https://firemovieshub.com/movies")) {
	    
	    const configss = await readEnv();
        const data2 = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/movie?url=${q}`)

        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values දෙනවා
        let cc = `
*📽️MOVIE.HUB MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${data2?.result?.data?.title ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.result?.data?.date ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.result?.data?.duration ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.result?.data?.category?.length > 0 ? data2.result.data.category.join(', ') : 'Null'}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.result?.data?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.result?.data?.cast?.length > 0 ? data2.result.data.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VatlhKF5vKAI4qzFSU3c
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ARROW-MD*
`;

let buttonssss = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Movie :)',
                sections: [{
                    title: 'Please select one',
                    rows: data2.result.data.dl_links.map(dl_links => ({
                        title: `${dl_links.quality} ${dl_links.size}`,
                        id: `${configss.PREFIX}dbl ${dl_links.link} & ${data2?.result?.data?.title ?? 'Null'} & ${dl_links.quality}`
                    }))
                }]
            })
        }];

        let message = {
            header: '```🎥 DOWNLOAD-MOVIE 🎥``` ',
            footer: '> *POWERED by ARROW-MD*',
            body: `*✨ Select Your Size*`
  };

    await conn.sendMessage(from, { image: { url: data2?.result?.data?.mainImage?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek }); 
    return conn.sendButtonMessage(from, buttonssss, m, message);
    //await conn.sendMessage(from, { text: `${links},\n\n 720p ${size}\n\n${linkss},\n\n${linksss}`}, { quoted: mek }); 
    }} catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
cmd({

    pattern: "mbddc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}
	    const linkk = q.split(" & ")[0]
        const titell = q.split(" & ")[1] 
const configss = await readEnv();
         const linnk = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/episode?url=${linkk}`)

         let buttonnssss = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: 'Select One Movie :)',
                sections: [{
                    title: 'Please select one',
                    rows: linnk.result.data.dl_links.map(dl_links => ({
                        title: `${dl_links.quality} ${dl_links.size}`,
                        id: `${configss.PREFIX}dbl ${dl_links.link} & ${titell} & ${dl_links.quality}`
                    }))
                }]
            })
        }];

        let message = {
            header: '```🎥 DOWNLOAD-TV-SHOWS 🎥``` ',
            footer: '> *POWERED by ARROW-MD*',
            body: `*✨ Select Your Size*`
  };

    return conn.sendButtonMessage(from, buttonnssss, m, message);
    //await conn.sendMessage(from, { text: `${links},\n\n 720p ${size}\n\n${linkss},\n\n${linksss}`}, { quoted: mek }); 
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }})
	
