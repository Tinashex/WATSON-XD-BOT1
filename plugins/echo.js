// 📌 Example plugin template
import { join } from 'path'
import { readdirSync, rmSync, existsSync } from 'fs'

let handler = async (m, { conn, __dirname, args }) => {
    try {
        // React to the command
        if (m.key) {
            await conn.sendMessage(m.chat, {
                react: { text: '✅', key: m.key }
            })
        }

        // Your plugin logic goes here
        // Example: simple echo plugin
        if (args.length === 0) {
            return await m.reply('Please provide some text to echo!')
        }

        const text = args.join(' ')
        await m.reply(`You said: ${text}`)

    } catch (err) {
        console.error(err)
        await m.reply(`❌ Plugin failed:\n${err.message}`)
    }
}

// Plugin metadata
handler.help = ['echo']
handler.tags = ['fun']  // You can categorize: owner, admin, fun, tools, etc.
handler.command = /^(echo)$/i  // Regex for command
handler.rowner = false  // true if only owner can run

export default handler