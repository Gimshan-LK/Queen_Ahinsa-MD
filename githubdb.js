const fetch = require('node-fetch');
const axios = require('axios');
const config = require('../config')

// Replace these with your GitHub credentials
const userName = config.GITHUB_USERNAME;
const token = config.GITHUB_AUTH_TOKEN;
const repoName = 'Queen_Ahinsa-MD-DB';

// Function to fetch data from GitHub API
async function githubApiRequest(url, method = 'GET', data = {}) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${userName}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET' || method === 'HEAD') {
      // Remove the body property for GET and HEAD requests
      delete options.body;
    } else {
      // For other methods (POST, PUT, DELETE, etc.), add the JSON.stringify data to the request body
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API request failed: ${error.message}`);
  }
}


async function checkRepoAvailability() {
  try {
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`;
const headers = {
  Authorization: `Bearer ${token}`,
};

    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      return true
    } else {
     return false
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false
    } else {
      console.error('Error:', error.message);
    }
  }
}


// 1. Function to search GitHub file
async function githubSearchFile(filePath, fileName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const data = await githubApiRequest(url);
  return data.find((file) => file.name === fileName);
}

// 2. Function to create a new GitHub file
async function githubCreateNewFile(filePath, fileName, content) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new file: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
  };
  return await githubApiRequest(url, 'PUT', data);
}

