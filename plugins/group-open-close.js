let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!m.isGroup) return
    if (isAdmin) return

    let chat = global.db.data.chats[m.chat]
    if (!chat.security) chat.security = { warn: {} }
    if (!chat.security.warn[m.sender]) chat.security.warn[m.sender] = 0

    let text = m.text || ""

    // ======================
    // 1. ANTI LINK DETECTION
    // ======================
    const linkRegex = /(https?:\/\/|chat\.whatsapp\.com|wa\.me)/i
    let isLink = linkRegex.test(text)

    // ======================
    // 2. ANTI SPAM (message flood)
    // ======================
    let now = Date.now()
    if (!chat.security.lastMsg) chat.security.lastMsg = {}
    let last = chat.security.lastMsg[m.sender] || 0

    let spam = now - last < 4000 // 4 sec spam threshold

    chat.security.lastMsg[m.sender] = now

    // ======================
    // 3. ANTI BOT (fast join/auto behavior detection)
    // ======================
    let isBotLike = m.isBaileys && !m.fromMe

    // ======================
    // APPLY PUNISHMENT SYSTEM
    // ======================
    if (isLink || spam || isBotLike) {
        chat.security.warn[m.sender] += 1

        let warn = chat.security.warn[m.sender]
        let tag = '@' + m.sender.split('@')[0]

        await m.reply(
            `⚠️ *SECURITY ALERT*\n\n` +
            `User: ${tag}\n` +
            `Warn: ${warn}/5\n` +
            `Reason: ${isLink ? 'Link' : spam ? 'Spam' : 'Bot-like activity'}`
        )

        if (isBotAdmin) await conn.sendMessage(m.chat, { delete: m.key })

        // Auto kick at limit
        if (warn >= 5) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
            chat.security.warn[m.sender] = 0

            await conn.sendMessage(m.chat, {
                text: `🚫 ${tag} removed from group (security limit reached)`,
                mentions: [m.sender]
            })
        }
    }
}

handler.before = true
export default handler
/*let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!m.isGroup) return
    if (isAdmin) return

    let chat = global.db.data.chats[m.chat]

    if (!chat.security) {
        chat.security = {
            level: "MEDIUM",
            users: {},
            lastMsg: {}
        }
    }

    let sec = chat.security
    let user = m.sender
    let text = m.text || ""

    if (!sec.users[user]) {
        sec.users[user] = {
            score: 0,
            warn: 0
        }
    }

    const now = Date.now()

    // =========================
    // CONFIG BY SECURITY LEVEL
    // =========================
    const config = {
        LOW:    { spam: 6000, maxScore: 10 },
        MEDIUM: { spam: 4500, maxScore: 7 },
        HIGH:   { spam: 3000, maxScore: 5 },
        STRICT: { spam: 2000, maxScore: 3 }
    }

    let cfg = config[sec.level] || config.MEDIUM

    // =========================
    // ANTI SPAM DETECTION
    // =========================
    let last = sec.lastMsg[user] || 0
    let spam = (now - last) < cfg.spam
    sec.lastMsg[user] = now

    // =========================
    // ANTI LINK DETECTION
    // =========================
    const linkRegex = /(https?:\/\/|chat\.whatsapp\.com|wa\.me|t\.me)/i
    let link = linkRegex.test(text)

    // =========================
    // ANTI BOT BEHAVIOR
    // =========================
    let botLike = m.isBaileys && !m.fromMe

    // =========================
    // SCORE SYSTEM (PRO LOGIC)
    // =========================
    if (spam) sec.users[user].score += 2
    if (link) sec.users[user].score += 3
    if (botLike) sec.users[user].score += 5

    let score = sec.users[user].score
    let tag = '@' + user.split('@')[0]

    if (score > 0 && (spam || link || botLike)) {
        await m.reply(
            `🛡️ *ENTERPRISE SECURITY v2*\n\n` +
            `User: ${tag}\n` +
            `Score: ${score}/${cfg.maxScore}\n` +
            `Risk: ${score > 5 ? "HIGH" : "MEDIUM"}`
        )
    }

    // =========================
    // AUTO ACTION SYSTEM
    // =========================
    if (score >= cfg.maxScore) {
        sec.users[user].score = 0

        if (isBotAdmin) {
            await conn.groupParticipantsUpdate(m.chat, [user], "remove")
        }

        await conn.sendMessage(m.chat, {
            text: `🚫 ${tag} removed by Enterprise Security v2`,
            mentions: [user]
        })
    }
}

handler.before = true
export default handler*/