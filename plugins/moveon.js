/*
💀 Move On AI 2.0
Type: Emotional AI Simulation Plugin
Engine: Local sentiment logic + user memory state
Powered by: Watson-XD Multi-Device System
*/

const userDB = global.moveonDB || (global.moveonDB = new Map())

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

function detectMood(text = "") {
    text = text.toLowerCase()

    const sadWords = ["miss", "love", "alone", "cry", "hurt", "pain", "lonely", "sad"]
    const happyWords = ["happy", "move on", "ok", "fine", "good", "better", "strong"]

    let score = 0

    sadWords.forEach(w => {
        if (text.includes(w)) score -= 8
    })

    happyWords.forEach(w => {
        if (text.includes(w)) score += 6
    })

    return score
}

function bar(v) {
    let filled = Math.floor(v / 10)
    return "█".repeat(filled) + "░".repeat(10 - filled)
}

let handler = async (m, { conn, text }) => {

    let user = m.sender

    if (!userDB.has(user)) {
        userDB.set(user, {
            heartbreak: Math.floor(Math.random() * 50) + 30,
            lastUpdate: Date.now()
        })
    }

    let data = userDB.get(user)

    let moodImpact = detectMood(text || "")

    data.heartbreak += Math.floor(Math.random() * 10)
    data.heartbreak -= moodImpact

    if (Math.random() < 0.35) {
        data.heartbreak += 12
    }

    if (data.heartbreak > 100) data.heartbreak = 100
    if (data.heartbreak < 0) data.heartbreak = 0

    userDB.set(user, data)

    const steps = [
        "🧠 AI Emotion Engine activated...",
        "💬 Analyzing message sentiment...",
        "💔 Scanning emotional memory database...",
        "📊 Calculating heartbreak index...",
        "🔄 Syncing emotional state...",
        "💾 Updating psychological profile..."
    ]

    for (let s of steps) {
        await sleep(1000)
        await conn.sendMessage(m.chat, { text: s }, { quoted: m })
    }

    let status =
        data.heartbreak > 75
            ? "💀 EXTREME EMOTIONAL DAMAGE"
            : data.heartbreak > 50
            ? "💔 HIGH EMOTIONAL PRESSURE"
            : data.heartbreak > 20
            ? "🙂 STABILIZING"
            : "✨ EMOTIONALLY FREE"

    let advice =
        data.heartbreak > 75
            ? "Stop checking memories. You are looping emotionally."
            : data.heartbreak > 50
            ? "You are healing but still attached."
            : data.heartbreak > 20
            ? "You are improving. Keep going."
            : "You are finally free from emotional burden."

    let msg =
`
💀 *MOVE ON AI REPORT v2.0*

📊 Heartbreak Level: ${data.heartbreak}%
[${bar(data.heartbreak)}]

📌 Status: ${status}

🧠 AI Advice:
${advice}

⚡ Powered by Watson-XD Multi-Device System
`

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m })
}

handler.help = ["moveon"]
handler.tags = ["fun"]
handler.command = /^moveon$/i

export default handler