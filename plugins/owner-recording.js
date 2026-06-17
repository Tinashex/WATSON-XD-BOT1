let handler = async (m, { args }) => {
    if (!args[0]) return m.reply(`
Type:
.autorecording on
.autorecording off
    `)

    let input = args[0].toLowerCase()
    if (!['on', 'off'].includes(input)) return m.reply('Use `on` or `off`')

    global.autorecording = input === 'on'
    m.reply(`Auto Recording is now ${global.autorecording ? '✅ ENABLED' : '❌ DISABLED'}`)
}

handler.help = ['autorecording [on/off]']
handler.tags = ['owner']
handler.command = /^autorecording$/i
handler.owner = true

export default handler
