// const Bluebird = require("bluebird");
// const History_Accounts = require("../models/History_Accounts");
// const History_Items = require("../models/History_Items");

// const Settings = require("../models/Settings");
// const Users = require("../models/Users");
// const Accounts = require("../models/Accounts");

// const moment = require("moment");
// const History_Deposits = require("../models/History_Deposit");
// const History_Withdraw = require("../models/History_Withdraws");

// const History_WildCores = require("../models/History_WildCores");
// const History_Wheels = require("../models/History_Wheels");
// const Items = require("../models/Items");
// const Boostings = require("../models/Boostings");
// const { connect_telegram } = require("./telegram.controller");
// const redisClient = require("../../config/redis");
// const clearRedisKey = async(key)=>{
//     await redisClient.keys(key ? key:"*", async function (err, keys) {
//       if (err) return console.log(err);
//       if(keys){
//         console.log("DELETE", keys)
//           for(var i=0;i<keys.length;i++){
//             try {
//               redisClient.del(keys[i])
//             } catch (error) {}
//           }
//       }
//     });
    
//   }
// exports.setting_save = async (req, res) => {
//     try {
//         const { body, user } = req
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         let { settings } = body
//         if (!settings || settings.length == 0)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         let result = {
//             status: true,
//             msg: null
//         }

//         await Bluebird.each(settings, async setting => {
//             if(setting.key == "deposit_momo")
//             {
//                 let momo_data = await redisClient.get("momo_data")
//                 let data = null
//                 if(momo_data)
//                 {
//                     data = JSON.parse(momo_data)     
//                     data = {...data, status: setting.value.status, token: setting.value.token}
//                 }
//                 else 
//                 data = {
//                     status: setting.value.status, token: setting.value.token, balance: 0, transaction: []
//                 }
//                 await redisClient.set("momo_data", JSON.stringify(data), function (err, value) {
//                     if (err)
//                         console.log(err.message)
//                     else {
//                         if (value == "OK") {
//                             console.log("Momo set first data")
//                         }
//                     }
//                 })
//             }
//             if(setting.key == "deposit_bank")
//             {
//                 let acb = setting.value.bank_list.find(bank => bank.bank_name == "ACB")
//                 let techcombank = setting.value.bank_list.find(bank => bank.bank_name == "TECHCOMBANK")
//                 if(acb)
//                 {
//                     let acb_data = await redisClient.get("acb_data")
//                     let data = null
//                     if(acb_data)
//                     {
//                         data = JSON.parse(acb_data)     
//                         data = {...data, status: acb.status, token: acb.token, password: acb.password, account_number: acb.account_number,}
//                     }
//                     else 
//                     data = {
//                         status: acb.status, token: acb.token, password: acb.password, account_number: acb.account_number, transaction: []
//                     }
//                     await redisClient.set("acb_data", JSON.stringify(data), function (err, value) {
//                         if (err)
//                             console.log(err.message)
//                         else {
//                             if (value == "OK") {
//                                 console.log("ACB set first data")
//                             }
//                         }
//                     })
//                 }
//                 else clearRedisKey("acb_data")
//                 if(techcombank)
//                 {
//                     let techcombank_data = await redisClient.get("techcombank_data")
//                     let data = null
//                     if(techcombank_data)
//                     {
//                         data = JSON.parse(techcombank_data)     
//                         data = {...data, status: techcombank.status, token: techcombank.token, password: techcombank.password, account_number: techcombank.account_number,}
//                     }
//                     else 
//                     data = {
//                         status: techcombank.status, token: techcombank.token, password: techcombank.password, account_number: techcombank.account_number, transaction: []
//                     }
//                     await redisClient.set("techcombank_data", JSON.stringify(data), function (err, value) {
//                         if (err)
//                             console.log(err.message)
//                         else {
//                             if (value == "OK") {
//                                 console.log("TECHCOMBANK set first data")
//                             }
//                         }
//                     })
//                 }
//                 else clearRedisKey("techcombank_data")
               
//             }
//             Settings.findOneAndUpdate({ _id: setting._id }, { ...setting }, { new: true }, function (error, doc) {
//                 if (error) {
//                     result = {
//                         status: false,
//                         msg: error.message
//                     }

//                 }
//             });
//         })
//         connect_telegram()
        
        
//         return res.status(result.status ? 200 : 201).send({
//             msg: result.status ? "Lưu cấu hình thành công" : `Lưu cấu hình thất bại: ${result.msg}`,
//             status: result.status,
//             data: result.status ? settings : null
//         });


//     } catch (err) {
//         return res.status(201).send({
//             msg: "Lỗi lưu cấu hình: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.setting_set = async (req, res) => {
//     try {
//         const { body, user } = req
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         const { key, value, description, type } = body
//         if (!key || !value || !description || isNaN(type)) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         Settings.findOneAndUpdate(
//             { key },
//             { value, description, type },
//             { upsert: true, new: true },
//             (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi set setting: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }

//                 return res.status(200).send({
//                     msg: 'Set setting thành công!',
//                     status: true,
//                     data: doc
//                 });
//             }
//         )
//     } catch (err) {
//         return res.status(201).send({
//             msg: "Lỗi set setting: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.setting_get = async (req, res) => {
//     try {
//         const { user } = req
//         if (user.role !== 0)
//             return res.status(201).send({
//                 msg: 'Bạn không có quyền thực thi',
//                 status: false,
//                 data: []
//             });
//         let settings = await Settings.find({}).exec()

//         return res.status(200).send({
//             msg: 'Get setting thành công!',
//             status: true,
//             data: settings
//         });
//     } catch (error) {
//         return res.status(201).send({
//             msg: "Lỗi get setting: " + error.message,
//             status: false,
//             data: []
//         });
//     }
// }
// exports.server = async (req, res) => {
//     try {
//         let arrayKey = ["wildcore", "link", "popup", "deposit_bank", "deposit_momo", "deposit_card", "rank_price", "rank_date", "boost_profit", "ctv_fee", "riot_account", "contact", "share_profit", "sell_count"]
//         let settings = await Settings.find({ key: { $in: arrayKey } }).select("key value").exec()
//         if (settings.length == arrayKey.length) {
//             await Bluebird.each(settings, setting => {
//                 if (setting.key == "deposit_bank") {
//                     setting.value.bank_list.map(s => {
//                         delete s.password
//                         delete s.token
//                     })
//                 }
//                 else if (setting.key == "deposit_momo") {
//                     delete setting.value.token
//                     delete setting.value.password
//                 }
//                 else if (setting.key == "deposit_card") {
//                     delete setting.value.partner_id
//                     delete setting.value.partner_key
//                 }
//             })
//             return res.status(200).send({
//                 msg: 'Get cấu hình thành công!',
//                 status: true,
//                 data: settings
//             });
//         }
//         else {
//             return res.status(201).send({
//                 msg: "Cấu hình server không đầy đủ",
//                 status: false,
//                 data: []
//             });
//         }
//     } catch (error) {
//         return res.status(201).send({
//             msg: "Lỗi get cấu hình server: " + error.message,
//             status: false,
//             data: []
//         });
//     }
// }

// exports.summarys = async (req, res) => {
//     const { user, body } = req
//     if(user.role !== 0)
//     return res.status(201).send({
//         msg: 'Bạn không có quyền thực thi',
//         status: false,
//         data: []
//     });
//     try {
//         let { from_date, to_date } = body
//         let match = {}
//         if (from_date) {
//             from_date = moment(from_date, "DD-MM-YYYY").set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
//             to_date = moment(to_date, "DD-MM-YYYY").set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
//         }
//         else {
//             from_date = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
//             to_date = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
//         }
//         from_date = new Date(from_date)
//         to_date = new Date(to_date)
//         match = { "createdAt": { $gte: from_date, $lt: to_date } }
//         // console.log(match)
//         let account = await Accounts.aggregate(
//             [{
//                 "$facet": {
//                     "is_live": [{ "$match": { type: 0 } }, { "$count": "total" }],
//                     "is_sell": [{ "$match": { type: 1 } }, { "$count": "total" }],
//                     "is_giveaway": [{ "$match": { type: 2 } }, { "$count": "total" }],
//                     "is_store": [{ "$match": { type: 3 } }, { "$count": "total" }],
//                 }
//             }])
//         let item = await Items.aggregate(
//             [{
//                 "$facet": {
//                     "is_live": [{ "$match": { type: 0 } }, { "$count": "total" }],
//                     "is_store": [{ "$match": { type: 1 } }, { "$count": "total" }],
//                 }
//             }])
//         let user = await Users.aggregate([{
//             "$facet": {
//                 "today_user": [{ "$match": match }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_user: {
//                             $sum: 1
//                         },
//                     }
//                 }, { $sort: { "_id": 1 } },
//                 ],
//                 "summary_user": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_user: {
//                             $sum: 1
//                         },
//                         total_balance: {
//                             $sum: "$balance"
//                         },
//                         total_balance_wildcore: {
//                             $sum: "$balance_wildcore"
//                         },
//                         total_balance_withdraw: {
//                             $sum: "$balance_withdraw"
//                         },
//                         total_balance_wildcore_withdraw: {
//                             $sum: "$balance_wildcore_withdraw"
//                         },
//                         total_balance_deposit: {
//                             $sum: "$balance_deposit"
//                         },
//                     }
//                 }],
    
