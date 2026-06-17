import axios from "axios"

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

    // Initialize chat memory
    if (!conn.deepseek) conn.deepseek = {}
    if (!conn.deepseek[m.sender]) conn.deepseek[m.sender] = []

    // Save user message
    conn.deepseek[m.sender].push({
        role: 'user',
        content: input
    })

    try {

        // Call DeepSeek API
        const res = await deepinfra(
            'deepseek-ai/DeepSeek-V3.1',
            conn.deepseek[m.sender]
        )

        // Save assistant response
        conn.deepseek[m.sender].push({
            role: 'assistant',
            content: res
        })

        // Reply user
        m.reply(res)

    } catch (err) {

        console.error(err)

        m.reply('An error occurred while processing your request.')
    }
}

handler.help = ['deepseek']
handler.tags = ['ai']
handler.command = /^deepseek|depseek|deepsek|dipsek$/i
handler.register = true
handler.limit = true

export default handler

// DeepInfra API helper
export async function deepinfra(model, history) {

    try {

        const res = await axios.post(
            'https://api.deepinfra.com/v1/openai/chat/completions',
            {
                model,
                messages: history
            },
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                    'Content-Type': 'application/json'
                }
            }
        )

        let texts = []

        for (let out of res.data.choices || []) {
            if (out.message?.content) {
                texts.push(out.message.content)
            }
        }

        return texts.join('\n')

    } catch (e) {
        return e?.response?.data || e?.message
    }
}