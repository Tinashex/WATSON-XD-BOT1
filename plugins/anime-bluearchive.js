import fetch from "node-fetch"

let handler = async (m, { conn, command }) => {

    try {

        // Fetch image buffer directly
        const res = await fetch("https://api.siputzx.my.id/api/r/blue-archive")

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`)
        }

        const buffer = await res.buffer()

        await conn.sendMessage(
            m.chat,
            {
                image: buffer,
                caption:
`🎀 *Random Blue Archive Waifu*

Tap the button below to get another waifu 🔁`,
                buttons: [
                    {
                        buttonId: `.${command}`,
                        buttonText: { displayText: "🔁 Next Waifu" },
                        type: 1
                    }
                ]
            },
            { quoted: m }
        )

    } catch (err) {

        console.error("Blue Archive Error:", err)

        m.reply(
`❌ Failed to load waifu.
Please try again later.`
        )
    }
}

handler.help = ["bluearchive"]
handler.tags = ["anime", "random"]
handler.command = /^bluearchive$/i
handler.limit = true

export default handler