export async function before(m) {
  if (!m.chat) return;

  // SAFE DB INIT (old Node compatible)
  if (!global.db) global.db = {};
  if (!global.db.data) global.db.data = {};
  if (!global.db.data.chats) global.db.data.chats = {};

  // SAFE CHAT OBJECT
  const chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});

  if (!chat.autotype) return;

  const commands = Object.values(global.plugins || {}).flatMap((plugin) =>
    [].concat(plugin.command || []).filter(Boolean)
  );

  const presenceStatus = commands.some((cmd) =>
    cmd instanceof RegExp
      ? cmd.test(m.text || '')
      : (m.text || '').includes(cmd)
  )
    ? 'composing'
    : 'available';

  if (this?.sendPresenceUpdate) {
    await this.sendPresenceUpdate(presenceStatus, m.chat);
  }
}

export const disabled = false;