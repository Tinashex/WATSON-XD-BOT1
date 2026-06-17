import { deepinfra } from './ai-deepseek.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    // Get input from quoted message or direct text
    const input = m.quoted ? m.quoted.text : text

    if (!input) {
        return m.reply(
`Please enter a question or command!

Example:
${usedPrefix + command} what is AI`
        )
    }

    // Initialize memory
    if (!conn.kimi) conn.kimi = {}
    if (!conn.kimi[m.sender]) conn.kimi[m.sender] = []

    // Store user message
    conn.kimi[m.sender].push({
        role: 'user',
        content: input
    })

    try {

        // Call Kimi model via DeepInfra
        const res = await deepinfra(
            'moonshotai/Kimi-K2-Instruct-0905',
            conn.kimi[m.sender]
        )

        // Store assistant response
        conn.kimi[m.sender].push({
            role: 'assistant',
            content: res
        })

        // Send reply
        m.reply(res)

    } catch (err) {

        console.error(err)

        m.reply('An error occurred while processing your request.')
    }
}

handler.help = ['kimi']
handler.tags = ['ai']
handler.command = /^kimi$/i
handler.register = true
handler.limit = true

export default handler