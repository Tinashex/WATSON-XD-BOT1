import fs from 'fs'
import path from 'path'

let handler = async (m) => {
    let pluginFolder = './plugins'
    let errorList = []

    if (!fs.existsSync(pluginFolder)) {
        return m.reply('❌ *plugins* folder not found!')
    }

    let files = fs.readdirSync(pluginFolder)
        .filter(file => file.endsWith('.js'))

    for (let file of files) {
        try {
            await import(
                `file://${path.resolve(pluginFolder, file)}?update=${Date.now()}`
            )
        } catch (err) {
            let msg = err.message || String(err)

            if (/export default/i.test(msg)) continue

            errorList.push(`❏ ${file}\n${msg}`)
        }
    }

    if (!errorList.length) {
        return m.reply(`
 check error 

❏ status:
all features are safe, no errors found
`.trim())
    }

    m.reply(`
 check error 

❏ total errors:
${errorList.length} problematic plugins

❏ error list:

${errorList.join('\n\n')}
`.trim())
}

handler.help = ['checkerror']
handler.tags = ['owner']
handler.command = /^(checkerror|cekeror)$/i
handler.rowner = true

export default handler