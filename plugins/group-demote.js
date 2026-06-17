let handler = async (m, { conn, text, participants }) => {
    const user =
        m.quoted?.sender ||
        (m.mentionedJid && m.mentionedJid[0]) ||
        (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : '')

    if (!user) {
        return m.reply('❌ Reply or tag the user you want to demote.')
    }

    const isInGroup = participants.some(p => p.id === user)

    if (!isInGroup) {
        return m.reply('❌ The target is not in this group.')
    }

    try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
        m.reply(`✅ Successfully demoted @${user.split('@')[0]}`, null, {
            mentions: [user]
        })
    } catch (e) {
        console.error(e)
        m.reply('❌ Failed to demote user.')
    }
}

handler.help = ['demote1']
handler.tags = ['group']
handler.command = /^(demote1|unadmin1)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler