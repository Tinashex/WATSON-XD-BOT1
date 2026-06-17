let handler = async (m, { conn, text }) => {

    let who

    if (m.isGroup) {
        who = m.mentionedJid?.[0] || (m.quoted && m.quoted.sender) || text
    } else {
        who = m.chat
    }

    if (!who) throw '❌ Tag or reply to a user!'

    let number = who.split('@')[0]

    if (!/^\d+$/.test(number)) throw '❌ Invalid phone number!'

    // Check if already owner
    if (global.owner.some(v => v[0] === number)) {
        throw '⚠️ This user is already an owner!'
    }

    // Add owner (format: [number, name, isCreator])
    global.owner.push([number, '', true])

    await conn.sendMessage(m.chat, {
        text: `👑 *OWNER ADDED*\n\n@${number} is now an owner!`,
        mentions: [who]
    }, { quoted: m })

}

handler.help = ['addowner']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)owner$/i
handler.owner = true

export default handler