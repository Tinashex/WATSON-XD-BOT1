let handler = async (m, { conn, text, participants, isAdmin, isBotAdmin }) => {
    if (!m.isGroup) return m.reply("❌ Group only command.")
    if (!isAdmin) return m.reply("❌ Admin only command.")
    if (!isBotAdmin) return m.reply("❌ Bot must be admin.")

    let user =
        m.quoted?.sender ||
        m.mentionedJid?.[0] ||
        (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : '')

    if (!user) return m.reply("⚠️ Reply / tag / input number to promote.")

    // Safe participant check
    let isMember = participants.some(p => p.id === user || p.jid === user)

    if (!isMember) {
        return m.reply("❌ Target is not in this group.")
    }

    try {
        await conn.groupParticipantsUpdate(m.chat, [user], "promote")

        let tag = '@' + user.split('@')[0]

        await conn.sendMessage(m.chat, {
            text: `👑 *PROMOTION SUCCESS*\n\n${tag} has been promoted to admin.`,
            mentions: [user]
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply("❌ Failed to promote user.")
    }
}

handler.help = ['promote']
handler.tags = ['group']
handler.command = /^(promote)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler