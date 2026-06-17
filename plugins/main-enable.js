let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
    const isEnable = /^(enable|on|true|1)$/i.test(command);

    // Ensure database objects exist
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    const chat = global.db.data.chats[m.chat];

    if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
    const user = global.db.data.users[m.sender];

    if (!global.db.data.settings[conn.user.jid]) {
        global.db.data.settings[conn.user.jid] = {};
    }

    const settings = global.db.data.settings[conn.user.jid];

    let type = (args[0] || '').toLowerCase();

    let isAll = false;
    let isUser = false;

    switch (type) {

        /* ================= USER ================= */
        case 'autolevelup':
            isUser = true;
            user.autolevelup = isEnable;
            break;

        /* ================= GROUP ================= */
        case 'welcome':
        case 'detect':
        case 'antidelete':
        case 'antilink':
        case 'antispam':
        case 'antibot':
        case 'antilinkgc':
        case 'antivirtex':
        case 'antiarab':
        case 'autogroup':
        case 'nsfw':
        case 'mute':
        case 'softmode':
        case 'anticmds':

            if (m.isGroup && !(isAdmin || isOwner)) {
                return global.dfail('admin', m, conn);
            }

            chat[type] = isEnable;
            break;

        /* ================= OWNER ================= */
        case 'autoread':
        case 'anticall':
        case 'public':
        case 'autogpt':
        case 'antispam':
        case 'simi':
        case 'self':
        case 'backup':
        case 'autoblock':
        case 'restrict':
        case 'chatbot':
        case 'autocleartmp':
        case 'statusview':
        case 'like':
        case 'autoreply':
        case 'pmblocker':
        case 'autoreacts':
        case 'alwaysonline':
        case 'ownerreacts':

            isAll = true;

            if (!isOwner) {
                return global.dfail('owner', m, conn);
            }

            settings[type] = isEnable;
            break;

        default:
            return m.reply(`
╭━━━〔 ⚙️ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐏𝐀𝐍𝐄𝐋 〕━━━╮

📌 *USER FEATURES*
• autolevelup

👥 *GROUP FEATURES*
• welcome
• detect
• antidelete
• antilink
• antispam
• antibot
• antilinkgc
• antivirtex
• antiarab
• autogroup
• mute
• nsfw
• softmode
• anticmds

👑 *OWNER FEATURES*
• autoread
• anticall
• public
• self
• backup
• autoblock
• restrict
• autocleartmp
• statusview
• like
• pmblocker
• autoreacts
• ownerreacts

╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

📖 *Examples:*
• ${usedPrefix}enable antivirtex
• ${usedPrefix}disable antivirtex
• ${usedPrefix}on welcome
• ${usedPrefix}off antidelete
• ${usedPrefix}enable autoreacts
• ${usedPrefix}disable ownerreacts
• ${usedPrefix}disable alwaysonline
• ${usedPrefix}enable alwaysonline
`.trim());
    }

    let status = isEnable ? 'ENABLED ✅' : 'DISABLED ❌';

    let scope = isAll
        ? 'GLOBAL BOT SYSTEM'
        : isUser
        ? 'YOUR ACCOUNT'
        : 'THIS GROUP';

    let msg = `
╭━━━〔 ⚡ SYSTEM UPDATED 〕━━━╮
┃ 🛠️ Feature : ${type.toUpperCase()}
┃ 📊 Status  : ${status}
┃ 🌐 Scope   : ${scope}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim();

    m.reply(msg);
};

handler.help = ['enable', 'disable', 'on', 'off'];
handler.tags = ['main'];
handler.command = /^(enable|disable|on|off|true|false|1|0)$/i;

export default handler;