// const { default: axios } = require("axios");
// const redisClient = require("../../config/redis");
// const moment = require("moment");
// const Bluebird = require("bluebird");
// const io = require("../../config/socketio");
// const History_Deposits = require("../models/History_Deposit");
// const Users = require("../models/Users");
// const { uuidv4Payment, randomString, curencyFormat } = require("../utils/help");
// const md5 = require('md5');
// const Settings = require("../models/Settings");


// const post = async (url, body) => {
//     try {
//         body = JSON.stringify(body)
//         var config = {
//             method: 'post',
//             timeout: 1000 * 20,
//             url: url,
//             data: body,
//             headers: {
//                 'Content-Length': body.length,
//                 'Accept': 'application/json',
//             }
//         };
//         const response = await axios(config)
//         const { data, status } = response;
//         // console.log(status, data)
//         if (status == 200)
//             return data
//         else return null

//     }
//     catch (error) {
//         console.log(error.message)
//         return null
//     }

// }
// const getBalanceMomo = async (token) => {
//     let dataBalance = await post("https://api.web2m.com/apigetsodu/" + token, null)
//     if (dataBalance)
//         return dataBalance.SoDu
//     else return null
// }
// const getTransactionMomo = async (token) => {
//     let data = await post("https://api.web2m.com/historyapimomo/" + token, null)
//     if (data)
//         return data.momoMsg.tranList
//     else return null
// }
// const getTransactionAcb = async (token, password, account_number) => {
//     let url = `https://api.web2m.com/historyapiacbv3/${password}/${account_number}/${token.toLowerCase()}`
//     let data = await post(url, null)
//     if (data && data.status)
//         return data.transactions
//     else return null
// }
// const getTransactionTech = async (token, password, account_number) => {
//     let url = `https://api.web2m.com/historyapitcbv3/${password}/${account_number}/${token.toLowerCase()}`
//     let data = await post(url, null)
//     if (data && data.status)
//         return data.transactions
//     else return null
// }
// function getDifference(arrayOne, arrayTwo, key) {
//     const results = arrayOne.filter(({ [key]: id1 }) => !arrayTwo.some(({ [key]: id2 }) => id2 === id1));
//     return results
// }

// const checkCaptcha = async (captcha) => {
//     var config = {
//         method: 'get',
//         url: 'https://www.google.com/recaptcha/api/siteverify?secret=6LfFLPohAAAAAD7rSDI2_cIGiu8GSXlremNN3z6I&response=' + captcha,
//     };

//     return axios(config)
//         .then(function (response) {
//             const { data } = response
//             return data.success
//         })
//         .catch(function (error) {
//             return false
//         });

// }
// const checkCard = async (deposit_code, telco, code, serial, amount, partner_id, partner_key) => {

//     let request_id = deposit_code
//     let command = "charging"
//     var data = JSON.stringify({
//         "telco": telco,
//         "code": code.trim(),
//         "serial": serial,
//         "amount": amount,
//         "request_id": request_id,
//         "partner_id": partner_id,
//         "command": command,
//         "sign": md5(partner_key + code + command + partner_id + request_id + serial + telco)
//     });
//     //   console.log(partner_key)
//     var config = {
//         method: 'post',
//         url: 'https://naptudong.com/chargingws/v2',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         data: data
//     };

//     return axios(config)
//         .then(function (response) {
//             const { status, data } = response
//             if (status == 200) {
//                 ///99 = CHỜ /// 1 = THẺ ĐÚNG /// 2 = THẺ ĐÚNG NHƯNG SAI MỆNH GIÁ /// 3 = THẺ LỖI /// 4 = BẢO TRÌ

//                 if (data.status == 99 || data.status == 1) {
//                     return {
//                         status: true,
//                         msg: `Yêu cầu nạp ${curencyFormat(amount)} thành công. Chờ hệ thống xác nhận`
//                     }
//                 }
//                 else if (data.status == 2) {
//                     return {
//                         status: false,
//                         msg: "Thẻ đúng nhưng sai mệnh giá sẽ bị mât thẻ"
//                     }
//                 }
//                 else {
//                     return {
//                         status: false,
//                         msg: "Thẻ không đúng hoặc lỗi. Vui lòng thử lại"
//                     }
//                 }
//             }
//             else {
//                 return {
//                     status: false,
//                     msg: "Lỗi hệ thống, xin hãy thử lại",
//                     data: null
//                 }
//             }

//         })
//         .catch(function (error) {
//             return {
//                 status: false,
//                 msg: error.message,
//                 data: null
//             }
//         });

// }
// exports.momoProcess = async (momo_data) => {
//     const { status, token, balance, transaction } = JSON.parse(momo_data)
//     let newBalance = await getBalanceMomo(token)
//     if (newBalance) {
//         let newTransaction = await getTransactionMomo(token)
//         if (newTransaction) {
//             if (newTransaction[0]?.tranId !== transaction[0]?.tranId) {
//                 let new_momo_data = {
//                     status, token, balance: newBalance, transaction: newTransaction
//                 }
//                 await redisClient.set("momo_data", JSON.stringify(new_momo_data), function (err, value) {
//                     if (err)
//                         console.log(err.message)
//                     else {
//                         if (value == "OK") {
//                             console.log("Momo set new data")
//                         }
//                     }
//                 })
//                 let newPayment = getDifference(newTransaction, transaction, "tranId");

//                 let matchDiposit = 0;
//                 if (newPayment.length > 0) {
//                     await Bluebird.each(newPayment, async item => {
//                         try {
//                             let noidung = item.comment
//                             let amount = item.amount
//                             // console.log(item)
//                             if (noidung !== "" && amount >= 0 && noidung !== []) {
//                                 let deposit = await History_Deposits.findOne({ code: noidung.toUpperCase(), amount: amount, status: 0 }).select("-log").exec()
//                                 if (deposit) {
//                                     matchDiposit += 1
//                                     let user_deposit = await Users.findOne({ _id: deposit.user }).exec();
//                                     if (user_deposit) {
//                                         ////////////
//                                         let arrayLog = []
//                                         user_deposit.balance += deposit.amount;
//                                         user_deposit.balance_deposit += deposit.amount;
//                                         deposit.status = 1;
//                                         deposit.approve_date = moment();
//                                         deposit.approve_type = "auto";

//                                         arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Hệ thống đã phê duyệt nạp tiền tự động`)
//                                         let update = { ...deposit._doc, $push: { log: { $each: arrayLog } } }

//                                         History_Deposits.findOneAndUpdate({ _id: deposit._id },
//                                             update,
//                                             { "new": true },
//                                             (err, doc) => {
//                                                 if (err) {
//                                                     console.log(deposit.code, "Lỗi update lịch sử nạp tiền: " + err.message)
//                                                 }
//                                                 if (user_deposit) user_deposit.save()
//                                                 io.getIO().emit(deposit.user + "_payments", {
//                                                     msg: `Hệ thống đã phê duyệt nạp tiền tự động`,
//                                                     data: deposit,
//                                                     status: true
//                                                 });
//                                                 console.log(deposit.code, 'Update lịch sử nạp tiền thành công!')
//                                             }
//                                         )

//                                     } else {
//                                         io.getIO().emit(deposit.user + "_payments", {
//                                             msg: `Người dùng nạp tiền không tồn tại`,
//                                             data: deposit,
//                                             status: true
//                                         });
//                                         return res.status(201).send({
//                                             data: null,
//                                             status: false,
//                                             msg: "Người dùng nạp tiền không tồn tại",
//                                         });

//                                     }

