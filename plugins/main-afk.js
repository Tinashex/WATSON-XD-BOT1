let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender]

    user.afk = Date.now()
    user.afkReason = text || ''

    let name = conn.getName(m.sender)

    let caption = `
╭━━━〔 🌙 AFK MODE ACTIVATED 〕━━━╮
┃ 👤 User: ${name}
┃ 🕒 Time: ${new Date().toLocaleTimeString()}
┃ 💬 Reason: ${text || 'No reason provided'}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

> I am now marked as AFK.
> Mention me and the bot will notify others.
`.trim()

    m.reply(caption)
}

handler.help = ['afk <reason>']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler