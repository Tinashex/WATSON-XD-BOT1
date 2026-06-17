let handler = async (m, { conn, args, usedPrefix }) => {
    if (!m.isGroup) return m.reply("❌ Group only command.")

    let chat = global.db.data.chats[m.chat]

    if (!chat.aiControl) {
        chat.aiControl = {
            mode: "open",
            activity: {},
            riskScore: 0,
            autoLock: false,
            schedule: null
        }
    }

    let ai = chat.aiControl
    let cmd = (args[0] || "").toLowerCase()

    const map = {
        open: "not_announcement",
        unlock: "not_announcement",
        close: "announcement",
        lock: "announcement"
    }

    // =========================
    // AI RISK DETECTION CORE
    // =========================
    let now = Date.now()
    let sender = m.sender

    if (!ai.activity[sender]) {
        ai.activity[sender] = []
    }

    ai.activity[sender].push(now)

    // keep last 10 messages only
    ai.activity[sender] = ai.activity[sender].slice(-10)

    // spam detection (AI logic)
    let spamCount = ai.activity[sender].filter(t => now - t < 5000).length

    if (spamCount >= 5) {
        ai.riskScore += 2
    }

    if (spamCount >= 8) {
        ai.autoLock = true
    }

    // =========================
    // MANUAL CONTROL
    // =========================
    if (cmd) {
        if (!map[cmd]) {
            return m.reply(
`🤖 *AI GROUP CONTROL v3*

📌 Commands:
• ${usedPrefix}group open
• ${usedPrefix}group close
• ${usedPrefix}group lock
• ${usedPrefix}group unlock`
            )
        }

        ai.mode = cmd

        await conn.groupSettingUpdate(m.chat, map[cmd])

        return m.reply(
`⚙️ *GROUP MODE UPDATED*

📡 Mode: ${cmd.toUpperCase()}
🧠 AI Risk Score: ${ai.riskScore}`
        )
    }

    // =========================
    // AI AUTO ACTION SYSTEM
    // =========================
    if (ai.autoLock && ai.mode !== "close") {
        ai.mode = "close"

        await conn.groupSettingUpdate(m.chat, "announcement")

        await conn.sendMessage(m.chat, {
            text:
`🚨 *AI EMERGENCY LOCK*

Reason: High spam activity detected
Risk Score: ${ai.riskScore}

🔒 Group has been automatically locked.`
        })

        return
    }

    // =========================
    // STATUS PANEL
    // =========================
    m.reply(
`🤖 *AI GROUP CONTROL v3 STATUS*

🔓 Mode: ${ai.mode.toUpperCase()}
📊 Risk Score: ${ai.riskScore}
⚠️ Auto Lock: ${ai.autoLock ? "ACTIVE" : "OFF"}

📌 System:
• Spam detection active
• Activity monitoring ON`
    )
}

handler.help = ['group']
handler.tags = ['group']
handler.command = /^(group)$/i

handler.admin = true
handler.botAdmin = true

export default handler