//                                 }
//                             }
//                         } catch (error) {
//                             console.log("Momo", error.message)
//                         }
//                     })
//                     console.log(`Momo tìm thấy: Có ${matchDiposit} đơn hàng trong số ${newPayment.length} giao dịch momo mới.`)
//                 }
//             }
//             else {
//                 console.log("Momo không thay đổi lịch sử giao dịch")
//             }
//         }
//         else {
//             console.log("Momo không lấy được transaction")
//         }
//     }
//     else {
//         console.log("Momo không lấy được số dư")
//     }
// }
// exports.acbProcess = async (acb_data) => {
//     const { status, token, password, account_number, transaction } = JSON.parse(acb_data)
//     let newTransaction = await getTransactionAcb(token, password, account_number)
//     // console.log("ACB Transiction",newTransaction)
//     if (newTransaction.length > 0) {
//         newTransaction = newTransaction.filter(transaction => transaction.type == "IN")
//         if (newTransaction[0]?.transactionID !== transaction[0]?.transactionID) {
//             let new_acb_data = {
//                 status, token, password, account_number, transaction: newTransaction
//             }
//             await redisClient.set("acb_data", JSON.stringify(new_acb_data), function (err, value) {
//                 if (err)
//                     console.log(err.message)
//                 else {
//                     if (value == "OK") {
//                         console.log("ACB set new data")
//                     }
//                 }
//             })
//             let newPayment = getDifference(newTransaction, transaction, "transactionID");
//             // console.log("ACB getDifference",newPayment)
//             let matchDiposit = 0;
//             if (newPayment.length > 0) {
//                 await Bluebird.each(newPayment, async item => {
//                     try {
//                         let noidung
//                         let amount = item.amount
//                         let regex = /.([a-zA-Z0-9]+).CT.tu.([0-9]+).([^"]+).toi/gm.exec(item.description)
//                         // let id = regex[1]
//                         if (regex && regex.length > 1)
//                             noidung = regex[1]
//                         if(!noidung || noidung == null || noidung == "" || noidung == undefined)
//                         {
//                             regex = /TCS([a-zA-Z0-9]+)/gm.exec(item.description)
//                             if (regex && regex.length > 1)
//                             noidung = "TCS"+regex[1].substring(0,6)
//                         }
//                         console.log(noidung, amount)
//                         if(!noidung || noidung == null || noidung == "" || noidung == undefined) return
//                         if (noidung !== "" && amount >= 0 && amount !== null && noidung !== null) {
//                             let deposit = await History_Deposits.findOne({ code: noidung.toUpperCase(), amount: amount, status: 0 }).select("-log").exec()
//                             if (deposit) {
//                                 matchDiposit += 1
//                                 let user_deposit = await Users.findOne({ _id: deposit.user }).exec();
//                                 if (user_deposit) {
//                                     ////////////
//                                     user_deposit.balance += deposit.amount;
//                                     user_deposit.balance_deposit += deposit.amount;
//                                     deposit.status = 1;
//                                     deposit.approve_date = moment();
//                                     deposit.approve_type = "auto";

//                                     let arrayLog = []
//                                     arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Hệ thống đã phê duyệt nạp tiền tự động`)
//                                     let update = { ...deposit._doc, $push: { log: { $each: arrayLog } } }

//                                     await History_Deposits.findOneAndUpdate({ _id: deposit._id },
//                                         update,
//                                         { "new": true },
//                                         (err, doc) => {
//                                             if (err) {
//                                                 console.log(deposit.code, "Lỗi update lịch sử nạp tiền: " + err.message)
//                                             }
//                                             if (user_deposit) user_deposit.save()
//                                             io.getIO().emit(deposit.user + "_payments", {
//                                                 msg: `Hệ thống đã phê duyệt nạp tiền tự động`,
//                                                 data: deposit,
//                                                 status: true
//                                             });
//                                             console.log(deposit.code, 'Update lịch sử nạp tiền thành công!')
//                                         }
//                                     )
//                                 } else {
//                                     return res.status(201).send({
//                                         data: null,
//                                         status: false,
//                                         msg: "Người dùng nạp tiền không tồn tại",
//                                     });
//                                 }

//                             }

