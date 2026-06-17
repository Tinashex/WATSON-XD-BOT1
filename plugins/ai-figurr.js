let handler = async (m, { conn, usedPrefix, command }) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ""

    // Validate image
    if (!mime || !/image\/(jpe?g|png|webp)/.test(mime)) {
        return m.reply(
`⚠️ Please send or reply to an image, then type:

${usedPrefix + command}`
        )
    }

    try {

        m.reply("⏳ Uploading image to UGUU...")

        // =======================
        // 1. DOWNLOAD IMAGE
        // =======================
        let buffer = await q.download()

        // =======================
        // 2. UPLOAD TO UGUU
        // =======================
        let form = new FormData()
        form.append(
            "files[]",
            new Blob([buffer]),
            "image.jpg"
        )

        let upload = await fetch(
            "https://uguu.se/upload.php",
            {
                method: "POST",
                body: form
            }
        )

        let json = await upload.json()

        // Validate upload response
        if (
            !json.files ||
            !json.files[0]?.url
        ) {
            return m.reply(
                '❌ Failed to upload to UGUU.'
            )
        }

        let imageUrl = json.files[0].url

        m.reply("⏳ Converting image to figure...")

        // =======================
        // 3. CALL FIGURE API
        // =======================
        let api =
            `https://api-faa.my.id/faa/tofigura?url=` +
            encodeURIComponent(imageUrl)

        let hasil = await fetch(api)

        if (!hasil.ok) {
            return m.reply(
                '❌ API failed to process image.'
            )
        }

        let out = Buffer.from(
            await hasil.arrayBuffer()
        )

        // =======================
        // 4. SEND RESULT
        // =======================
        await conn.sendMessage(
            m.chat,
            {
                image: out,
                caption:
`✨ Successfully converted to Figure Style!`
            },
            { quoted: m }
        )

    } catch (e) {

        console.error(e)

        m.reply(
            '❌ An error occurred while processing the image.'
        )
    }
}

handler.help = ['tofigure']
handler.tags = ['ai', 'tools', 'maker']
handler.command = /^tofig(ure)?$/i
handler.limit = true
handler.register = false

export default handler