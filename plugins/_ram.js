import os from 'os';

let handler = async (m, { conn }) => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    
    // Helper to format bytes
    const formatSize = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';

    const cpu = os.cpus()[0];
    const uptime = os.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    let message = `
╭━━〔 🤖 ʙᴏᴛ sᴘᴇᴄɪғɪᴄᴀᴛɪᴏɴs 〕━━⬣
┃ 💻 *OS*: ${os.type()} (${os.release()})
┃ ⏳ *Uptime*: ${days}d ${hours}h ${minutes}m
┃
┃ 🧠 *RAM Usage*
┃ 📊 *Total*: ${formatSize(totalMem)}
┃ 📉 *Used*: ${formatSize(usedMem)}
┃ 🟢 *Free*: ${formatSize(freeMem)}
┃
┃ ⚙️ *CPU Details*
┃ 🔢 *Model*: ${cpu.model}
┃ ⚡ *Speed*: ${cpu.speed / 1000} GHz
┃ 🖥️ *Cores*: ${os.cpus().length}
╰━━━━━━━━━━━━━━━━━━⬣`.trim();

    m.reply(message);
}

handler.help = ['botspec'];
handler.tags = ['tools'];
handler.command = /^(botspec|ram|stats)$/i;

export default handler;
