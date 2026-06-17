let handler = async (m, { conn, text }) => {

    // Input validation
    if (!text) {
        return m.reply(
            '❌ Please enter text.\nExample: .copilot Explain Mars'
        )
    }

    try {

        // Loading reaction
        await conn.sendMessage(
            m.chat,
            {
                react: {
                    text: '⏳',
                    key: m.key
                }
            }
        )

        // API request
        const res = await fetch(
            `https://api.nekolabs.web.id/ai/copilot?text=` +
            encodeURIComponent(text)
        )

        // HTTP check
        if (!res.ok) {
            throw new Error(
                `HTTP Error ${res.status}`
            )
        }

        const json = await res.json()

        // API response validation
        if (!json.success) {
            throw new Error(
                json.error || 'API request failed'
            )
        }

        // Send result
        await conn.sendMessage(
            m.chat,
            {
                text: json.result
            },
            { quoted: m }
        )

    } catch (e) {

        console.error(e)

        await m.reply(
            `❌ Error occurred: ${e.message}`
        )

    }
}

handler.help = ['copilot']
handler.tags = ['ai']
handler.command = /^(copilot)$/i
handler.register = true

export default handler