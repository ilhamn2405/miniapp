const { Telegraf } = require("telegraf");

// Ganti dengan token bot kamu
const bot = new Telegraf("6956191888:AAHfbkVkNWUrLrUsje5FUwjKYDdSo_w2euk");

// Simpan profil user di memory sementara
const userProfiles = {};

bot.start((ctx) => {
  if (ctx.chat.type !== "private") {
    return ctx.reply("🚫 Mini App cuma bisa dipakai di chat pribadi dengan bot ini.");
  }

  ctx.reply("Selamat datang di Dating App Mini! ❤️\nKlik tombol untuk isi profil.", {
    reply_markup: {
      keyboard: [[{ text: "📋 Isi Profil", web_app: { url: "https://8a9f94a81b04.ngrok-free.app" } }]],
      resize_keyboard: true,
      one_time_keyboard: true
    },
  });
});


// Menerima data dari WebApp
bot.on("message", (ctx) => {
  if (ctx.message.web_app_data) {
    try {
      const data = JSON.parse(ctx.message.web_app_data.data);
      userProfiles[ctx.from.id] = data;

      ctx.reply(
        `✅ Profil kamu tersimpan!\n\n👤 Nama: ${data.name}\n🎂 Umur: ${data.age}\n💌 Bio: ${data.bio}`
      );
    } catch (err) {
      ctx.reply("❌ Gagal menyimpan data, coba lagi.");
    }
  }
});

bot.launch();