//                         }
//                     } catch (error) {
//                         console.log("ACB", error.message)
//                     }
//                 })
//                 console.log(`ACB tìm thấy: Có ${matchDiposit} đơn hàng trong số ${newPayment.length} giao dịch acb mới.`)
//             }
//         }
//         else {
//             console.log("ACB không thay đổi lịch sử giao dịch")
//         }
//     }
//     else {
//         console.log("ACB không lấy được giao dịch")
//     }
// }
// exports.techcombankProcess = async (techcombank_data) => {
//     const { status, token, password, account_number, transaction } = JSON.parse(techcombank_data)
//     let newTransaction = await getTransactionTech(token, password, account_number)
//     if (newTransaction) {
//         newTransaction = newTransaction.filter(transaction => transaction.type == "IN")
//         if (newTransaction.length > transaction.length) {
//             let new_tech_data = {
//                 status, token, password, account_number, transaction: newTransaction
//             }
//             await redisClient.set("techcombank_data", JSON.stringify(new_tech_data), function (err, value) {
//                 if (err)
//                     console.log(err.message)
//                 else {
//                     if (value == "OK") {
//                         console.log("TECHCOMBANK set new data")
//                     }
//                 }
//             })
//             let newPayment = getDifference(newTransaction, transaction, "transactionID");
//             let matchDiposit = 0;
//             if (newPayment.length > 0) {
//                 await Bluebird.each(newPayment, async item => {
//                     try {
//                         let noidung
//                         let amount = item.amount
//                         let regex = /.([a-zA-Z0-9]+).CT.tu.([0-9]+).([^"]+).toi/gm.exec(item.description)
//                         // let id = regex[1]
//                         if (regex && regex.length > 1)
//                             noidung = regex[1]
//                         if(!noidung || noidung == null || noidung == "" || noidung == undefined)
//                         {
//                             regex = /TCS([a-zA-Z0-9]+)/gm.exec(item.description)
//                             if (regex && regex.length > 1)
//                             noidung = "TCS"+regex[1].substring(0,6)
//                         }
//                         console.log(noidung, amount)
//                         if(!noidung || noidung == null || noidung == "" || noidung == undefined) return
//                         if (noidung !== "" && amount >= 0 && amount !== null && noidung !== null) {
//                             let deposit = await History_Deposits.findOne({ code: noidung.toUpperCase(), amount: amount, status: 0 }).select("-log").exec()
//                             if (deposit) {
//                                 matchDiposit += 1
//                                 let user_deposit = await Users.findOne({ _id: deposit.user }).exec();
//                                 if (user_deposit) {
//                                     ////////////
//                                     user_deposit.balance += deposit.amount;
//                                     user_deposit.balance_deposit += deposit.amount;
//                                     deposit.status = 1;
//                                     deposit.approve_date = moment();
//                                     deposit.approve_type = "auto";

//                                     let arrayLog = []
//                                     arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Hệ thống đã phê duyệt nạp tiền tự động`)
//                                     let update = { ...deposit._doc, $push: { log: { $each: arrayLog } } }

//                                     History_Deposits.findOneAndUpdate({ _id: deposit._id },
//                                         update,
//                                         { "new": true },
//                                         (err, doc) => {
//                                             if (err) {
//                                                 console.log(deposit.code, "Lỗi update lịch sử nạp tiền: " + err.message)
//                                             }
//                                             if (user_deposit) user_deposit.save()
//                                             io.getIO().emit(deposit.user + "_payments", {
//                                                 msg: `Hệ thống đã phê duyệt nạp tiền tự động`,
//                                                 data: deposit,
//                                                 status: true
//                                             });
//                                             console.log(deposit.code, 'Update lịch sử nạp tiền thành công!')
//                                         }
//                                     )
//                                 } else {
//                                     return res.status(201).send({
//                                         data: null,
//                                         status: false,
//                                         msg: "Người dùng nạp tiền không tồn tại",
//                                     });
//                                 }

//                             }

