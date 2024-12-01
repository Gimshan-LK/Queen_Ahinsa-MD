
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')
const axios = require('axios')
const {readEnv} = require('../lib/database')


cmd({
  pattern: "menu",
  react: "🚨",
  alias: ["panel","list","commands"],
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
const config = await readEnv();
  
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
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
            url: "https://github.com/Koyeb-LK/Queen_Ahinsa-MD",
            merchant_url: "https://github.com/Koyeb-LK/Queen_Ahinsa-MD"
        }),},
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Select A Category :)',                        
            sections: [{                            
              title: 'Please select a category',
              highlight_label: '𝙰𝚁𝚁𝙾𝚆-𝙼𝙳',
                  rows: [{
                     title: 'DOWNLOAD MENU 📥',
                     //description: ``,
                     id: prefix + `downmenu`
                  }, {
                     title: 'MAIN MENU 🎀',
                    //description: ``,
                     id: prefix + `mainmenu`
                  }, {
                     title: 'MOVIE MENU 🎬',
                    //description: ``,
                     id: prefix + `extra`
                  }, {
                     title: 'SEARCH MENU 🔎',
                     //description: ``,
                     id: prefix + `searchmenu`
                  }, {
                     title: 'CONVERT MENU 🌀',
                     //description: ``,
                     id: prefix + `convertmenu`
                  }, {
                     title: 'GROUP MENU 🎩',
                     //description: ``,
                     id: prefix + `groupmenu`
                  }, {
                     title: 'OTHER MENU 👾',
                     //description: ``,
                     id: prefix + `othermenu`
                  }, {
                     title: 'OWNER MENU 👨‍💻',
                     //description: ``,
                     id: prefix + `ownermenu`
                  }, {
                     title: 'AI MENU 👨‍🔧',
                     //description: ``,
                     id: prefix + `aimenu`
                  }, {
                    title: 'FUN MENU 👨‍🔧',
                    //description: ``,
                    id: prefix + `funmenu`
                 }]
               }]
            })
         }]
  
let msg = `
*☠️ Queen_Ahinsa-MD ☠ -  LIST MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
`

let message = {
                    image: LOGO,
                    header: HEADER,
                    footer: FOOTER,
                    body: msg

                }
return conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "downmenu",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
  
let menuc = `*╭──────────●●►*
*│⚜️ DOWNLOAD MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc +=  `*│●►* ${commands[i].pattern}\n`
}}};
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
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
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO ,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "extra",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
  
let menuc = `*╭──────────●●►*
*│⚜️ MOVIE DOWNLOAD MENU 🎬*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'extra'){
  if(!commands[i].dontAddCommandList){
menuc +=  `*│●►* ${commands[i].pattern}\n`
}}};
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
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
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO ,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "searchmenu",
    react: "🔎",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menuc = `*╭──────────●●►*
*│⚜️ SEARCH MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `*│●►* ${commands[i].pattern}\n`
}}};
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
  let HEADER = ownerdata.header;
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
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})


cmd({
    pattern: "convertmenu",
    react: "",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menuc = `*╭──────────●●►*
*│⚜️ CONVERT MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
menuc += `*│●►* ${commands[i].pattern}\n`
}}};
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
  let HEADER = ownerdata.header;
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
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})


cmd({
    pattern: "othermenu",
    react: "👾",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menuc = `*╭──────────●●►*
*│⚜️ OTHER MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
if(!commands[i].dontAddCommandList){
menuc += `*│●►* ${commands[i].pattern}\n`
}}};
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
  let HEADER = ownerdata.header;
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
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
  pattern: "ownermenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menuc = `*╭──────────●●►*
*│⚜️ OWNER MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
if(!commands[i].dontAddCommandList){
menuc += `*│●►* ${commands[i].pattern}\n`
}}};
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
  let HEADER = ownerdata.header;
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
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
  pattern: "aimenu",
  react: "👨‍🔧",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menuc = `*╭──────────●●►*
*│⚜️ AI MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'ai'){
if(!commands[i].dontAddCommandList){
menuc += `*│●►* *${commands[i].pattern}*\n `
}}};
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
  let HEADER = ownerdata.header;
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
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"

                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
  pattern: "groupmenu",
  react: "🎩",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menuc = `*╭──────────●●►*
*│⚜️ GROUP MENU*
*│   ───────*\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
menuc += `*│●►* ${commands[i].pattern}\n`
}}};
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl; 
  let HEADER = ownerdata.header;
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
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SYSTEM INFORMATION",
                    id: prefix + "system"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                     display_text: "PING",
                      id: prefix + "ping"
                })
            }
            ]
            let message = {
                image: LOGO,
                header: HEADER,
                footer: FOOTER,
                body: menuc

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "mainmenu",
    react: "🎀",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  const config = await readEnv();
  let menuc = `*╭──────────●●►*
*│⚜️ MAIN MENU*
*│   ───────*\n`
  for (let i=0;i<commands.length;i++) { 
  if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){
  menuc += `*│●►* ${commands[i].pattern}\n`
  }}};
  const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
              let LOGO = ownerdata.imageurl;
              let BTN = ownerdata.button;
              let FOOTER = ownerdata.footer;
              let BTNURL = ownerdata.buttonurl; 
    let HEADER = ownerdata.header;
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
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                      display_text: "SYSTEM INFORMATION",
                      id: prefix + "system"
                  }),
              },
              {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                      display_text: "PING",
                      id: prefix + "ping"
                  })
              }
              ]
              let message = {
                  image: LOGO,
                  header: HEADER,
                  footer: FOOTER,
                  body: menuc
  
              }
              return await conn.sendButtonMessage(from, buttons, m, message)
  } catch (e) {
  const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
  await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
  console.log(e)
  reply(msr.replyMsg.erro)
  }
  })

  cmd({
    pattern: "funmenu",
    react: "🎈",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
 const config = await readEnv(); 
  let menuc = `*╭──────────●●►*
*│⚜️ FUN MENU*
*│   ───────*\n`
  for (let i=0;i<commands.length;i++) { 
  if(commands[i].category === 'fun'){
  if(!commands[i].dontAddCommandList){
  menuc += `*│●►* ${commands[i].pattern}\n`
  }}};
  const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
              let LOGO = ownerdata.imageurl;
              let BTN = ownerdata.button;
              let FOOTER = ownerdata.footer;
              let BTNURL = ownerdata.buttonurl; 
    let HEADER = ownerdata.header;
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
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                      display_text: "SYSTEM INFORMATION",
                      id: prefix + "system"
                  }),
              },
              {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                      display_text: "PING",
                      id: prefix + "ping"
                  })
              }
              ]
              let message = {
                  image: LOGO,
                  header: HEADER,
                  footer: FOOTER,
                  body: menuc
  
              }
              return await conn.sendButtonMessage(from, buttons, m, message)
  } catch (e) {
  const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
  await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
  console.log(e)
  reply(msr.replyMsg.erro)
  }
  })
