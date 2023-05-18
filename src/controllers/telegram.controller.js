// const TelegramBot = require('node-telegram-bot-api');
// const Settings = require('../models/Settings');
// let bot = null
// const handleLogin = async (msg, telegramSetting) => {
//   const chatId = msg.chat.id;
//   try {

//     let content = msg.text.trim()
//     let telegram_password = content.split("login ")[1]

//     if (!telegramSetting)
//       bot.sendMessage(chatId, `Không tìm thấy cấu hình telegram`);
//     if (telegramSetting.value.pass == telegram_password) {
//       await Settings.findOneAndUpdate({ key: "config_telegram" }, {
//         value: {
//           ...telegramSetting._doc.value,
//           chatId
//         }
//       }).exec()

//       bot.sendMessage(chatId, `Xin chào Admin - Đăng nhập thành công. Bạn sẽ nhận được thông báo đơn hàng tại đây, thông qua telegram: ${msg.from?.first_name + " " + msg.from?.last_name}`);
//     }
//     else {
//       bot.sendMessage(chatId, `Sai mật khẩu. Hãy đăng nhập lại`);
//     }
//   } catch (error) {
//     // console.log(error.message)
//     bot.sendMessage(chatId, `Lỗi ${error.message}`);
//     if(bot) bot.stopPolling()

//   }
// }
// exports.connect_telegram = async () => {
//   try {
//     if(bot && bot.isPolling()) {
//       console.log("isPolling", bot.isPolling())
//       await bot.stopPolling();
//     }
//     let telegramSetting = await Settings.findOne({ key: "config_telegram" }).exec()
//     if (!telegramSetting || typeof telegramSetting?.value?.token == "undefined" || telegramSetting?.value?.token == null || telegramSetting?.value?.token == "")
//       return console.log(`Không tìm thấy cấu hình telegram`);
//     const token = telegramSetting.value.token
//     bot = new TelegramBot(token);
//     let result =  await bot.getMe()
//     .then((info) => {
//       bot.startPolling();
//       return true
//     })
//     .catch((e) => {
//       console.log(e.message)
//         return false
//     });
//     if(result)
//     {
//       console.log("Connect to telegram Bot")
//       bot.on('message', async (msg) => {
//         let content = msg.text.trim()
//         const chatId = msg.chat.id;
//         if (content) {
//           if (content.includes("/login ")) {
//             handleLogin(msg, telegramSetting)
//           }
//         }
//       });
//     }
//     else {
//       console.log("ERROR to connect telegram Bot")
//     }
//   } catch (error) {
//     console.log("ERROR to connect telegram Bot", error.message)
//     if(bot) bot.stopPolling()
//   }
// }
// exports.sendTelegram = async (msg, type) => {
//   let telegramSetting = await Settings.findOne({ key: "config_telegram" }).exec()
//   const {enable, chatId} = telegramSetting.value

//   if (!telegramSetting || typeof chatId == "undefined" || chatId == null || chatId == "")
//     return console.log(`Chưa đăng nhập bot telegram`);
//   if(enable.includes(type))
//     bot.sendMessage(chatId, msg)
// }