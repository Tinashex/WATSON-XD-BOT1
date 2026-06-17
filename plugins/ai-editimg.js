let handler = async (m, { conn, text, usedPrefix, command }) => {

    // Check if image is provided (quoted or direct)
    if (!m.quoted && !/image/.test(m.mimetype || "")) {
        return m.reply(
`Please send or reply to an image with caption:

*${usedPrefix + command} <prompt>*`
        )
    }

    // Prompt validation
    if (!text) {
        return m.reply(
            '❌ Please enter a prompt to edit the image.'
        )
    }

    let q = m.quoted ? m.quoted : m
    let mime = q.mimetype || ""

    // Ensure it's an image
    if (!/image/.test(mime)) {
        return m.reply('❌ This is not an image!')
    }

    let img = await q.download()

    // ===================================================
    // 1. UPLOAD TO UGUU
    // ===================================================
    let form = new FormData()
    form.append(
        "files[]",
        new Blob([img]),
        "image.jpg"
    )

    let up = await fetch(
        "https://uguu.se/upload",
        {
            method: "POST",
            body: form
        }
    ).catch(() => null)

    if (!up || !up.ok) {
        return m.reply(
            '❌ Failed to upload to Uguu!'
        )
    }

    let json = await up.json().catch(() => null)

    if (
        !json ||
        !json.files ||
        !json.files[0]?.url
    ) {
        return m.reply('❌ Upload failed!')
    }

    let uploaded = json.files[0].url

    console.log("UGUU:", uploaded)

    await m.reply('⏳ Processing image...')

    // ===================================================
    // 2. IMAGE EDIT API
    // ===================================================
    let api =
        `https://api-faa.my.id/faa/editfoto?url=` +
        encodeURIComponent(uploaded) +
        `&prompt=` +
        encodeURIComponent(text)

    let get = await fetch(api).catch(() => null)

    if (!get || !get.ok) {
        return m.reply(
            '❌ API failed to process image.'
        )
    }

    let buffer = Buffer.from(
        await get.arrayBuffer()
    )

    // ===================================================
    // 3. SEND RESULT
    // ===================================================
    await conn.sendMessage(
        m.chat,
        {
            image: buffer,
            caption:
`✨ Image Edited Successfully!
Prompt: ${text}`
        },
        { quoted: m }
    )
}

handler.help = ['editimg <prompt>']
handler.tags = ['ai']
handler.command = /^editimg$/i

export default handler