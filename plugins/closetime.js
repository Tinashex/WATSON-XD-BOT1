let handler = async (m, { conn, text, args, command }) => {

    if (!m.isGroup) return m.reply(mess.group)

    // Convert time units to milliseconds
    const unit = args[1]?.toLowerCase()
    let timer
    switch (unit) {
        case 'seconds':
            timer = args[0] * 1000
            break
        case 'minutes':
            timer = args[0] * 60000
            break
        case 'hours':
            timer = args[0] * 3600000
            break
        case 'days':
            timer = args[0] * 86400000
            break
        default:
            return m.reply(`[❗] Invalid command\n/${command} 10 seconds`)
    }

    if (command === 'closetime') {
        m.reply(`Close time ${text} starts now`)
        setTimeout(() => {
            const closeMessage = `📢 *The group has been automatically closed. Only admins can send messages in the group*`
            conn.groupSettingUpdate(m.chat, 'announcement')
            m.reply(closeMessage)
        }, timer)
    } else if (command === 'opentime') {
        m.reply(`Open time ${text} starts now`)
        setTimeout(() => {
            const openMessage = `📢 *The group has been automatically reopened. All participants can send messages in the group*`
            conn.groupSettingUpdate(m.chat, 'not_announcement')
            m.reply(openMessage)
        }, timer)
    }
}

handler.help = handler.command = ["closetime","opentime"]
handler.tags = ['group']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler