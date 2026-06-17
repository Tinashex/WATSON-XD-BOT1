import fs from 'fs';
import path from 'path';
import axios from 'axios';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text) return m.reply(`*Example*: ${usedPrefix}${command} https://gist.github.com/user/raw/plugin.js`);
    
    // Ensure the URL is valid
    if (!text.startsWith('http')) return m.reply('Please provide a valid URL to the raw .js file.');

    try {
        m.reply('*Downloading plugin...*');
        const { data } = await axios.get(text);
        
        // Extract filename from URL or use a default
        const fileName = text.split('/').pop().replace('.js', '') + '.js';
        const targetPath = path.join(process.cwd(), 'plugins', fileName);

        // Security check: Reject if file contains malicious keywords
        const maliciousKeywords = ['fs.unlinkSync', 'eval(', 'child_process'];
        if (maliciousKeywords.some(keyword => data.includes(keyword))) {
            return m.reply('⚠️ *Security Alert*: This plugin contains potentially malicious code and was blocked.');
        }

        // Save the file
        fs.writeFileSync(targetPath, data);
        
        m.reply(`✅ *Success*: Plugin *${fileName}* has been installed.`);
    } catch (e) {
        console.error(e);
        m.reply(`❌ *Error*: Failed to install plugin. ${e.message}`);
    }
}

handler.help = ['install <url>'];
handler.tags = ['owner'];
handler.command = /^(install|addplugin)$/i;
handler.owner = true; // Only allow you as the owner to use this

export default handler;
