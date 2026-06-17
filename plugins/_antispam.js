/*export async function all(m) {
    if (!m.message) return

    // Database safety
    global.db.data.settings = global.db.data.settings || {}
    global.db.data.users = global.db.data.users || {}

    // Bot settings
    const settings = global.db.data.settings[this.user.jid] || {}

    // Antispam disabled
    if (!settings.antispam) return

    // Ignore owner
    if (global.owner?.some(([num]) => m.sender.includes(num))) return

    // Ignore bot messages
    if (m.isBaileys) return

    // Spam memory
    this.spam = this.spam || {}

    const id = m.sender
    const now = Date.now()

    // Create user data
    if (!this.spam[id]) {
        this.spam[id] = {
            messages: [],
            warned: false
        }
    }

    const user = this.spam[id]

    // Save current message timestamp
    user.messages.push(now)

    // Keep only last 10 minutes
    user.messages = user.messages.filter(
        time => now - time < 10 * 60 * 1000
    )

    // If user sends more than 20 messages in 10 minutes
    if (user.messages.length > 20) {

        // Prevent reply spam
        if (user.warned) return

        user.warned = true

        // Warning message
        await m.reply(
            `⚠️ *ANTI SPAM DETECTED*\n\n` +
            `Please stop sending too many messages.`
        )

        // Optional punishments
        // global.db.data.users[id].banned = true
        // await this.groupParticipantsUpdate(m.chat, [id], 'remove')

        // Reset after 10 minutes
        setTimeout(() => {
            if (this.spam[id]) {
                this.spam[id].messages = []
                this.spam[id].warned = false
            }
        }, 10 * 60 * 1000)
    }
}*/