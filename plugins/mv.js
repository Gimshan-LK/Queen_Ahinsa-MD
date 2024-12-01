const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require('axios')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { storenumrepdata } = require('../lib/nonbutton')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


cmd({
    pattern: "sd2",
    react: "🎥",
    desc: "Download movie for sinhalasub.lk",
    category: "download",
    use: '.sinhalasub < Movie Name >',
    filename: __filename
},
    
async(conn, mek, m,{from, prefix, quoted, q, reply}) => {
try{

if(!q) return await reply('Mv name plz')
	
const oka_tama_prashne = await fetchJson(`https://dark-yasiya-api-new.vercel.app/movie/sinhalasub/search?text=${q}`)
let hi_patiyo = oka_tama_prashne.result.data
let numrep = []
  
		
              let pakaya = `MOVIE-SEARCH
`
	
	                hi_patiyo.forEach((movie, htta) => {
				
                  pakaya += ` *${formatNumber( htta + 1)} ||* ${movie.title}\n\n`
				
                  numrep.push(`${prefix}mds ${movie.link}` )
                  })	      
  
	
	 const mass = await conn.sendMessage(from, { image: { url: `https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg`  }, caption: `${pakaya}\n\n` }, { quoted: mek });
	
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
