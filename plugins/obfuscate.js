import fetch from "node-fetch"
import fs from "fs"

let handler = async (m, { conn, text, usedPrefix, command }) => {

    let code = text

    // 📥 file support
    if (!code && m.quoted) {
        try {
            code = await m.quoted.download?.()
            code = code?.toString("utf-8")
        } catch (e) {
            code = null
        }
    }

    if (!code) {
        return conn.sendMessage(
            m.chat,
            {
                text:
`🧠 *WATSON AI JS OBFUSCATE*

Usage:
${usedPrefix}${command} console.log("Hello")

Or reply to a .js file`
            },
            { quoted: m }
        )
    }

    await conn.sendMessage(
        m.chat,
        { text: "🔐 Obfuscating code..." },
        { quoted: m }
    )

    try {

        let controller = new AbortController()
        let timeout = setTimeout(() => controller.abort(), 60000)

        let res = await fetch(
            "https://kaizenapi.my.id/tools/obfuscate/js",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code }),
                signal: controller.signal
            }
        )

        clearTimeout(timeout)

        let json = await res.json()

        console.log("API RESPONSE:", JSON.stringify(json, null, 2))

        // 🔥 SMART DEEP EXTRACTOR (FIX)
        function findCode(obj) {

            if (!obj) return null

            if (typeof obj === "string") return obj

            if (typeof obj === "object") {

                return (
                    obj.code ||
                    obj.result?.code ||
                    obj.data?.code ||
                    obj.output ||
                    obj.result ||
                    findCode(Object.values(obj)[0])
                )
            }

            return null
        }

        let output = findCode(json)

        if (!output || typeof output !== "string") {
            throw new Error("API did not return obfuscated code")
        }

        let fileName = "obfuscated.js"
        fs.writeFileSync(fileName, output)

        await conn.sendMessage(
            m.chat,
            {
                document: fs.readFileSync(fileName),
                fileName,
                mimetype: "application/javascript"
            },
            { quoted: m }
        )

        fs.unlinkSync(fileName)

    } catch (e) {

        await conn.sendMessage(
            m.chat,
            {
                text:
`❌ Obfuscation failed

Reason: ${e.message}`
            },
            { quoted: m }
        )
    }
}

handler.help = ['obfuscate1']
handler.tags = ['tools']
handler.command = /^obfuscate1$/i
handler.limit = true

export default handler