//             }
//         }])
//         let account_history = await History_Accounts.aggregate([{
//             "$facet": {
//                 "today_order": [{ "$match": match }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 },
//                 { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match": match }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
//                 "summary_order": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
    
//             }
//         }])
//         let item_history = await History_Items.aggregate([{
//             "$facet": {
//                 "today_order": [
    
//                     { "$match": match },
//                     {
//                         $group: {
//                             _id: {
//                                 $dateToString: {
//                                     format: "%d-%m-%Y",
//                                     date: "$createdAt"
//                                 }
//                             },
//                             total_order: {
//                                 $sum: 1
//                             },
//                             total_price: {
//                                 $sum: "$price"
//                             },
//                         }
//                     },
//                     { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match": match }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
//                 "summary_order": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
    
//             }
//         }])
//         let wheel_history = await History_Wheels.aggregate([{
//             "$facet": {
//                 "today_order": [{ "$match": { ...match } }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 },
//                 { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match": match }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
//                 "summary_order": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
//             }
//         }])
//         let boosting_history = await Boostings.aggregate([{
//             "$facet": {
//                 "today_order": [{ "$match": { ...match } }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 },
//                 { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match": match }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
//                 "summary_order": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$price"
//                         },
//                     }
//                 }],
//             }
//         }])
//         let deposit_history = await History_Deposits.aggregate([{
//             "$facet": {
//                 "today_order": [{ "$match": {...match, status: 1} }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 },
//                 { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match": {...match, status: 1}}, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 }],
    
//                 "summary_order": [{ "$match": {status: 1} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     },
    
    
//                 },
    
//                 ],
    
//             }
//         }])
//         let wildcore_history = await History_WildCores.aggregate([{
//             "$facet": {
//                 "today_order": [{ "$match": match }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 },
//                 { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match":match }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 }],
             
//                 "summary_order": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 }
//                 ],
    
//             }
//         }])
//         let withdraw_history = await History_Withdraw.aggregate([{
//             "$facet": {
//                 "today_order": [{ "$match": match }, {
//                     $group: {
//                         _id: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: "$createdAt"
//                             }
//                         },
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 },
//                 { $sort: { "_id": 1 } },
//                 ],
//                 "summary_today": [{ "$match":match }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 }],
             
//                 "summary_order": [{ "$match": {} }, {
//                     $group: {
//                         _id: null,
//                         total_order: {
//                             $sum: 1
//                         },
//                         total_price: {
//                             $sum: "$amount"
//                         },
//                     }
//                 }
//                 ],
    
//             }
//         }])
//         let data = { user, item, account, account_history, item_history, wheel_history, boosting_history, wildcore_history, deposit_history, withdraw_history }
//         return res.status(200).send({
//             msg: 'Get thành công!',
//             status: true,
//             data: data
//         });
//     } catch (error) {
//         return res.status(201).send({
//             msg: 'Get thống kê không thành công!',
//             status: false,
//             data: null
//         });
//     }
   
// }
// exports.get_pending = async (req, res) => {
//     const { user, body } = req
//     if(user.role !== 0)
//     return res.status(201).send({
//         msg: 'Bạn không có quyền thực thi',
//         status: false,
//         data: []
//     });
//     let boosting = await Boostings.aggregate( [
//         { $match: {type: 0}},
//         { $group: { _id: null, pending: { $sum: 1 } } },
       
//      ]).exec()
//     let item = await History_Items.aggregate( [
//         { $match: {type: 0}},
//         { $group: { _id: null, pending: { $sum: 1 } } },
//      ]).exec()
//     let wildcore = await History_WildCores.aggregate( [
//         { $match: {type: 0}},
//         { $group: { _id: null, pending: { $sum: 1 } } },
//      ]).exec()
//      let withdraw = await History_Withdraw.aggregate( [
//         { $match: {type: 0}},
//         { $group: { _id: null, pending: { $sum: 1 } } },
//      ]).exec()
//     return res.status(200).send({
//         msg: 'Get thành công!',
//         status: true,
//         data: {boosting, item, wildcore, withdraw}
//     });
// }
