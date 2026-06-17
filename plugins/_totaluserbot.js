const handler = async (m, { conn }) => {

    const chat = db.data.chats[m.chat]

    // Initialize total bot users
    if (!chat.totalUserBot) {
        chat.totalUserBot = {}
    }

    const participantCounts = chat.totalUserBot

    // Sort users by message count
    const sortedData = Object.entries(participantCounts)
        .sort((a, b) => b[1] - a[1])

    // Total messages
    const totalMessages = sortedData.reduce(
        (sum, [, count]) => sum + count,
        0
    )

    // Total users
    const totalUsers = sortedData.length

    // User list
    const messageList = sortedData
        .map(
            ([jid, count], i) =>
                `*${i + 1}.* ${jid.replace(
                    /(\d+)@.+/,
                    '@$1'
                )}: *${count}* messages`
        )
        .join('\n')

    // Final response
    const responseMessage =
`📊 *Total Messages Sent Using the Bot*: *${totalMessages}* messages from *${totalUsers}* users

${messageList}`

    // Send reply
    await m.reply(responseMessage)
}

handler.help = ['totaluserbot']

handler.tags = ['group']

handler.command = /^(totaluserbot)$/i

handler.group = true

// Message counter
handler.before = function (m) {

    // Only work in groups
    if (!m.isGroup) return false

    const chat = db.data.chats[m.chat]

    // Initialize database
    if (!chat.totalUserBot) {
        chat.totalUserBot = {}
    }

    if (!chat.lastResetUserBot) {
        chat.lastResetUserBot = 0
    }

    const now = Date.now()

    const THIRTY_DAYS =
        30 * 24 * 60 * 60 * 1000

    // Reset data every 30 days
    if (
        now - chat.lastResetUserBot >
        THIRTY_DAYS
    ) {

        chat.totalUserBot = {}

        chat.lastResetUserBot = now
    }

    // Count user messages
    const user = m.sender

    chat.totalUserBot[user] =
        (chat.totalUserBot[user] || 0) + 1
}

export default handler