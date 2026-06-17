const antiCmds = [
    'tagall', 'leave', 'modapk', 'apk', 'play', 'song', 'ping',
    'runtime', 'list', 'gifted', 'menu', 'chat', 'remove', 'repo', 'video'
];

export async function before(message, { conn, isAdmin, isBotAdmin, isOwner }) {
    // Only apply in groups
    if (!message.isGroup) return false;

    // Ignore messages from the bot or system messages
    if (message.fromMe || !message.sender) return false;

    // Load chat settings
    const chatSettings = global.db?.data?.chats?.[message.chat];
    if (!chatSettings?.anticmds) return false; // Only run if anticmds is enabled

    const senderTag = '@' + message.sender.split('@')[0];

    // Normalize message text
    const text = (message.text || '').toLowerCase();

    // Check if the message contains forbidden commands
    const triggered = antiCmds.some(cmd =>
        text.startsWith(',' + cmd) || text.startsWith('.' + cmd)
    );

    if (!triggered) return false;

    // If bot is admin, enforce rules
    if (isBotAdmin) {
        // Warn user
        await conn.sendMessage(message.chat, {
            text: `*❌ RULES VIOLATION DETECTED*\n\nUser ${senderTag} attempted a forbidden command.`,
            mentions: [message.sender]
        }, { quoted: message });

        // Delete the offending message
        await conn.sendMessage(message.chat, {
            delete: { remoteJid: message.chat, fromMe: false, id: message.key.id, participant: message.sender }
        });

        // Kick the user
        await conn.groupParticipantsUpdate(message.chat, [message.sender], 'remove');
    } else {
        // Bot is not admin, just warn
        await conn.sendMessage(message.chat, {
            text: `⚠️ ${senderTag}, attempted a forbidden command, but I don't have admin rights to enforce it.`,
            mentions: [message.sender]
        });
    }

    return true; // Signal that the message was handled
}