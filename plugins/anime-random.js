import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {

    // Helper function
    const sendAnime = async (url) => {
        let res = await (await fetch(url)).json()
        let img = res[Math.floor(Math.random() * res.length)]

        await conn.sendFile(
            m.chat,
            img,
            'anime.jpg',
            `🎌 Here is your *${command}* image\nRequested by @${m.sender.split('@')[0]}`,
            m
        )
    }

    try {

        // Anime database map
        const db = {
            akira: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/akira.json",
            akiyama: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/akiyama.json",
            anna: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/ana.json",
            asuna: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/asuna.json",
            ayuzawa: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/ayuzawa.json",
            boruto: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/boruto.json",
            chitanda: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/chitanda.json",
            chitoge: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/chitoge.json",
            deidara: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/deidara.json",
            doraemon: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/doraemon.json",
            emilia: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/emilia.json",
            erza: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/erza.json",
            gremory: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/gremory.json",
            hestia: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/hestia.json",
            hinata: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/hinata.json",
            inori: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/inori.json",
            isuzu: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/isuzu.json",
            itachi: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/itachi.json",
            itori: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/itori.json",
            kaga: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kaga.json",
            kagura: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kagura.json",
            kakashi: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kakasih.json",
            kaori: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kaori.json",
            kaneki: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kaneki.json",
            kosaki: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kosaki.json",
            kotori: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kotori.json",
            kuriyama: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kuriyama.json",
            kuroha: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kuroha.json",
            kurumi: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/kurumi.json",
            loli: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/loli.json",
            madara: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/madara.json",
            mikasa: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/mikasa.json",
            miku: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/miku.json",
            minato: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/minato.json",
            naruto: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/naruto.json",
            natsukawa: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/natsukawa.json",
            neko2: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/neko.json",
            nekohime: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/nekohime.json",
            nezuko: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/nezuko.json",
            nishimiya: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/nishimiya.json",
            onepiece: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/onepiece.json",
            pokemon: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/pokemon.json",
            rem: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/rem.json",
            rize: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/rize.json",
            sagiri: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/sagiri.json",
            sakura: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/sakura.json",
            sasuke: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/sasuke.json",
            shina: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/shina.json",
            shinka: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/shinka.json",
            shizuka: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/shizuka.json",
            shota: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/shota.json",
            tomori: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/tomori.json",
            toukachan: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/toukachan.json",
            tsunade: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/tsunade.json",
            yatogami: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/yatogami.json",
            yuki: "https://raw.githubusercontent.com/KazukoGans/database/main/anime/yuki.json"
        }

        let url = db[command]

        if (!url) return

        await sendAnime(url)

    } catch (e) {
        conn.reply(m.chat, `❌ Error fetching anime image\n\n${e.message}`, m)
    }
}

// Commands list
handler.command = handler.help = [
'akira','akiyama','anna','asuna','ayuzawa','boruto','chitanda','chitoge',
'deidara','doraemon','emilia','erza','gremory','hestia','hinata','inori',
'isuzu','itachi','itori','kaga','kagura','kakashi','kaori','kaneki','kosaki',
'kotori','kuriyama','kuroha','kurumi','loli','madara','mikasa','miku',
'minato','naruto','natsukawa','neko2','nekohime','nezuko','nishimiya',
'onepiece','pokemon','rem','rize','sagiri','sakura','sasuke','shina',
'shinka','shizuka','shota','tomori','toukachan','tsunade','yatogami','yuki'
]

handler.tags = ['anime']
handler.limit = true

export default handler