// const Boostings = require("../models/Boostings");
// const Settings = require("../models/Settings");
// const Users = require("../models/Users");
// const moment = require("moment");
// const { uuidv4Payment, getPaymentPrice, get_rank_name, curencyFormat } = require("../utils/help");
// const Discounts = require("../models/Discounts");
// const { sendTelegram } = require("./telegram.controller");
// var ObjectId = require("mongodb").ObjectId;

// exports.buy_boost = async (req, res) => {
//     try {
//         const { user, body } = req
//         let { current_rank, want_rank, username, password, log, discount_code, rank_type } = body
//         if(!user.phone) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng cập nhật sđt trước khi đặt hàng",
//             });
//         }
//         if(discount_code)  discount_code = discount_code?.trim()
//         if (!current_rank || !want_rank || !username || !password || isNaN(rank_type)) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         let checkExits = await Boostings.findOne({username, $or:[{type: 0},{ type: 1}]}).exec()
//         if(checkExits)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: `Tài khoản ${username} đang được cày thuê trên hệ thống. Vui lòng liên hệ Admin`,
//             });
//         let rank_price = await Settings.findOne({ key: "rank_price" }).exec()
//         if (!rank_price) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Không tìm thấy cấu hình rank_price",
//             });
//         }
//         let rank_date = await Settings.findOne({ key: "rank_date" }).exec()
//         if (!rank_date) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Không tìm thấy cấu hình rank_date",
//             });
//         }
//         let price = 0
//         let finish_date = 1
//         let current_rank_index = Object.keys(rank_price.value).indexOf(current_rank);
//         let want_rank_index = Object.keys(rank_price.value).indexOf(want_rank);
//         let price_list = Object.entries(rank_price.value).slice(current_rank_index + 1, want_rank_index + 1)
//         price_list.map(rank => {
//             price += rank[1].price
//         })
//         ////////
//         let current_rank_index_finish = Object.keys(rank_date.value).indexOf(current_rank.split("_")[0]);
//         let want_rank_index_finish = Object.keys(rank_date.value).indexOf(want_rank.split("_")[0]);
//         let finish_list = Object.entries(rank_date.value).slice(current_rank_index_finish + 1, want_rank_index_finish + 1)
//         finish_list.map(day => {
//             finish_date += day[1]
//         })
//         if (price == 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Gói cày thuê không hợp lệ",
//             });
//         }
//         let price_before = price
//         let note = ""
//         let discount_id = null
//         let paymentPrice = await getPaymentPrice(null, discount_code, price_before, 2, user)
//         if(!paymentPrice.status)
//             return res.status(201).send({
//                 data: null,
//                 msg: paymentPrice.message,
//                 status: false,
//             });
//         else {
//             price = paymentPrice.data
//             note = paymentPrice.note
//             discount_id = paymentPrice.discount_id
//         }

