let lastMessageTime = new Map()
let spamCount = new Map()

export async function before(m, { conn }) {
    try {
        const chat = global.db.data.chats[m.chat]
        if (!chat || !chat.antiVirtex) return

        if (!m.text) return

        let user = m.sender

        // ===== VIRTEXT PATTERN CHECK =====
        const virtexPatterns = [
            /﻿/g, // zero width char spam
            /࣯|ࣰ|ࣱ|ࣲ|ࣳ/g, // unicode crash chars
            /(.*\n){50,}/, // huge line spam
            /[\u200B-\u200D\uFEFF]/g // invisible spam
        ]

        let isVirtex = virtexPatterns.some(p => p.test(m.text))

        if (isVirtex) {
            await conn.sendMessage(m.chat, {
                text: `🚨 *ANTI-VIRTEX BLOCKED*\n\n@${user.split('@')[0]} sent a dangerous message.`,
                mentions: [user]
            })

            await conn.groupParticipantsUpdate(m.chat, [user], "remove")
            return true
        }

        // ===== FLOOD CONTROL =====
        let now = Date.now()
        let last = lastMessageTime.get(user) || 0

        if (now - last < 2000) {
            let count = spamCount.get(user) || 0
            count++

            spamCount.set(user, count)

            if (count >= 5) {
                await conn.sendMessage(m.chat, {
                    text: `⚠️ *ANTI-SPAM TRIGGERED*\nUser removed for flooding.`
                })

                await conn.groupParticipantsUpdate(m.chat, [user], "remove")

                spamCount.delete(user)
                lastMessageTime.delete(user)
                return true
            }
        } else {
            spamCount.set(user, 0)
        }

        lastMessageTime.set(user, now)

    } catch (e) {
        console.error("AntiVirtex Error:", e)
    }
}

export const disabled = false