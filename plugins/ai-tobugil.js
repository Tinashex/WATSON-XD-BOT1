let handler = async (m, { conn, text, usedPrefix, command }) => {

    // Input validation
    if (!text) {
        return conn.sendMessage(
            m.chat,
            {
                text:
`💬 Please send an image URL.

Example:
${usedPrefix + command} https://example.com/image.jpg`
            },
            { quoted: m }
        )
    }

    // Loading message
    await conn.sendMessage(
        m.chat,
        {
            text: '⏳ Processing image, please wait...'
        },
        { quoted: m }
    )

    try {

        // API request
        const apiUrl =
            'https://api.baguss.xyz/api/edits/tobugil?image=' +
            encodeURIComponent(text)

        const res = await fetch(apiUrl)
        const json = await res.json()

        // API validation
        if (!json.success) {
            return conn.sendMessage(
                m.chat,
                {
                    text:
`❌ API failed to process image.
Message: ${json.message || 'Try again later.'}`
                },
                { quoted: m }
            )
        }

        // Send result URL
        await conn.sendMessage(
            m.chat,
            {
                text:
`✅ Result image URL:

${json.url}`
            },
            { quoted: m }
        )

    } catch (err) {

        console.error(err)

        await conn.sendMessage(
            m.chat,
            {
                text:
`❌ Error occurred: ${err.message}`
            },
            { quoted: m }
        )
    }
}

handler.help = ['tobugil']
handler.tags = ['edits']
handler.command = /^(tobugil)$/i

export default handler