import axios from 'axios';

let handler = async (m, { conn, command }) => {
    if (command === 'randomjoke') {
        // Send processing reaction
        await conn.sendMessage(m.chat, {
            react: { text: '😂', key: m.key }
        });

        try {
            // Fetch joke from English API
            const api = await axios.get("https://v2.jokeapi.dev/joke/Any");
            const jokeData = api.data;

            let jokeText;

            if (jokeData.type === 'single') {
                jokeText = jokeData.joke;
            } else if (jokeData.type === 'twopart') {
                jokeText = `${jokeData.setup}\n\n${jokeData.delivery}`;
            } else {
                jokeText = "Couldn't fetch a joke 😅";
            }

            // Send joke to chat
            await conn.sendMessage(m.chat, { text: jokeText }, { quoted: m });

        } catch (err) {
            console.error(err);
            await conn.sendMessage(m.chat, {
                text: "❌ Failed to fetch a joke, try again later."
            }, { quoted: m });
        }
    }
};

handler.command = ['randomjoke'];
handler.tags = ['fun'];
handler.help = ['randomjoke'];

export default handler;