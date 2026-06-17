// jpm.js
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(
            `🔧 *JPM (Member Push Service)*\n\n` +
            `Usage:\n` +
            `• ${usedPrefix + command} on <message>\n` +
            `• ${usedPrefix + command} off`
        )
    }

    let opt = args[0].toLowerCase()

    if (opt === 'on') {
        let text = args.slice(1).join(' ')
        if (!text) return m.reply(`❌ Please enter the message to send to all groups.`)

        // Run JPM function
        await jpmSendAllGroups(conn, text)
        return m.reply(`✅ JPM has been executed successfully.`)
    }

    if (opt === 'off') {
        return m.reply('❌ JPM has been disabled.')
    }

    return m.reply(`Invalid format!\nUse: ${usedPrefix + command} <on/off>`)
}

handler.help = ['jpm <on/off>']
handler.tags = ['owner']
handler.command = /^jpm$/i
handler.owner = true

export default handler


// ===== JPM FUNCTION =====
async function jpmSendAllGroups(conn, text) {
    const chats = Object.keys(conn.chats).filter(id => id.endsWith('@g.us'))
    let count = 0

    for (let id of chats) {
        try {
            await conn.sendMessage(id, { text })
            count++
            console.log(`✅ JPM sent to ${id} (${count}/${chats.length})`)

            // 2 second delay per group
            await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (err) {
            console.error(`❌ Failed to send to ${id}:`, err.message)
        }
    }

    console.log(`🎯 JPM completed, total groups sent: ${count}`)
}