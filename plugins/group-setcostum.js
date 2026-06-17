let handler = async (m, { usedPrefix, command, text, conn }) => {
    if (!m.isGroup) return m.reply("❌ Group only command.")

    const templates = {
        setwelcome: 'sWelcome',
        setbye: 'sBye',
        setpromote: 'sPromote',
        setdemote: 'sDemote'
    }

    let key = templates[command]
    if (!key) return

    let chat = global.db.data.chats[m.chat]

    if (!text) {
        return m.reply(
`❌ Missing template text!

📌 Example:
${usedPrefix + command} Hi @user, welcome to @subject

🧠 Variables:
• @user    = Mention user
• @subject = Group name
• @desc    = Group description

⚡ Tip: You can mix emojis + text freely`
        )
    }

    // =========================
    // SMART PREVIEW ENGINE
    // =========================
    let preview = text
        .replace(/@user/g, '@263xxx')
        .replace(/@subject/g, 'My Group')
        .replace(/@desc/g, 'This is group description')

    chat[key] = text

    await m.reply(
`✅ *TEMPLATE SAVED*

📦 Type: ${command.replace('set', '').toUpperCase()}

📝 Original:
${text}

👀 Preview:
${preview}`
    )
}

handler.help = [
    'setwelcome <text>',
    'setbye <text>',
    'setpromote <text>',
    'setdemote <text>'
]

handler.tags = ['group']
handler.command = /^(setwelcome|setbye|setpromote|setdemote)$/i

handler.group = true
handler.admin = true

export default handler