// 3. Function to delete a GitHub file
async function githubDeleteFile(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Delete file: ${fileName}`,
    sha: file.sha,
  };
  await githubApiRequest(url, 'DELETE', data);
}

// 4. Function to get GitHub file content
async function githubGetFileContent(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = file.download_url;
  const response = await fetch(url);
  return await response.text();
}

// 5. Function to clear GitHub file content and add new content
async function githubClearAndWriteFile(filePath, fileName, content) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) {
    await githubCreateNewFile(fileName, content);
  } else {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
    const data = {
      message: `Modify file: ${fileName}`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    };
    return await githubApiRequest(url, 'PUT', data);
  }
}

// 6. Function to delete an existing GitHub file and upload a new one
async function githubDeleteAndUploadFile(fileName, newContent) {
  await githubDeleteFile(fileName);
  await githubCreateNewFile(fileName, newContent);
}

//========================================
async function updateCMDStore(MsgID , CmdID) {
try { 
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
olds.push({[MsgID]:CmdID})
var add = await githubClearAndWriteFile('Non-Btn','data.json',JSON.stringify(olds, null, 2))
return true
} catch (e) {
console.log( e)
return false
}
}

async function isbtnID(MsgID){
try{
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
if(foundData) return true
else return false
} catch(e){
return false
}
}

async function getCMDStore(MsgID) {
try { 
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
return foundData
} catch (e) {
console.log( e)
return false
}
} 

function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

const connectdb = async () => {
let availabilityrepo = await checkRepoAvailability()
if(!availabilityrepo){
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repoName,
        private: true, // Set to true for a private repo
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
let get = {
PREFIX: ".",
ALIVE_IMG: "https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg",
ALIVE_MSG: "*Hello , I am alive now!!*",
AUTO_READ_STATUS: "true",
MODE: "public",
AUTO_VOICE: "true",
AUTO_REPLY: "true",
AUTO_STICKER: "true",
ANTI_BAD: "true",
ANTI_LINK: "true",
ANTI_BOT: "true",
ALLWAYS_OFFLINE: "false",
READ_CMD: "true",
RECORDING: "true",
AUTO_REACT: "true"
}
let get2 = []
  
await githubCreateNewFile("settings", "settings.json",JSON.stringify(get))
await githubCreateNewFile("Non-Btn", "data.json",JSON.stringify(get2))
console.log(`Database "${repoName}" created successfully 🛢️`);
}
else if(availabilityrepo) {
  
 let get = {
PREFIX: ".",
ALIVE_IMG: "https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg",
ALIVE_MSG: "*Hello , I am alive now!!*",
AUTO_READ_STATUS: "true",
MODE: "public",
AUTO_VOICE: "true",
AUTO_REPLY: "true",
AUTO_STICKER: "true",
ANTI_BAD: "true",
ANTI_LINK: "true",
ANTI_BOT: "true",
ALLWAYS_OFFLINE: "false",
READ_CMD: "true",
RECORDING: "true",
AUTO_REACT: "true"
}
let get2 = []

await githubCreateNewFile("Non-Btn", "data.json",JSON.stringify(get2))
await githubCreateNewFile("settings", "settings.json",JSON.stringify(get)) 
console.log("Database connected 🛢️")
}};
//=====================================================================
async function input(setting, data){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
if (setting == "PREFIX") {
get.PREFIX = data
config.PREFIX = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ALIVE_IMG") {
get.ALIVE_IMG = data
config.ALIVE_IMG = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ALIVE_MSG") {
get.ALIVE_MSG = data
config.ALIVE_MSG = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_READ_STATUS") {
get.AUTO_READ_STATUS = data
config.AUTO_READ_STATUS = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "MODE") {
get.MODE = data
config.MODE = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_VOICE") {
get.AUTO_VOICE = data
config.AUTO_VOICE = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_REPLY") {
get.AUTO_REPLY = data
config.AUTO_REPLY = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_STICKER") {
get.AUTO_STICKER = data
config.AUTO_STICKER = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_LINK") {
get.ANTI_LINK = data
config.ANTI_LINK = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ALLWAYS_OFFLINE") {
get.ALLWAYS_OFFLINE = data
config.ALLWAYS_OFFLINE = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "READ_CMD") {
get.READ_CMD = data
config.READ_CMD = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "RECORDING") {
get.RECORDING = data
config.RECORDING = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_REACT") {
get.AUTO_REACT = data
config.AUTO_REACT = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_BOT") {
get.ANTI_BOT = data
config.ANTI_BOT = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_BAD") {
get.ANTI_BAD = data
config.ANTI_BAD = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
}

}

async function get(setting){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
if (setting == "PREFIX") {
return get.PREFIX
} else if (setting == "ALIVE_IMG") {
return get.ALIVE_IMG
} else if (setting == "ALIVE_MSG") {
return get.ALIVE_MSG
} else if (setting == "AUTO_READ_STATUS") {
return get.AUTO_READ_STATUS
} else if (setting == "MODE") {
return get.MODE
} else if (setting == "AUTO_VOICE") {
return get.AUTO_VOICE
} else if (setting == "AUTO_REPLY") {
return get.AUTO_REPLY
} else if (setting == "AUTO_STICKER") {
return get.AUTO_STICKER
} else if (setting == "ALLWAYS_OFFLINE") {
return get.ALLWAYS_OFFLINE
} else if (setting == "READ_CMD") {
return get.READ_CMD
} else if (setting == "RECORDING") {
return get.RECORDING
} else if (setting == "AUTO_REACT") {
return get.AUTO_REACT
} else if (setting == "ANTI_BOT") {
return get.ANTI_BOT
} else if (setting == "ANTI_BAD") {
return get.ANTI_BAD
} else if (setting == "ANTI_LINK") {
return get.ANTI_LINK
}  

}

async function updb(){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
config.PREFIX = get.PREFIX
config.ALIVE_IMG = get.ALIVE_IMG
config.ALIVE_MSG = get.ALIVE_MSG
config.AUTO_READ_STATUS = get.AUTO_READ_STATUS
config.MODE = get.MODE
config.AUTO_VOICE = get.AUTO_VOICE
config.AUTO_REPLY = get.AUTO_REPLY
config.AUTO_STICKER = get.AUTO_STICKER
config.ALLWAYS_OFFLINE = get.ALLWAYS_OFFLINE
config.READ_CMD = get.READ_CMD
config.RECORDING = get.RECORDING
config.AUTO_REACT = get.AUTO_REACT
config.ANTI_BOT = get.ANTI_BOT
config.ANTI_BAD = get.ANTI_BAD
config.ANTI_LINK = get.ANTI_LINK
  
console.log("Database writed ✅")
}

async function updfb(){
let get = {
PREFIX: ".",
ALIVE_IMG: "https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg",
ALIVE_MSG: "*Hello , I am alive now!!*",
AUTO_READ_STATUS: "true",
MODE: "public",
AUTO_VOICE: "true",
AUTO_REPLY: "true",
AUTO_STICKER: "true",
ANTI_BAD: "true",
ANTI_LINK: "true",
ANTI_BOT: "true",
ALLWAYS_OFFLINE: "false",
READ_CMD: "true",
RECORDING: "true",
AUTO_REACT: "true"
}
await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
config.PREFIX = "."
config.ALIVE_IMG = "https://i.ibb.co/DLDD8Zy/73a9c4e2ea3c4cf1.jpg"
config.ALIVE_MSG = "*Hello , I am alive now!!*"
config.AUTO_READ_STATUS = "true"
config.MODE = "public"
config.AUTO_VOICE = "true"
config.AUTO_REPLY = "true"
config.AUTO_STICKER = "true"
config.ANTI_BAD = "true"
config.ANTI_LINK = "true"
config.ANTI_BOT = "true"
config.ALLWAYS_OFFLINE = "false"
config.READ_CMD = "true"
config.RECORDING = "true"
config.AUTO_REACT = "true"
  
console.log("Database writed ✅")
}

module.exports = { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb }
