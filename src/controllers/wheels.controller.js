// const Accounts = require("../models/Accounts");
// const Discounts = require("../models/Discounts");
// const History_Accounts = require("../models/History_Accounts");
// const History_Wheels = require("../models/History_Wheels");
// const Wheels = require("../models/Wheels");
// const { uuidv4Payment, curencyFormat } = require("../utils/help");
// const moment = require("moment")

// exports.add_wheel = async (req, res) => {
//     try {
//         const { user, body } = req;
//         const { name, price, img, img_wheel, description, config, play_times, url, order, step } = body;
//         if (!name || isNaN(price) || !img || !img_wheel || !description || !config || typeof play_times == "undefined" || !url || typeof order == "undefined") {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         let hasEmpty = false
//         let checkUrl = await Wheels.findOne({url: url}).exec()
//         if(checkUrl)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Url vòng quay này đã tồn tại trong hệ thống",
//             });
//         config.map(item => {
//             if (item.type == 1 && (item.account_category == null || typeof item.account_category == "undefined" || item.account_category == "")) hasEmpty = true
//             else if (item.type == 0 && item.value == 0) hasEmpty = true
//             else if (typeof item.play_times_next == "undefined" || typeof item.play_times == "undefined" || typeof item.type == "undefined"
//                 || typeof item.value == "undefined" || typeof item.name == "undefined") hasEmpty = true
//             else if (isNaN(item.play_times) || item.play_times !== 0 || item.name == "" || item.play_times_next == 0) hasEmpty = true
//         })
//         let checkStep = step.split("|")
//         if(checkStep.length !== 8 || checkStep[0] !== "1") 
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Kiểm tra lại cấu hình step vòng quay",
//         });
//         if (hasEmpty || config.length !== 8) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng kiểm tra lại cấu hình vòng quay",
//             });
//         }

//         let newWheel = new Wheels({
//             name, price, img, img_wheel, description, config, play_times, next_round: checkStep[1], url, order, step
//         })
//         return newWheel.save().then(async (data) => {
//             data = data.toObject()
//             return res.status(200).send({
//                 msg: 'Thêm vòng quay thành công!',
//                 status: true,
//                 data: data
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Lỗi thêm vòng quay: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (err) {
//         return res.status(201).send({
//             msg: "Lỗi thêm vòng quay: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.update_wheel = async (req, res) => {
//     try {
//         const { user, body } = req;
//         const { _id, name, price, img, img_wheel, description, config, play_times, status, url, order, step } = body;
//         if (!_id || !name || isNaN(price) || !img || !img_wheel || !description || !config || typeof play_times == "undefined" || ![true, false].includes(status) || !url || typeof order == "undefined") {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         let hasEmpty = false
//         let round = 0
//         for (let index = 0; index < config.length; index++) {
//             const item = config[index];
//             if (item.type == 1 && (item.account_category == null || typeof item.account_category == "undefined" || item.account_category == "")) hasEmpty = true
//             else if (item.type == 0 && item.value == 0) hasEmpty = true
//             else if (typeof item.play_times_next == "undefined" || typeof item.play_times == "undefined" || typeof item.type == "undefined"
//                 || typeof item.value == "undefined" || typeof item.name == "undefined") hasEmpty = true
//             else if (isNaN(item.play_times) || item.name == "") hasEmpty = true
//             if(hasEmpty == true){
//                 round = index
//                 break
//             }
//         }
    
//         if (hasEmpty || config.length !== 8) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: `Vui lòng kiểm tra lại cấu hình vòng quay bậc ${round+1}`,
//             });
//         }
//         let checkUrl = await Wheels.findOne({url: url, _id: {$ne: _id}}).exec()
//         if(checkUrl)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Url vòng quay này đã tồn tại trong hệ thống",
//             });
//         let checkStep = step.split("|")
//         if(checkStep.length !== 8 || checkStep[0] !== "1") 
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Kiểm tra lại cấu hình step vòng quay",
//         });
//         config.map(c => c.play_times = 0)
//         Wheels.findOneAndUpdate({ _id },
//             { name, price, img, img_wheel, description, config, play_times, status , url, next_round: checkStep[1], order, step},
//             { "new": true },
//             async (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi update vòng quay: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 data = doc.toObject()

//                 return res.status(200).send({
//                     msg: 'Update vòng quay thành công!',
//                     status: true,
//                     data: data
//                 });
//             }
//         )
//     } catch (err) {
//         return res.status(201).send({
//             msg: "Lỗi update vòng quay: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.play = async (req, res) => {
//     try {
//         const { user, body } = req
//         let { _id } = body
//         let newHistory = null
//         if (!_id) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vòng quay không khả dụng, thử lại",
//             });
//         }
//         let wheel = await Wheels.findOne({ _id, status: true }).exec()
//         if (!wheel)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vòng quay không khả dụng, thử lại",
//             });
//         if (user.balance < wheel.price)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Số dư không đủ để quay vòng quay này. Vui lòng nạp thêm tiền",
//             });
//         let step = wheel.step.split("|")

//         user.balance = user.balance - wheel.price
//         wheel.play_times += 1
//         wheel.total_price += wheel.price

//         let config_array = wheel.config
//         let current_config
//         let current_round = 1
//         if (config_array[0].play_times >= config_array[0].play_times_next) {
//             current_round = wheel.next_round
//             config_array[0].play_times = 0
//             current_config = config_array[wheel.next_round - 1]
//         }
//         else current_config = config_array[current_round - 1]

//         ///////////////////
//         let msg = ""
//         if (current_config.type == 0) // Cộng wildcore
//         {
//             user.balance_wildcore += Number(current_config.value)
//             msg = `Chúc mừng bạn đã trúng phần thưởng: ${current_config.value} WildCore`
//         }
//         else if (current_config.type == 1) {
//             let account_list = await Accounts.find({ category: current_config.account_category, $or: [{type: 0}, {type: 3}] }).exec()
//             if (account_list.length == 0)
//                 msg = `Chúc mừng bạn đã trúng phần thưởng: 1 Account ${current_config.name}. Vui lòng báo cáo với Admin để nhận phần thưởng`
//             else {
//                 let account_give = account_list[0]
//                 await Accounts.updateOne({ _id: account_give._id }, {
//                     type: 2, 
//                     owner: user._id, 
//                     sell_date: moment(),                        
//                     $push: { log: `${moment().format("DD/MM/YYYY - HH:mm")} | User ${user.username} được tặng 1 account giá ${curencyFormat(account_give.price)}` }
//             }).exec()
//                 msg = `Chúc mừng bạn đã trúng phần thưởng: 1 Account ${current_config.name}`
//                 newHistory = new History_Accounts({
//                     user: user._id,
//                     account: account_give._id,
//                     discount: null,
//                     discount_ref: null,
//                     price: account_give.price,
//                     price_before: account_give.price,
//                     note: msg,
//                 })
//             }
//         }
//         else if(current_config.type == 3)
//         {
//             let {discount_discount_type, discount_amount, discount_expried, discount_type, value } = current_config
//             let discount_code = uuidv4Payment()
//             let newDiscount = new Discounts({
//                 discount_code, 
//                 start_date : moment(), 
//                 end_date: moment().add(discount_expried, "day"), 
//                 value, 
//                 discount_type: discount_discount_type, 
//                 type: discount_type,
//                 amount: discount_amount, 
//                 total_use: 0, 
//                 status: true,
//                 from: 1
//             })
//             newDiscount.save()
//             msg = `Chúc mừng bạn đã nhận: ${current_config.name} - CODE: ${discount_code} - HSD: ${discount_expried} ngày, ${
//             discount_type == 0 ? "sử dụng mua account" : discount_type == 1 ? "sử dụng mua item" : discount_type == 2 ? "sử dụng cày thuê" : "sử dụng tất cả dịch vụ"}`
//         }
//         else if (current_config.type == 4) // Cộng tienef
//         {
//             user.balance = user.balance + Number(current_config.value)
//             msg = `Chúc mừng bạn đã trúng phần thưởng: Cộng ${curencyFormat(current_config.value)}`
//         }
//         else // Chúc may mắn lần sau
//         {
//             msg = `Opps! Chúc bạn may mắn lần sau`
//         }
//         //////////////////
//         current_config.play_times += 1
//         config_array[current_round - 1] = {
//             ...current_config
//         }
//         // console.log(step)
//         if (current_round !== 1 && current_config.play_times >= current_config.play_times_next) {
           
//             let index_current = step.indexOf(current_round.toString())
//             wheel.next_round = step[index_current + 1]
//             // console.log("current_round", current_round, index_current, wheel.next_round)


//             if (wheel.next_round == undefined) {
//                 wheel.next_round = step[1]
//                 config_array = config_array.map(config =>
//                     config.play_times !== 0
//                         ? { ...config, play_times: 0 }
//                         : config
//                 );
//             }
//         }
       

//         wheel.config = config_array

//         Wheels.findOneAndUpdate({ _id },
//             { ...wheel },
//             { "new": true },
//             async (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi hệ thống. Vui lòng thử lại: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 user.save()
//                 if(newHistory) newHistory.save()
//                 await History_Wheels.create({ user: user._id, wheel: wheel._id, price: wheel.price, type: current_config.type, msg: msg, result: current_round })
//                 return res.status(200).send({
//                     msg: msg,
//                     status: true,
//                     data: current_round,
//                     type: current_config.type,
//                     // user: user
//                 });
//             }
//         )
//     } catch (error) {

//         console.log(error)
//         return res.status(201).send({
//             msg: "Lỗi hệ thống. Vui lòng thử lại: " + error.message,
//             status: false,
//             data: null
//         });
//     }

// }
// exports.get_wheels_user = async (req, res) => {
//     let {url} = req.body
//     let match = {status: true, url:{$ne:"test-vong-quay"}}
//     if(url) match.url = url
//     var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//     var limit = parseInt(req.body.limit) || 15;
//     try {
//         Wheels.find(match)
//         .sort({ order: 1 })
//         .skip(page * limit) //Notice here
//         .limit(limit)
//         .exec((err, doc) => {
//           if (err) {
//             return res.status(201).send({
//               msg: 'Lấy danh sách thất bại :' + err.message,
//               status: false,
//               data: null
//             });
//           }
//           Wheels.countDocuments(match).exec((err, _count) => {
//             if (err) {
//               return res.status(201).send({
//                 msg: 'Lấy danh sách thất bại :' + err.message,
//                 status: false,
//                 data: null
//               });
//             }
//             // let count = _count[0]?.count || 0
//             let count = _count
//             return res.status(200).send({
//               msg: 'Lấy danh sách thành công',
//               status: true,
//               data: {
//                 total: count,
//                 last_page: parseInt(count / limit),
//                 current_page: page,
//                 pageSize: doc.length,
//                 per_page: limit,
//                 data: doc,
//               }
//             });
//           });
//         });
        
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách vòng quay thất bại: " + error.message,
//         });

//     }
// }
// exports.get_wheels = async (req, res) => {
//     const {user} = req
//     let { dashboard, status, search } = req.body
//     let match = {}
//     if(dashboard)
//     {
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         match = {}
//         if (status !== null) match = {
//             ...match, status
//         }
//     }
//     else {
//         match = {status: true}
//     }
   
//     if (search) {
//        match = {
//             ...match,
//             $or: [
//                 { "name": { $regex: search, '$options': 'i' } },
//                 { "description": { $regex: search, '$options': 'i' } },
//             ],
//         }
//     }

//     var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//     var limit = parseInt(req.body.limit) || 15;
//     try {
//         Wheels.find(match)
//         .sort({ order: 1 })
//         .skip(page * limit) //Notice here
//         .limit(limit)
//         .exec((err, doc) => {
//           if (err) {
//             return res.status(201).send({
//               msg: 'Lấy danh sách thất bại :' + err.message,
//               status: false,
//               data: null
//             });
//           }
//           Wheels.countDocuments(match).exec((err, _count) => {
//             if (err) {
//               return res.status(201).send({
//                 msg: 'Lấy danh sách thất bại :' + err.message,
//                 status: false,
//                 data: null
//               });
//             }
//             // let count = _count[0]?.count || 0
//             let count = _count
//             return res.status(200).send({
//               msg: 'Lấy danh sách thành công',
//               status: true,
//               data: {
//                 total: count,
//                 last_page: parseInt(count / limit),
//                 current_page: page,
//                 pageSize: doc.length,
//                 per_page: limit,
//                 data: doc,
//               }
//             });
//           });
//         });
        
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách vòng quay thất bại: " + error.message,
//         });

//     }
// }
// exports.delete_wheel = async (req, res) => {
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
//     let item = await Wheels.findOne({ _id }).exec()
//     if (!item) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy vòng quay này",
//         });
//     }
   
//     item.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa vòng quay thành công!',
//             status: true,
//             data: item
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa vòng quay: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.get_historys = async (req, res) => {
//     try {
//         const { user, body } = req;
//         const { request_type, owner, wheel } = body // request_type : 0 admin/ 1 get 
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
     
//         if (typeof wheel !== "undefined" && wheel !== null) match = {
//             ...match, wheel: wheel
//         }

//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 15;
//         History_Wheels.find(match)
//             .populate({
//                 path: 'wheel',
//                 select: '_id name img_wheel price',
//             })
//             .populate({
//                 path: 'user',
//                 select: "_id username phone email"
//             })
           
//             .sort({ _id: -1 })
//             .skip(page * limit) //Notice here
//             .limit(limit)
//             .exec((err, doc) => {
//                 // console.log(err)
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 History_Wheels.countDocuments(match).exec((err, _count) => {
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
//         // console.log(err)
//         return res.status(201).send({
//             msg: 'Lấy danh sách thất bại :' + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.search_wheel = async (req, res) => {
//     const { body } = req
//     const search = body.search
//     let match
//     if (search) {
//         match = { name: { $regex: search, '$options': 'i' }}
//     }
//     else {
//         return res.status(201).send({
//             data: [],
//             msg: "Tìm kiếm không hợp lệ",
//             status: false,
//         });
//     }
//     Wheels.find(match)
//         .sort({ _id: -1 })
//         .select("_id name")
//         .exec((err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: 'Lấy danh sách thất bại :' + err.message,
//                     status: false,
//                     data: []
//                 });
//             }

//             return res.status(200).send({
//                 msg: 'Lấy danh sách thành công',
//                 status: true,
//                 data: doc
//             });

//         });

// };