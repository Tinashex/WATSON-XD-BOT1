import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {

    const dir = process.cwd()
    const files = []
    const errors = []

    // 🔍 recursive scan
    const scan = (folder) => {
        const entries = fs.readdirSync(folder, { withFileTypes: true })

        for (let entry of entries) {
            const full = path.join(folder, entry.name)

            if (entry.isDirectory()) {
                if (entry.name !== 'node_modules') scan(full)
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                files.push(full)
            }
        }
    }

    scan(dir)

    let ok = 0

    for (let file of files) {
        try {
            await new Promise((resolve, reject) => {
                exec(`node --check "${file}"`, (err) => {
                    if (err) reject(err)
                    else resolve()
                })
            })

            ok++

        } catch (e) {
            errors.push({
                file: path.relative(dir, file),
                error: e.message.split('\n')[0]
            })
        }
    }

    let msg = `📂 *CODE ERROR SCANNER*\n\n`

    if (errors.length === 0) {
        msg += `✅ No errors found!\n`
    } else {
        for (let e of errors) {
            msg += `❌ ${e.file}\n   ↳ ${e.error}\n\n`
        }
    }

    msg += `📊 Total Files: ${files.length}\n`
    msg += `✅ OK: ${ok}\n`
    msg += `❌ Errors: ${errors.length}`

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m })
}

handler.help = ['checkerror']
handler.tags = ['owner']
handler.command = /^(checkerror)$/i
handler.owner = true

export default handler