export default async function caseHandler(m, conn) {
    const text = m.text.toLowerCase()

    switch (text) {
        case 'halo':
            return conn.reply(m.chat, 'Halo juga!', m)

        case 'tes':
            return conn.reply(m.chat, 'Ini menu simple case', m)
    }
}