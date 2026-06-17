let handler = async (m, { conn, text, groupMetadata }) => {
    try {
        const user =
            m.quoted?.sender ||
            m.mentionedJid?.[0] ||
            (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : '')

        if (!user) {
            return m.reply('❌ Reply, tag, or enter a valid number to add.')
        }

        const response = await conn.groupParticipantsUpdate(
            m.chat,
            [user],
            'add'
        )

        let pp
        try {
            pp = await conn.profilePictureUrl(m.chat, 'image')
        } catch {
            pp = null
        }

        for (const res of response) {
            const jid = res.jid || user
            const status = res.status

            if (status === 408) {
                await m.reply(
                    `❌ Cannot add @${jid.split('@')[0]}!\nThey may have recently left or been removed.`
                )
            }

            else if (status === 403) {
                const inviteCode = res.content?.content?.[0]?.attrs?.code
                const inviteExp = res.content?.content?.[0]?.attrs?.expiration

                await m.reply(`📩 Sending invite to @${jid.split('@')[0]}...`)

                await conn.sendGroupV4Invite(
                    m.chat,
                    jid,
                    inviteCode,
                    inviteExp,
                    groupMetadata.subject,
                    'You are invited to join this WhatsApp group!',
                    pp
                )
            }

            else if (status === 200) {
                await m.reply(`✅ Successfully added @${jid.split('@')[0]} to the group!`)
            }
        }

    } catch (e) {
        console.error(e)
        m.reply(`❌ Error while adding member:\n${e.message}`)
    }
}

handler.help = ['add <number/@tag>']
handler.tags = ['group']
handler.command = /^(add)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler