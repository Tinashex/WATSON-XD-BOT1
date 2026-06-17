import axios from "axios"

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply("❌ Please enter text!\nExample: .ustadz don't forget to pray")
    }

    try {
        await m.reply("⏳ The ustadz is speaking...")

        const { data } = await axios.get(
            `https://api.elrayyxml.web.id/api/maker/ustadz?text=${encodeURIComponent(args.join(" "))}`,
            { responseType: "arraybuffer", timeout: 30000 }
        )

        const buffer = Buffer.from(data)

        await conn.sendMessage(
            m.chat,
            {
                image: buffer,
                caption: "✅ Message from the ustadz is ready!"
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("USTADZ ERROR:", err)
        m.reply("❌ Failed to generate ustadz meme.")
    }
}

handler.help = ["ustadz <text>"]
handler.tags = ["islami"]
handler.command = /^ustadz$/i
handler.exp = 3

export default handler