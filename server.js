import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import { exec } from 'child_process';

let app = global.app = express();

function connect(PORT) {

    app.get('/', (req, res) => res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WATSON-XD-BOT MD</title>

    <link rel="icon" href="https://kepo.xsvs.repl.co/file/VZZgayDPvuHM.ico">

    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg,#0f0f0f,#1a1a1a);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
        }

        .box {
            background: rgba(255,255,255,0.05);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0,255,150,0.15);
            width: 320px;
        }

        h2 {
            color: #00ff99;
            margin-bottom: 10px;
        }

        .time {
            color: #ffcc00;
            margin: 6px 0;
            font-size: 14px;
        }

        .btn {
            display: inline-block;
            margin-top: 12px;
            padding: 10px 15px;
            background: #00ff99;
            color: black;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
        }

        .btn:hover {
            background: #00cc77;
        }

        .status {
            margin-top: 10px;
            font-size: 13px;
            color: #00d4ff;
        }
    </style>
</head>

<body>

<div class="box">
    <h2>WATSON-XD-BOT MD</h2>

    <div class="time" id="wib"></div>
    <div class="time" id="wita"></div>
    <div class="time" id="wit"></div>

    <div class="status">🟢 System Running</div>

    <a class="btn" href="https://mykingbee.blogspot.com/" target="_blank">
        Visit Website
    </a>
</div>

<script>
function updateClock() {
    const now = new Date();

    document.getElementById("wib").textContent =
        "WIB: " + now.toLocaleTimeString('en-US', { timeZone: 'Africa/Harare', hour12: false });

    document.getElementById("wita").textContent =
        "WITA: " + now.toLocaleTimeString('en-US', { timeZone: 'Africa/Harare', hour12: false });

    document.getElementById("wit").textContent =
        "WIT: " + now.toLocaleTimeString('en-US', { timeZone: 'Africa/Harare', hour12: false });
}

setInterval(updateClock, 1000);
updateClock();
</script>

</body>
</html>`));

    /**
     * SAFE NOWA (FIXED CRASH ISSUE)
     */
    app.get('/nowa', async (req, res) => {
        const q = req.query.number;
        const regex = /x/g;

        if (!q) {
            return res.status(400).json({ error: 'Number parameter is required' });
        }

        if (!q.match(regex)) {
            return res.status(400).json({
                error: 'Parameter must contain at least one "x"'
            });
        }

        const random = q.match(regex).length;

        // 🔥 SAFETY LIMIT
        if (random > 5) {
            return res.status(400).json({
                error: 'Too many combinations (max 5 x allowed)'
            });
        }

        const total = Math.pow(10, random);
        const array = [];

        for (let i = 0; i < total; i++) {
            const list = [...i.toString().padStart(random, '0')];
            const result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net';

            try {
                if (!global.conn) {
                    array.push({ jid: result, exists: false, error: 'conn not ready' });
                    continue;
                }

                const v = await global.conn.onWhatsApp(result);
                const exists = v?.[0]?.exists || false;

                let info = {};
                if (exists) {
                    info = await global.conn.fetchStatus(result).catch(() => ({}));
                }

                array.push({ jid: result, exists, ...info });

            } catch (error) {
                array.push({ jid: result, exists: false });
            }
        }

        res.json({ result: array });
    });

    /**
     * SPEEDTEST
     */
    app.get('/speedtest', (req, res) => {
        exec('speedtest', (error, stdout) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.send(`<pre>${stdout}</pre>`);
        });
    });

    /**
     * PING
     */
    app.get('/ping', (req, res) => {
        res.send('Ping successful');
    });

    /**
     * PING TEST
     */
    app.get('/ping2', async (req, res) => {
        const url = 'https://xnuvers007botz.xnuvers007.repl.co';
        const results = [];

        for (let i = 0; i < 5; i++) {
            try {
                const r = await axios.get(url);
                results.push(`Ping ${i + 1}: ${r.status}`);
            } catch (e) {
                results.push(`Error ${i + 1}: ${e.message}`);
            }
        }

        res.send(results.join('<br>'));
    });

    app.listen(PORT, () => {
        keepAlive();
        console.log('App listened on port', PORT);
    });
}

/**
 * KEEP ALIVE
 */
function keepAlive() {
    const url = process.env.REPL_URL || 'http://localhost';

    setInterval(() => {
        fetch(url).catch(() => {});
    }, 30000);
}

/**
 * DATE FORMAT
 */
function formatDate(n, locale = 'id') {
    return new Date(n).toLocaleDateString(locale, {
        timeZone: 'Africa/Harare'
    });
}

export default connect;