//                         }
//                     } catch (error) {
//                         console.log("TECHCOMBANK", error.message)
//                     }
//                 })
//                 console.log(`TECHCOMBANK tìm thấy: Có ${matchDiposit} đơn hàng trong số ${newPayment.length} giao dịch acb mới.`)
//             }
//         }
//         else {
//             console.log("TECHCOMBANK không thay đổi lịch sử giao dịch")
//         }
//     }
//     else {
//         console.log("TECHCOMBANK không lấy được giao dịch")
//     }
// }
// exports.card_callback = async (req, res) => {
//     const { body } = req;
//     console.log(body)
//     const { status, request_id: code, declared_value, value, telco } = body
//     let deposit = await History_Deposits.findOne({ code, type: telco, amount_before: value, status: 0 }).select("-log").exec()
//     if (deposit) {
//         let arrayLog = []
//         let user_deposit = null
//         if (status == 1) {
//             user_deposit = await Users.findOne({ _id: deposit.user }).exec();
//             if (user_deposit) {
//                 ////////////
//                 user_deposit.balance += deposit.amount;
//                 user_deposit.balance_deposit += deposit.amount;
//                 deposit.status = 1;
//                 deposit.approve_date = moment();
//                 deposit.approve_type = "auto";
//                 arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Hệ thống đã phê duyệt nạp tiền tự động`)
//                 io.getIO().emit(deposit.user + "_payments", {
//                     msg: `Hệ thống đã phê duyệt nạp tiền tự động`,
//                     data: deposit,
//                     status: true
//                 });
//             } else {
//                 io.getIO().emit(deposit.user + "_payments", {
//                     msg: `Người dùng nạp tiền không tồn tại`,
//                     data: deposit,
//                     status: false
//                 });
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Người dùng nạp tiền không tồn tại. Hủy đơn nạp tiền",
//                 });
//             }
//         }
//         else if (data.status == 2) {
//             deposit.status = 2
//             arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Thẻ đúng nhưng sai mệnh giá. Hủy đơn nạp tiền`)
//             io.getIO().emit(deposit.user + "_payments", {
//                 msg: `Thẻ đúng nhưng sai mệnh giá. Hủy đơn nạp tiền`,
//                 data: deposit,
//                 status: false
//             });
//         }
//         else {
//             arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Thẻ không đúng hoặc lỗi thẻ`)
//             deposit.status = 2
//             io.getIO().emit(deposit.user + "_payments", {
//                 msg: `Thẻ không đúng hoặc lỗi thẻ. Hủy đơn nạp tiền`,
//                 data: deposit,
//                 status: false
//             });
//         }
//         let update = { ...deposit._doc, $push: { log: { $each: arrayLog } } }
//         History_Deposits.findOneAndUpdate({ _id: deposit._id },
//             update,
//             { "new": true },
//             (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi update lịch sử nạp tiền: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 if (user_deposit) user_deposit.save()
//                 data = doc.toObject()
//                 return res.status(200).send({
//                     msg: 'Update lịch sử nạp tiền thành công!',
//                     status: true,
//                     data: data
//                 });
//             }
//         )
//     }
//     else {
//         return res.status(201).send({
//             status: false,
//             msg: "Không tìm thấy đơn hàng",
//             data: null
//         })

//     }
// }
// exports.create_deposit = async (req, res) => {
//     const { user, body } = req;
//     const { type, amount, captcha } = body
//     // let checkCaptcha_ = await checkCaptcha(captcha)
//     // if(!checkCaptcha_)
//     //     return res.status(201).send({
//     //         msg: "Captcha đã hết hạn hoặc không hợp lệ",
//     //         status: false,
//     //         data: null
//     //     });
//     if(amount < 10000)
//           return res.status(201).send({
//             msg: "Vui lòng nạp ít nhất 10.000 đ",
//             status: false,
//             data: null
//         });
//     let deposit_code = uuidv4Payment()
//     let deposit = {
//         code: deposit_code,
//         user: user._id,
//         type,
//         amount_before: amount,
//         status: 0,
//     }
//     if (type == "VIETTEL" || type == "MOBIFONE" || type == "VINAPHONE") {
//         let payment_type = 1
//         const { telco, code, serial } = body
//         let deposit_card = await Settings.findOne({ key: "deposit_card" }).exec()

