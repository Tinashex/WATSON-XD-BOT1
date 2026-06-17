/*
Fitur Yts
Note : fast version, can be upgraded to .play
Request feature: tag me
https://chat.whatsapp.com/KxRm9Sb1HC7DniozVhqtvh?mode=hqrt1
*/

import axios from "axios"

const handler = async (m, { conn, usedPrefix, command, text }) => {

    try {

        // Input validation
        if (!text) {
            return conn.sendMessage(
                m.chat,
                {
                    text: `Please enter a question.\nExample: *${usedPrefix + command} who are you*`
                },
                { quoted: m }
            )
        }

        // Loading message
        const loading = await conn.sendMessage(
            m.chat,
            {
                text: "Asking Copilot..."
            },
            { quoted: m }
        )

        // API request
        const url =
            `https://api.yupra.my.id/api/ai/copilot?text=` +
            encodeURIComponent(text)

        const { data } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Linux; Android 10; YPBot)"
            }
        })

        // Validate API response
        if (!data?.status) {
            throw new Error("API Error")
        }

        const answer =
            data.result || "No answer available."

        // Edit previous message with result
        await conn.sendMessage(
            m.chat,
            {
                text: answer,
                edit: loading.key
            }
        )

    } catch (e) {

        console.error(e)

        await conn.sendMessage(
            m.chat,
            {
                text: "Failed to process your request."
            },
            { quoted: m }
        )
    }
}

handler.help = ["copilot2"]
handler.tags = ["ai"]
handler.command = /^copilot2$/i

export default handler