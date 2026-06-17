let handler = async (m, { conn, groupMetadata }) => {
    let groupId = m.chat
    let groupName = groupMetadata.subject

    conn.reply(
        m.chat,
        `📌 *GROUP INFO*

🆔 ID: ${groupId}
🏷️ Name: ${groupName}`,
        m
    )
}

handler.help = ['checkid']
handler.tags = ['group']
handler.command = /^(checkid|idgc|gcid)$/i
handler.group = true

export default handler