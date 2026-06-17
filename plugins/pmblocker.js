// pmblocker.js
export async function before(m, { conn, isOwner, isROwner }) {
    // Ignore messages sent by the bot itself
    if (m.isBaileys && m.fromMe) return true;

    // Allow owner's messages
    if (isOwner || isROwner) return false;

    // Ignore messages sent in group chats
    if (m.isGroup) return false;

    // Allowed users (optional)
    const allowlist = global.allowed || [];
    if (allowlist.includes(m.sender.split('@')[0])) return false;

    // Fetch bot settings
    let bot = global.db.data.settings?.[conn.user.jid] || {};

    // If PM Blocker is ON
    if (bot.pmblocker) {
        await m.reply(
            `*@${m.sender.split`@`[0]}*, private messaging the bot is currently disabled. You will be blocked.`,
            false,
            { mentions: [m.sender] }
        );
        try {
            await conn.updateBlockStatus(m.chat, 'block'); // block user
            m.react("✅"); // optional reaction
        } catch (e) {
            console.error(`Error blocking ${m.sender}:`, e);
        }
        return true; // block this PM
    }

    return false; // allow message
}