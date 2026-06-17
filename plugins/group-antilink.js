let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    try {
        if (!m.isGroup) return true
        if (m.fromMe || m.isBaileys) return true
        if (isAdmin) return true

        const chat = global.db.data.chats[m.chat]

        // =========================
        // INIT SECURITY ENGINE
        // =========================
        if (!chat.security) {
            chat.security = {
                antiLink: true,
                antiSpam: true,
                antiBot: true,
                antiRaid: true,
                lockdown: false,
                whitelist: ["youtube.com", "github.com"],
                maxWarn: 5
            }
        }

        if (!chat.users) chat.users = {}

        const userId = m.sender
        const text = m.text || ""
        const now = Date.now()

        if (!chat.users[userId]) {
            chat.users[userId] = {
                warn: 0,
                spam: 0,
                risk: 0,
                lastMsg: 0,
                lastText: "",
                joins: 0,
                lastJoin: 0
            }
        }

        const user = chat.users[userId]

        // =========================
        // 🔒 LOCKDOWN MODE
        // =========================
        if (chat.security.lockdown) {
            if (!isAdmin) {
                return await conn.sendMessage(m.chat, {
                    delete: m.key
                })
            }
        }

        // =========================
        // 🧠 RISK DECAY SYSTEM
        // =========================
        if (now - user.lastMsg > 300000) {
            user.spam = 0
            user.lastText = ""
            user.risk = Math.max(0, user.risk - 5)
        }

        user.lastMsg = now

        // =========================
        // 🚨 ANTI-SPAM ENGINE
        // =========================
        if (chat.security.antiSpam) {
            if (now - user.lastMsg < 2000) {
                user.spam++
                user.risk += 3
            } else {
                user.spam = 0
            }

            if (user.spam >= 5) {
                user.warn++
                user.risk += 10
                user.spam = 0

                await m.reply(
                    `⚠️ *ANTI-SPAM ALERT*\n\n` +
                    `User: @${userId.split("@")[0]}\n` +
                    `Warning: ${user.warn}/${chat.security.maxWarn}\n` +
                    `Risk Score: ${user.risk}`,
                    null,
                    { mentions: [userId] }
                )
            }
        }

        // =========================
        // 🤖 ANTI-BOT (REPEAT DETECTION)
        // =========================
        if (chat.security.antiBot) {
            if (text && text === user.lastText) {
                user.warn++
                user.risk += 8
            }
            user.lastText = text
        }

        // =========================
        // 🔗 ANTI-LINK (SMART FILTER)
        // =========================
        if (chat.security.antiLink) {
            const linkRegex = /https?:\/\/[^\s]+/gi
            const links = text.match(linkRegex)

            if (links) {
                const blocked = links.filter(l =>
                    !chat.security.whitelist.some(w => l.includes(w))
                )

                if (blocked.length > 0) {
                    user.warn++
                    user.risk += 12

                    await m.reply(
                        `🔗 *LINK DETECTED*\n\n` +
                        `User: @${userId.split("@")[0]}\n` +
                        `Risk increased!`,
                        null,
                        { mentions: [userId] }
                    )
                }
            }
        }

        // =========================
        // 🚨 ENTERPRISE ACTION ENGINE
        // =========================
        const MAX = chat.security.maxWarn

        if (user.warn >= MAX || user.risk >= 80) {
            if (!isBotAdmin) return

            await m.reply(
                `🚫 *ENTERPRISE SECURITY ACTION*\n\n` +
                `User: @${userId.split("@")[0]}\n` +
                `Status: REMOVED\n` +
                `Reason: High risk behavior`,
                null,
                { mentions: [userId] }
            )

            await conn.groupParticipantsUpdate(m.chat, [userId], "remove")

            chat.users[userId] = {
                warn: 0,
                spam: 0,
                risk: 0,
                lastMsg: 0,
                lastText: "",
                joins: 0,
                lastJoin: 0
            }
        }

    } catch (e) {
        console.log("ENTERPRISE SECURITY ERROR:", e)
    }

    return true
}

handler.help = ['enterprise-security']
handler.tags = ['group']
handler.command = /^(enterprise|securitypro)$/i

export default handler