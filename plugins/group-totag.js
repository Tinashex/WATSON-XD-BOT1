let handler = async (m, { conn, text, participants }) => {

    if (!m.isGroup) return m.reply('❌ This command can only be used in groups.')
    if (!m.quoted) return m.reply('❌ Reply to a message first.')

    let users = participants
        .map(u => u.id)
        .filter(v => v !== conn.user.jid)

    let total = users.length

    await conn.sendMessage(m.chat, {
        forward: m.quoted.fakeObj,
        mentions: users,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                title: '📢 GROUP ANNOUNCEMENT',
                body: `Mentioning ${total} members`,
                thumbnailUrl: 'https://files.catbox.moe/8lk6xx.jpg',
                sourceUrl: 'https://whatsapp.com',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    })

}

handler.help = ['totag']
handler.tags = ['group']
handler.command = /^(totag|tag|hidetag)$/i

handler.admin = true
handler.group = true

export default handler