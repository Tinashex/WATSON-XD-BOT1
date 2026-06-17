let handler = async (m, { conn, command }) => {

    let group = m.chat

    // Only works in groups
    if (!m.isGroup) {
        return m.reply('❌ This command can only be used in groups.')
    }

    // Goodbye message
    await m.reply(`
╭━━━〔 👋 EXITING GROUP 〕━━━╮
┃ 🤖 WATSON-XD-BOT signing out...
┃ 🌍 Goodbye everyone!
┃ 💫 Sayonara! (≧ω≦)ゞ
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim())

    // Leave group
    await conn.groupLeave(group)
}

handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i

handler.rowner = true

export default handler