//         if (!deposit_card || typeof deposit_card.value.partner_id == "undefined" || typeof deposit_card.value.partner_key == "undefined") {
//             return res.status(201).send({
//                 status: false,
//                 msg: "Lỗi hệ thống, không tìm thấy cấu hình nạp card. Liên hệ admin",
//                 data: null
//             })
//         }
//         let { partner_id, partner_key } = deposit_card.value
//         let card = deposit_card.value.card_list.find(card => card.amount == amount && card.status == true)
//         if (!telco || !code || !serial || !amount || !card)
//             return res.status(201).send({
//                 status: false,
//                 msg: "Dữ liệu không hợp lệ",
//                 data: null
//             })
//         let resultCheckCard = await checkCard(deposit_code, type, code, serial, amount, partner_id, partner_key)
//         if (resultCheckCard.status) {
//             deposit.log = [`${moment().format("DD/MM/YYYY HH:mm")} | ${resultCheckCard.msg}`]
//             deposit.amount = (amount / 100) * card.rate
//             deposit.payment_type = payment_type
//             let newDeposit = new History_Deposits(deposit)
//             newDeposit.save().then(async (data) => {
//                 data = data.toObject()
//                 return res.status(200).send({
//                     msg: 'Yêu cầu nạp tiền thành công. Chờ hệ thống xác nhận trong ít phút!',
//                     status: true,
//                     data: newDeposit
//                 });
//             }).catch((err) => {
//                 return res.status(201).send({
//                     msg: "Lỗi yêu cầu nạp tiền: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             })
//         }
//         else
//             return res.status(201).send({
//                 status: false,
//                 msg: resultCheckCard.msg,
//                 data: null
//             })
//     }
//     else {
//         if (type == "MOMO" && amount < 10000) {
//             return res.status(201).send({
//                 status: false,
//                 msg: "Nạp tối thiểu 10.000đ với kênh nạp Momo",
//                 data: null
//             })
//         }
//         let deposit_data = await Settings.findOne({ key: type == "MOMO" ? "deposit_momo" : "deposit_bank" }).exec()
//         let info = type == "MOMO" ? {
//             account_number: deposit_data.value.account_number,
//             account_name: deposit_data.value.account_name,
//             payment_type: 2
//         } : {
//             account_number: deposit_data.value.bank_list.find(bank => bank.bank_name == type).account_number,
//             account_name: deposit_data.value.bank_list.find(bank => bank.bank_name == type).account_name,
//             payment_type: 0
//         }
//         if (!deposit_data) {
//             return res.status(201).send({
//                 status: false,
//                 msg: "Lỗi hệ thống, không tìm thấy cấu hình nạp tiền: " + type == "MOMO" ? "deposit_momo" : "deposit_bank",
//                 data: null
//             })
//         }
//         const { rate } = deposit_data.value
//         deposit.amount = (amount / 100) * rate
//         deposit.payment_type = info.payment_type
//         deposit.account_name = info.account_name
//         deposit.account_number = info.account_number
//         deposit.log = [`${moment().format("DD/MM/YYYY HH:mm")} | Tạo đơn hàng thành công. Vui lòng thanh toán ${curencyFormat(deposit.amount)}`]
//         let newDeposit = new History_Deposits(deposit)
//         newDeposit.save().then(async (data) => {

//             return res.status(200).send({
//                 msg: `Tạo đơn hàng thành công. Vui lòng thanh toán ${curencyFormat(deposit.amount)} theo hướng dẫn`,
//                 status: true,
//                 data: newDeposit
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Lỗi yêu cầu nạp tiền: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     }
// }
// exports.get_deposits = async (req, res) => {
//     try {
//         const { user, body } = req;
//         const { request_type, type, status, owner,search } = body // request_type : 0 admin/ 1 get owner/ 2 get apply
//         let match = {}
//         if (typeof request_type == "undefined" || request_type == null) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Truy vấn không hợp lệ",
//             });
//         }
//         if (request_type == 0) {
//             if (user.role !== 0) {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Không có quyền thực thi",
//                 });
//             }
//             if (typeof owner !== "undefined" && owner !== null) match = {
//                 ...match, user: owner
//             }
//         }
//         else {
//             match.user = user._id
//         }
//         if (typeof type !== "undefined" && type !== null) match = {
//             ...match, type: type
//         }
//         if (typeof status !== "undefined" && status !== null) match = {
//             ...match, status: status
//         }
//         if (search) {
//             match = {
//                 ...match,
//                 $or: [
//                    { log: { $elemMatch: { $regex: search, '$options': 'i' } }},
//                    { code: { $regex: search, '$options': 'i'  }},
//                 ]

