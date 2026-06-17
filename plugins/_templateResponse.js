import {
    proto,
    generateWAMessage,
    areJidsSameUser
} from 'baileys'

export async function all(m, chatUpdate) {
    if (m.isBaileys) return
    if (!m.message) return

    const msg =
        m.message.buttonsResponseMessage ||
        m.message.templateButtonReplyMessage ||
        m.message.listResponseMessage ||
        m.message.interactiveResponseMessage

    if (!msg) return

    let id = ''

    if (m.message.buttonsResponseMessage) {
        id = m.message.buttonsResponseMessage.selectedButtonId
    }

    else if (m.message.templateButtonReplyMessage) {
        id = m.message.templateButtonReplyMessage.selectedId
    }

    else if (m.message.listResponseMessage) {
        id = m.message.listResponseMessage.singleSelectReply.selectedRowId
    }

    else if (m.message.interactiveResponseMessage) {
        let json = JSON.parse(
            m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson
        )

        id = json.id || json.selectedId || ''
    }

    if (!id) return

    let messages = await generateWAMessage(
        m.chat,
        {
            text: id,
            mentions: m.mentionedJid
        },
        {
            userJid: this.user.jid,
            quoted: m.quoted && m.quoted.fakeObj
        }
    )

    messages.key.remoteJid = m.chat
    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
    messages.key.id = m.key.id
    messages.pushName = m.pushName

    if (m.isGroup) {
        messages.key.participant = m.sender
        messages.participant = m.sender
    }

    let upsert = {
        ...chatUpdate,
        messages: [
            proto.WebMessageInfo.create(messages)
        ].map(v => {
            v.conn = this
            return v
        }),
        type: 'append'
    }

    this.ev.emit('messages.upsert', upsert)
}