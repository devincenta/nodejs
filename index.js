import fetch from "node-fetch";

const GAS_URL = process.env.GAS_URL;
const SECRET  = process.env.SECRET;

if (!GAS_URL || !SECRET) {
  console.error("Missing GAS_URL or SECRET env var");
  process.exit(1);
}

async function tick() {
  const url = `${GAS_URL}?secret=${encodeURIComponent(SECRET)}&mode=all`;
  try {
    const res  = await fetch(url);
    const text = await res.text();
    console.log(new Date().toISOString(), res.status, text.slice(0, 200));
  } catch (err) {
    console.error(new Date().toISOString(), "ERR", err?.message || err);
  }
}

tick();
setInterval(tick, 15000);