//             }
//         }
//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 15;
//         History_Deposits.find(match)
//             .populate({
//                 path: 'user',
//                 select: "_id username phone email"
//             })
//             .sort({ _id: -1 })
//             .skip(page * limit) //Notice here
//             .limit(limit)
//             .exec((err, doc) => {
//                 console.log(err)
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 History_Deposits.countDocuments(match).exec((err, _count) => {
//                     if (err) {
//                         return res.status(201).send({
//                             msg: 'Lấy danh sách thất bại :' + err.message,
//                             status: false,
//                             data: null
//                         });
//                     }
//                     // let count = _count[0]?.count || 0
//                     let count = _count
//                     return res.status(200).send({
//                         msg: 'Lấy danh sách thành công',
//                         status: true,
//                         data: {
//                             total: count,
//                             last_page: parseInt(count / limit),
//                             current_page: page,
//                             pageSize: doc.length,
//                             per_page: limit,
//                             data: doc,
//                         }
//                     });
//                 });
//             });

//     } catch (err) {
//         return res.status(201).send({
//             msg: 'Lấy danh sách thất bại :' + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.update_deposit = async (req, res) => {
//     let { user } = req;
//     let { _id, status, note } = req.body
//     if (!_id || typeof status == "undefined") {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Truy vấn không hợp lệ",
//         });
//     }
//     if (status == 1 && user.role !== 0) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không có quyền thực thi",
//         });
//     }
//     let deposit
//     if (user.role == 0)
//         deposit = await History_Deposits.findOne({ _id }).select("-log").exec()
//     else
//         deposit = await History_Deposits.findOne({ _id, user: user._id }).select("-log").exec()
//     if (!deposit)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy lịch sử nạp tiền này",
//         });

//     let arrayLog = []
//     let user_deposit = null
//     if (note && note !== "" && note !== null) {
//         arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | ${user.role == 0 ? "Admin" : "Người dùng"} viết: ${note}`)
//     }
//     else if (status !== deposit.status && status == 1) {
//         user_deposit = await Users.findOne({ _id: deposit.user }).exec();
//         if (user_deposit) {
//             ////////////
//             user_deposit.balance += deposit.amount;
//             user_deposit.balance_deposit += deposit.amount;
//             deposit.status = 1;
//             deposit.approve_date = moment();
//             deposit.approve_type = "admin";
//             arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Admin cập nhật trạng thái lịch sử nạp tiền`)
//             io.getIO().emit(deposit.user + "_payments", {
//                 msg: `Xác nhận thành công đơn hàng ${deposit.code}`,
//                 data: deposit,
//                 status: true
//             });

//         } else {
//             io.getIO().emit(deposit.user + "_payments", {
//                 msg: `Người dùng nạp tiền không tồn tại`,
//                 data: deposit,
//                 status: false
//             });
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Người dùng nạp tiền không tồn tại",
//             });
//         }
//     }
//     else if (status !== deposit.status && status == 2) {
//         deposit.status = 2;
//         deposit.approve_date = moment();
//         deposit.approve_type = "admin";
//         arrayLog.push(`${moment().format("DD/MM/YYYY HH:mm")} | Admin đã từ chối giao dịch`)
//         io.getIO().emit(deposit.user + "_payments", {
//             msg: `Đơn hàng ${deposit.code} đã bị hủy, hãy liên hệ admin`,
//             data: deposit,
//             status: false
//         });
//     }
//     let update = { ...deposit._doc, $push: { log: { $each: arrayLog } } }
//     History_Deposits.findOneAndUpdate({ _id },
//         update,
//         { "new": true },
//         (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi update lịch sử nạp tiền: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             if (user_deposit) user_deposit.save()
//             data = doc.toObject()
//             return res.status(200).send({
//                 msg: 'Update lịch sử nạp tiền thành công!',
//                 status: true,
//                 data: data
//             });
//         }
//     ).populate({
//         path: 'user',
//         select: "_id username phone email"
//     })
// }
// exports.delete_deposit = async (req, res) => {
//     let { user } = req;
//     let { _id } = req.body
//     if (!_id) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Vui lòng nhập đầy đủ thông tin",
//         });
//     }
//     if (user.role !== 0) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không có quyền thực thi",
//         });
//     }
//     let item = await History_Deposits.findOne({ _id }).exec()
//     if (!item) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy lịch sử nạp tiền này",
//         });
//     }

//     item.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa lịch sử nạp tiền thành công!',
//             status: true,
//             data: item
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa lịch sử nạp tiền: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
