let handler = async (m, { conn, text, usedPrefix, command }) => {

    // Input validation
    if (!text) {
        return conn.sendMessage(
            m.chat,
            {
                text:
`💬 Please send a question for AI.

Example:
${usedPrefix + command} Hello`
            },
            { quoted: m }
        )
    }

    // Loading message
    await conn.sendMessage(
        m.chat,
        {
            text: '⏳ Processing AI request...'
        },
        { quoted: m }
    )

    try {

        // 60 seconds timeout controller
        let controller = new AbortController()
        let timeout = setTimeout(
            () => controller.abort(),
            60000
        )

        // API request
        let res = await fetch(
            'https://api.nekolabs.web.id/ai/ai4chat/chat?text=' +
            encodeURIComponent(text),
            {
                signal: controller.signal
            }
        )

        clearTimeout(timeout)

        // HTTP validation
        if (!res.ok) {
            throw new Error(
                `API failed with status ${res.status}`
            )
        }

        let json = await res.json()

        // Response validation
        if (!json.success || !json.result) {
            throw new Error(
                'AI did not return a valid response'
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

        await conn.sendMessage(
            m.chat,
            {
                text:
`❌ API failed to respond. Please try again later.

Error: ${e.message}`
            },
            { quoted: m }
        )
    }
}

handler.help = ['ai']
handler.tags = ['ai']
handler.command = /^ai$/i
handler.limit = true

export default handler