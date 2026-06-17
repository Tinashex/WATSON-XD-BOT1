let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!m.isGroup) return m.reply("❌ Group only command.")
    if (!isAdmin) return m.reply("❌ Admin only command.")
    if (!isBotAdmin) return m.reply("❌ Bot must be admin.")

    try {
        // revoke old invite code
        let code = await conn.groupRevokeInvite(m.chat)

        let link = `https://chat.whatsapp.com/${code}`

        await conn.sendMessage(m.chat, {
            text:
`🔁 *GROUP INVITE RESET*

✅ New Invite Link:
${link}

⚠️ Old link has been disabled.`,
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply("❌ Failed to reset group invite link.")
    }
}

handler.help = ['revoke']
handler.tags = ['group']
handler.command = /^(revoke|resetlink)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler