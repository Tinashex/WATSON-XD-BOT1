let handler = async (m, { conn, args, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat]

    if (!args[0]) {
        return m.reply(
`⚙️ *AUTO GROUP SETTINGS*

Status: ${chat.autogroup ? "ON" : "OFF"}

Commands:
• ${usedPrefix + command} on
• ${usedPrefix + command} off`
        )
    }

    const option = args[0].toLowerCase()

    switch (option) {
        case "on":
            chat.autogroup = true
            return m.reply("✅ Auto Open/Close Group is now *ENABLED*.")

        case "off":
            chat.autogroup = false
            return m.reply("❌ Auto Open/Close Group is now *DISABLED*.")

        default:
            return m.reply(
                `❗ Invalid option.\n\nUse:\n${usedPrefix + command} on/off`
            )
    }
}

handler.help = ['autogroup <on/off>']
handler.tags = ['group']
handler.command = /^autogroup$/i
handler.admin = true
handler.group = true

export default handler