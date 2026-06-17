let handler = async (m, { usedPrefix, command, conn, text }) => {
    try {
        let totalUsers = Object.keys(global.db.data.users).length
        let registeredUsers = Object.values(global.db.data.users)
            .filter(user => user.registered === true).length

        let premiumUsers = Object.values(global.db.data.users)
            .filter(user => user.premium).length

        let bannedUsers = Object.values(global.db.data.users)
            .filter(user => user.banned).length

        let uptime = clockString(process.uptime() * 1000)

        let txt = `
╭━━━〔 📊 USER DATABASE STATUS 〕━━━╮

│ 👥 Total Users      : ${totalUsers}
│ ✅ Registered       : ${registeredUsers}
│ 💎 Premium Users    : ${premiumUsers}
│ 🚫 Banned Users     : ${bannedUsers}
│ ⏳ Bot Uptime       : ${uptime}

╰━━━━━━━━━━━━━━━━━━━━━━╯

📌 *Database Information*
• Registered users are users who have completed registration.
• Premium users have access to exclusive features.
• Banned users are restricted from using the bot.

🔍 Use:
${usedPrefix}listpremium
${usedPrefix}totalfitur
${usedPrefix}os
`.trim()

        await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                externalAdReply: {
                    title: global.namebot || 'WATSON-XD-BOT',
                    body: 'Enterprise Database System',
                    thumbnailUrl: 'https://files.catbox.moe/8k3m6p.jpg',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('❌ Failed to retrieve database statistics.')
    }
}

handler.help = ['totaluser']
handler.tags = ['info']
handler.command = /^(pengguna|(jumlah)?database|totaluser|dbstats)$/i

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60

    return [h, m, s]
        .map(v => v.toString().padStart(2, 0))
        .join(':')
}