//         if(user.balance < price){
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không đủ tiền để đặt hàng. Vui lòng nạp thêm tiền vào tài khoản",
//             });
//         }
//         user.balance = user.balance - price
//         let newBoost = new Boostings({
//             id:uuidv4Payment(),
//             log: [`${moment().format("DD/MM/YYYY HH:mm")} | Người dùng tạo đơn hàng(${username}|${password}|${rank_type == 0 ?"Đơn/Đôi" : "Flex"}|Chờ nhận đơn). ${log ? "Ghi chú: " + log : ""}. ${note !== "" && note ? note: ""}`],
//             current_rank,
//             want_rank,
//             username,
//             password,
//             rank_type,
//             price,
//             price_before,
//             discount: discount_id,
//             owner: user._id,
//             finish_date: moment().add(finish_date, "day"),
//             type: 0
//         })
//         return newBoost.save().then(async (data) => {
//             user.save()
//             if(discount_id)
//                 await Discounts.updateOne(
//                     { _id: discount_id },
//                     { $inc: { total_use: 1, amount: -1 } }
//                 ).exec()
//             let content =
//             `Đơn hàng cày thuê | ${moment().format("DD/MM - HH:mm")}\r\n` +
//             `-------------------\r\n` +
//             `${get_rank_name(current_rank)} -> #${get_rank_name(want_rank)}\r\n` +
//             `Người đặt: ${user.name} - ${user.phone}\r\n` +
//             `Giá gốc: ${curencyFormat(price_before)}\r\n` +
//             `Tổng tiền: ${curencyFormat(price)}\r\n` +
//             `-------------------\r\n`
//             sendTelegram(content,"boosting")
//             return res.status(200).send({
//                 msg: 'Đặt hàng cày thuê thành công. Nhân viên sẽ liên hệ với bạn sớm nhất có thể',
//                 status: true,
//                 data: data
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Đặt hàng cày thuê thất bại: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (err) {
//         return res.status(201).send({
//             msg: "Đặt hàng cày thuê thất bại: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.update_boost = async (req, res) =>{
//     const {user, body} = req;
//     let {_id, current_rank, want_rank, username, password, price, receiver, finish_date, type, add_log, owner, rank_type} = body
//     let boost = null
//     let ownerUser = null
//     let receiverUser = null

//     if(user.role == 0)
//     {
//         if(!_id || !current_rank || !want_rank || !username || !password || isNaN(price) || typeof type == "undefined")
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         boost = await Boostings.findOne({_id}).exec()
//         boost.current_rank = current_rank
//         boost.want_rank = want_rank
//         boost.username = username
//         boost.password = password
//         boost.price = price
//         boost.finish_date = finish_date
//         boost.receiver = receiver
//         boost.rank_type = rank_type
//     }
//     else {
//         if(!_id || typeof type == "undefined" || !username || !password || typeof rank_type == "undefined" )
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin" ,
//             });
//         }
//         boost = await Boostings.findOne({_id, owner: user._id}).exec()
//         boost.username = username
//         boost.password = password
//         boost.rank_type = rank_type
//     }

//     if(!boost)
//     {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Đơn hàng này không tồn tại hoặc bạn không có quyền chỉnh sửa",
//         });
//     }
//     let log = add_log ? `${moment().format("DD/MM/YYYY HH:mm")} | ${user.role == 0 ? "Admin" : "Người dùng"} viết: ${add_log}` : 
//     type!== boost.type ? `${moment().format("DD/MM/YYYY HH:mm")} | ${user.role == 0 ? "Admin" : "Người dùng"} cập nhật trạng thái đơn hàng`: `${moment().format("DD/MM/YYYY HH:mm")} | ${user.role == 0 ? "Admin" : "Người dùng"} cập nhật ${username+"|"+password+"|"+(rank_type==0? "Đơn/Đôi":"Flex/Linh hoạt")+"|"+(type == 0 ?"Chờ nhận đơn" : type== 1 ? "Đã nhận đơn" : type== 2 ? "Hủy đơn" : "Hoàn thành")}`

//     if(user.role == 0)
//     {
//         if(type == 0)
//         {
//            if(boost.type == 2) /// hủy -> chưa nhận
//            {
//                 ownerUser = await Users.findOne({_id: boost.owner}).exec()
//                 ownerUser.balance = ownerUser.balance - price
//            }
//            else if(boost.type == 3)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Đơn hàng này đã hoàn thành, không thể cập nhật trạng thái",
//             });
//             boost.receiver = null
//             boost.received_date = null

//         }
//         if(type == 1)
//         {
//             if(receiver == null)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng chọn ctv nhận tài khoản",
//                 });
//             else if(boost.type == 3)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Đơn hàng này đã hoàn thành, không thể cập nhật CTV",
//                 });
//             else if(boost.type == 2) // hủy - > nhận
//             {
//                 ownerUser = await Users.findOne({_id: boost.owner}).exec()
//                 ownerUser.balance = ownerUser.balance - price
//             }
//             if(type !== boost.type)
//             {
//                 boost.receiver = receiver
//                 boost.received_date = moment()
//                 log = `${moment().format("DD/MM/YYYY HH:mm")} | Admin cập nhật CTV nhận đơn cày thuê`
//             }
       
//         }
//         if(type == 2) // hủy
//         {
//             if(boost.type == 3)
//             {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Đơn hàng này đã hoàn thành, không thể hủy",
//                 });
//             }
//             else if(boost.type == 1 || boost.type == 0)
//             {
//                 ownerUser = await Users.findOne({_id: boost.owner}).exec()
//                 ownerUser.balance = ownerUser.balance + price
//             }
//             if(boost.type !== type)
//             {
//                 log = `${moment().format("DD/MM/YYYY HH:mm")} | Admin hủy đơn hàng`
//             }
//             boost.receiver = null
//             boost.received_date = null
//         }
//     }
//     else {
//         if((type == 0 || type == 1)  && type !== boost.type)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn chỉ có thể hủy hoặc xác nhận đơn hàng đã hoàn thành",
//             });
//         else if(type == 2)
//         {
//             if(boost.type == 1)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Đơn hàng này đã được CTV nhận, bạn không thể hủy bỏ. Vui lòng liên hệ admin",
//                 });
//             else if(boost.type == 3)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Đơn hàng này đã hoàn thành, không thể hủy",
//                 });
//             else if(type !== boost.type) {
               
//                 user.balance = owner.balance + boost.price 
//                 log = `${moment().format("DD/MM/YYYY HH:mm")} | Người dùng hủy đơn hàng`
                
//             }
//         }
//     }
//     if (type == 3) // hoàn thành
//     {
//         if(boost.type == 2)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Đơn hàng này đã hủy, không thể hoàn thành",
//             });
//         if(boost.receiver == null || boost.type == 0)
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: user.role == 0  ?  "Vui lòng chọn CTV trước khi hoàn thành đơn hàng" :"Đơn hàng này chưa có người nhận cày thuê. Không thể hoàn thành" 
//             })
//         }
//         else if(type !== boost.type){
            
//             let boost_profit = await Settings.findOne({key: "boost_profit"}).exec()
//             if(!boost_profit)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Không tìm thấy cấu hình boost_profit"
//                 })
//             receiverUser = await Users.findOne({_id: boost.receiver}).exec()
//             if(!receiverUser)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Không tìm thấy ctv để trả thưởng"
//                 })
//             receiverUser.balance = receiverUser.balance + ((boost.price / 100) * boost_profit.value)
//             log = `${moment().format("DD/MM/YYYY HH:mm")} | ${user.role == 0 ? "Admin" : "Người dùng"} xác nhận đơn hàng hoàn thành`
//         }
//     }
//     let update = boost.toObject()
//     delete update.log
//     if(log)
//         update = {
//             ...update, 
//             type: type,
//             $push: { log: log}
//         }
//     else 
//         update = {
//             ...update, 
//             type: type,
       
//         }

//     Boostings.findOneAndUpdate({ _id },
//         update,
//         { "new": true },
//         (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi update đơn hàng cày thuê: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             if(receiverUser) receiverUser.save()
//             if(ownerUser) ownerUser.save()
//             user.save()
//             data = doc.toObject()
//             data.owner = owner
//             data.receiver = receiver
//             return res.status(200).send({
//                 msg: 'Update đơn hàng cày thuê thành công!',
//                 status: true,
//                 data: data
//             });
//         }
//     ).populate({
//         path: 'owner',
//         select: "_id username phone name"
        
//     })
//     .populate({
//         path: 'receiver',
//         select: "_id username phone name"
        
//     })
// }
// exports.get_boost  = async (req, res) =>{
//     try {
//         const {user, body} = req;
//         const {type, owner, receiver, request_type, search} = body // request_type : 0 admin/ 1 get owner/ 2 get apply // get list
//         let match = {}
//         if(typeof request_type == "undefined" || request_type == null)
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Truy vấn không hợp lệ",
//             });
//         }
//         if(request_type == 0)
//         {
//             if(user.role !== 0)
//             {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Không có quyền thực thi",
//                 });
//             }
//             if(typeof owner !== "undefined" && owner !== null) match.owner = owner
//             if(typeof receiver !== "undefined" && receiver !== null) match.receiver = receiver

//         }
//         else if(request_type == 1)
//         {
//             match.owner = user._id
//         }
//         else if(request_type == 2){
//             match.receiver = user._id
//         }
//         else if(request_type == 3) {
//             match.type = 0
//         }
//         else {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Truy vấn không hợp lệ",
//             });
//         }
//         if(typeof type !== "undefined" && type !== null && request_type !== 3) match.type = type
//         if (search) {
//             match = {
//                  ...match,
//                  $or: request_type !== 3 ?  [
//                     { "username": { $regex: search, '$options': 'i' } },
//                     { "id": { $regex: search, '$options': 'i' } },
//                 ] :  
                 
//                 [{ "id": { $regex: search, '$options': 'i' } }]
                
//              }
//          }
       
     
//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 15;
//         let select = request_type !== 3 ? "-__v" : "-username -password"
//         Boostings.find(match)
//         .populate({
//             path: 'owner',
//             select: request_type !== 3 ? "_id username phone name" : "_id username name"
            
//         })
//         .populate({
//             path: 'receiver',
//             select: "_id username phone name"
            
//         })
//         .select(select)
//         .sort({ _id: -1 })
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
//           Boostings.countDocuments(match).exec((err, _count) => {
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

//     } catch (err) {
//         return res.status(201).send({
//             msg: 'Lấy danh sách thất bại :' + err.message,
//             status: false,
//             data: null
//           });
//     }
// }
// exports.apply_boost = async (req, res) =>{
//     const {user, body} = req
//     if (user.role !== 1) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn chưa đăng ký trở thành CTV",
//         });
//     }
//     if (!user.accept_order) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn đã đăng ký CTV tuy nhiên chưa được admin xác nhận, vui lòng liên hệ admin",
//         });
//     }
//     const{_id} = body
//     if(!_id) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Vui lòng chọn đơn hàng",
//         });
//     }
//     const boost = await Boostings.findOne({_id, type: 0}).exec()
//     if(!boost)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Đơn hàng này đã được nhận bởi người khác hoặc đã hoàn thành",
//         });

//     if(boost.owner.toString() ==  user._id.toString())
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không thể nhận đơn hàng của chính mình",
//         });
//     let checkAvalibleApply = await Boostings.findOne({receiver: user._id, type: 1}).exec()
//     if(checkAvalibleApply)
//     return res.status(201).send({
//         data: null,
//         status: false,
//         msg: "Mỗi tài khoản chỉ nhận được 1 đơn hàng. Vui lòng hoàn thành đơn đã nhận trước đây",
//     });
//     Boostings.findOneAndUpdate({ _id },
//         {receiver: user._id, type:1, received_date: moment(),  $push: { log: `${moment().format("DD/MM/YYYY HH:mm")} | CTV ${user.username} đã nhận đơn hàng`} },
//         { "new": true },
//         (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi nhận đơn hàng cày thuê: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             data = doc.toObject()
//             return res.status(200).send({
//                 msg: 'Nhận đơn hàng cày thuê thành công!',
//                 status: true,
//                 data: data
//             });
//         }
//     )

// }
// exports.get_boost_price = async (req, res) => {
//     try {
//         const { body,  user } = req
//         let { price, discount_code } = body

//         if(!price || !discount_code)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         discount_code = discount_code?.trim()
//         let paymentPrice = await getPaymentPrice(null, discount_code, price, 2, user, null)
//         return res.status(201).send({
//             data: paymentPrice.data,
//             status: paymentPrice.status,
//             msg: paymentPrice.status ? paymentPrice.note : paymentPrice.message,
//         });
//     } catch (error) {
//         // console.log(error)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Lấy giá sản phẩm thất bại: " + error.message,
//         });

//     }
// }