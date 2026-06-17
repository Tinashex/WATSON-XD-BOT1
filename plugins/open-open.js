import moment from 'moment-timezone'
import schedule from 'node-schedule'

const timeZone = 'Asia/Jakarta'

let handler = async (m, { conn, command, args, isOwner, isAdmin }) => {

    if (!m.isGroup) throw '❌ This command is only for groups!'
    if (!(isAdmin || isOwner)) throw '❌ Admin only command!'

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}

    const type = (args[0] || '').toLowerCase()

    // ENABLE AUTO GROUP
    if (command === 'aktif' && type === 'autogc') {

        if (!args[1]) {
            return m.reply(
`❌ Format wrong!
Example:
.aktif autogc 21|5`
            )
        }

        let [closeTime, openTime] = args[1].split('|').map(v => parseInt(v))

        if (isNaN(closeTime) || isNaN(openTime)) {
            throw '❌ Time must be numbers!'
        }

        chat.autoGc = {
            closeTime,
            openTime,
            lastAction: null
        }

        return m.reply(
`✅ Auto Group enabled

🔒 Close: ${closeTime}:00
🔓 Open : ${openTime}:00`
        )
    }

    // DISABLE AUTO GROUP
    if (command === 'mati' && type === 'autogc') {
        delete chat.autoGc
        return m.reply('❌ Auto Group disabled.')
    }

    m.reply('Usage:\n.aktif autogc 21|5\n.mati autogc')
}

handler.command = /^(aktif|mati)$/i
handler.help = [
    'aktif autogc 21|5',
    'mati autogc'
]
handler.tags = ['group']
handler.admin = true
handler.group = true

export default handler

// =====================
// AUTO SCHEDULER ENGINE
// =====================

const checkGroupsStatus = async (conn) => {
    const nowHour = moment().tz(timeZone).hour()

    for (const chatId in global.db.data.chats) {

        const chat = global.db.data.chats[chatId]
        if (!chat?.autoGc) continue

        const { closeTime, openTime, lastAction } = chat.autoGc

        // CLOSE GROUP
        if (nowHour === closeTime && lastAction !== 'closed') {
            try {
                await conn.groupSettingUpdate(chatId, 'announcement')
                await conn.sendMessage(chatId, {
                    text: `🔒 *AUTO GROUP SYSTEM*\n\nGroup is now CLOSED\nWill open at ${openTime}:00`
                })

                chat.autoGc.lastAction = 'closed'
            } catch (e) {
                console.log('AutoGC Close Error:', e)
            }
        }

        // OPEN GROUP
        if (nowHour === openTime && lastAction !== 'opened') {
            try {
                await conn.groupSettingUpdate(chatId, 'not_announcement')
                await conn.sendMessage(chatId, {
                    text: `🔓 *AUTO GROUP SYSTEM*\n\nGroup is now OPEN\nWill close at ${closeTime}:00`
                })

                chat.autoGc.lastAction = 'opened'
            } catch (e) {
                console.log('AutoGC Open Error:', e)
            }
        }
    }
}

// run every minute
schedule.scheduleJob('* * * * *', () => {
    if (global.conn) {
        checkGroupsStatus(global.conn)
    }
})