import { tmpdir } from 'os'
import { join } from 'path'
import { readdirSync, rmSync, existsSync } from 'fs'

let handler = async (m, { conn, __dirname }) => {
    try {
        // React to command message
        if (m.key) {
            await conn.sendMessage(m.chat, {
                react: {
                    text: '💯',
                    key: m.key
                }
            })
        }

        let deleted = 0

        // Clean temp directories
        const tempDirs = [
            tmpdir(),
            join(__dirname, '../tmp')
        ]

        for (const dir of tempDirs) {
            try {
                if (!existsSync(dir)) continue

                const files = readdirSync(dir)

                for (const file of files) {
                    const target = join(dir, file)

                    try {
                        rmSync(target, {
                            recursive: true,
                            force: true
                        })
                        deleted++
                    } catch (e) {
                        console.error(`Failed to delete: ${target}`, e)
                    }
                }
            } catch (e) {
                console.error(`Failed reading: ${dir}`, e)
            }
        }

        // Clean sessions except creds.json
        const sessionDir = './sessions'

        if (existsSync(sessionDir)) {
            try {
                const sessionFiles = readdirSync(sessionDir)

                for (const file of sessionFiles) {
                    if (file === 'creds.json') continue

                    try {
                        rmSync(join(sessionDir, file), {
                            recursive: true,
                            force: true
                        })
                        deleted++
                    } catch (e) {
                        console.error(`Failed to delete session file: ${file}`, e)
                    }
                }
            } catch (e) {
                console.error('Session cleanup error:', e)
            }
        }

        await m.reply(
            `✅ Successfully cleaned temporary files and sessions.\n\n🗑️ Deleted: *${deleted}* items`
        )

    } catch (err) {
        console.error(err)

        await m.reply(
            `❌ Cleanup failed:\n${err.message}`
        )
    }
}

handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clearsession)$/i
handler.rowner = true

export default handler