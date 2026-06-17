let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) {
        throw 'Don’t run with: node main.js\nUse: node index.js'
    }

    // Only allow if running from main bot instance
    if (global.conn.user.jid !== conn.user.jid) {
        throw '_restart blocked: wrong connection instance_'
    }

    try {
        await m.reply('```R E S T A R T I N G . . .```')

        // Optional: log restart reason
        console.log('[SYSTEM] Restart requested by:', m.sender)
        if (text) console.log('[SYSTEM] Reason:', text)

        // Save database if available
        if (global.db?.write) {
            await global.db.write()
            console.log('[SYSTEM] Database saved before restart.')
        }

        // Graceful shutdown delay
        setTimeout(() => {
            process.send('reset')
        }, 1500)

    } catch (err) {
        console.error('[RESTART ERROR]', err)
        await m.reply('❌ Restart failed. Check console logs.')
    }
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i
handler.owner = true

export default handler