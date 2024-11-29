const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://i.ibb.co/SR76mBh/Pu3-ZYHBS5139.jpg' },
    { key: 'ALIVE_MSG', value: 'ʜᴇʟʟᴏ , ɪ ᴀᴍ ᴀʟɪᴠᴇ ɴᴏᴡ ɪᴍ QUEEN_AHINSA-MD ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ QUEEN_AHINSA-MD},
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'MODE', value: 'public' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_STICKER', value: 'true' },
    { key: 'AUTO_REPLY', value: 'true' },
    { key: 'ANTI_LINK', value: 'true' },
    { key: 'ANTI_BAD', value: 'true' },
    { key: 'RECORDING', value: 'true' },
    { key: 'READ_CMD', value: 'true' },
    { key: 'ANTI_DELETE', value: 'true' },
    { key: 'ALLWAYS_OFFLINE', value: 'true' },
    { key: 'AUTO_REACT', value: 'true' },

];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 ᴍᴏɴɢᴏᴅʙ ᴄᴏɴɴᴇᴄᴛᴇᴅ ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
