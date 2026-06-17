import axios from "axios"

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(
            `💖 Usage:\n${usedPrefix + command} <name or message>\n\nExample:\n${usedPrefix + command} Sakura`
        )
    }

    await m.reply("💭 Generating waifu response...")

    try {
        // AI Prompt (you can customize personality here)
        const prompt = `
You are a cute anime waifu AI.
Respond in a sweet, affectionate, slightly playful anime style.
Keep responses short (1-3 sentences).
Do not generate sexual or explicit content.

User input: ${text}
Reply as a waifu:
        `.trim()

        // Example API (replace with your own AI endpoint if needed)
        const res = await axios.post("https://api.nekolabs.web.id/ai/chatbot", {
            text: prompt
        })

        let reply =
            res?.data?.result ||
            res?.data?.answer ||
            "I'm sorry, I couldn't think of anything cute to say..."

        const output = `
💖 *Waifu AI Response*

🌸 ${reply}
`.trim()

        await m.reply(output)

    } catch (e) {
        console.error(e)
        m.reply("❌ Waifu AI failed to respond. Try again later.")
    }
}

handler.help = ["waifuai <text>"]
handler.tags = ["ai", "fun"]
handler.command = /^waifuai$/i

export default handler