let handler = async (m, { conn, text }) => {

    // Input validation
    if (!text) {
        return m.reply(
            '❌ Please enter text.\nExample: .ripleai Hello'
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
        let res = await fetch(
            `https://api.nekolabs.web.id/ai/ripleai?text=` +
            encodeURIComponent(text)
        )

        // HTTP validation
        if (!res.ok) {
            throw new Error(
                `HTTP Status ${res.status}`
            )
        }

        let json = await res.json()

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

handler.help = ['ripleai']
handler.tags = ['ai']
handler.command = /^(ripleai)$/i
handler.register = false

export default handler