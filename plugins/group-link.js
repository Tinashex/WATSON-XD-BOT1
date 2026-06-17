let handler = async (m) => {
m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
}
handler.help = ['link']
handler.tags = ['group']
handler.command = /^(link)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler