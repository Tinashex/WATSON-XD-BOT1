import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        throw `uhm.. where is the text?\n\nusage:\n${usedPrefix + command} <text>\n\nexample:\n${usedPrefix + command} plugins/file.js`
    }

    if (!m.quoted?.text) throw `Please reply to a message!`

    let path = `./plugins/${text}.js`

    fs.writeFileSync(path, m.quoted.text)

    m.reply(`Saved to ${path}`)
}

handler.help = ['sfp <text>']
handler.tags = ['owner']
handler.command = /^sfp$/i
handler.owner = true

export default handler