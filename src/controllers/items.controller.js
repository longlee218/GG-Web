// const Categorys = require("../models/Categorys");
// const Discount = require("../models/Discounts");
// const History_Items = require("../models/History_Items");
// const Settings = require("../models/Settings");

// const Items = require("../models/Items");
// const moment = require("moment")
// const { getPaymentPrice, curencyFormat } = require("../utils/help");
// const Item_Prices = require("../models/Item_Prices");
// const Users = require("../models/Users");
// const { sendTelegram } = require("./telegram.controller");
// exports.add_item = async (req, res) => {
//     try {
//         let { user } = req;
//         let { name, category, img, description, is_hot, type, total_sell, item_prices, order } = req.body
//         if (!name || !category || !description || !img || typeof type == "undefined" || isNaN(total_sell)) {
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
//         let categoryCheck = await Categorys.findOne({ _id: category, type: 1 }).exec()
//         if (!categoryCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Danh mục này không tồn tại hoặc không hợp lệ",
//             });
//         let itemPricesCheck = await Item_Prices.findOne({ _id: item_prices }).exec()
//         if (!itemPricesCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Phân loại giá vật phẩm không tồn tại",
//             });
//         let itemCheck = await Items.findOne({ name }).exec()
//         if (itemCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Tên item này đã tồn tại",
//             });
//         let newItem = new Items({
//             name, category, price: itemPricesCheck.price, img, description, is_hot, type, total_sell, item_prices,order
//         })
//         return newItem.save().then(async (data) => {
//             data = data.toObject()
//             return res.status(200).send({
//                 msg: 'Thêm Item thành công!',
//                 status: true,
//                 data: newItem
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Lỗi thêm Item: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (error) {
//         return res.status(201).send({
//             msg: "Lỗi thêm Item: " + error.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.update_item = async (req, res) => {
//     let { user } = req;
//     let { _id, item_id, name, item_prices, img, description, is_hot, category, type, total_sell, order } = req.body
//     if (!_id || !name || !item_prices || !img || !category || !typeof type == "undefined" || isNaN(total_sell) || !item_id) {
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
//     let itemPricesCheck = await Item_Prices.findOne({ _id: item_prices }).exec()
//     if (!itemPricesCheck)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Phân loại giá vật phẩm không tồn tại",
//         });
//     Items.findOneAndUpdate({ _id },
//         { name, price: itemPricesCheck.price, img, description, is_hot, category, type, total_sell, item_id, item_prices, order },
//         { "new": true },
//         (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi update Item: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             data = doc.toObject()
//             return res.status(200).send({
//                 msg: 'Update Item thành công!',
//                 status: true,
//                 data: { ...data, category: category }
//             });
//         }
//     )
// }
// exports.delete_item = async (req, res) => {
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
//     let item = await Items.findOne({ _id }).exec()
//     if (!item) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy item này",
//         });
//     }

//     item.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa item thành công!',
//             status: true,
//             data: item
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa item: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.buy_item = async (req, res) => {
//     try {
//         const { user, body } = req;
//         let { _id, game_id_received, is_friend, discount_code, game_id_friend, game_password_received, login_type } = body;
//         if (!_id || !game_id_received || ![true, false].includes(is_friend)) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         let item = await Items.findOne({ _id, type: 0, category: { $ne: null } }).populate("category").exec()
//         if (!item) {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Vật phẩm này không khả dụng, vui lòng chọn vật phẩm khác",
//                 status: false,
//             });
//         }
//         if(item.category.product_type == 2)
//         {
//             if(!game_password_received || isNaN(login_type))
//             {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng nhập đầy đủ thông tin",
//                 });
//             }
//         }
//         if (!is_friend) {
//             let checkGameFriend = await Settings.findOne({ key: "riot_account" }).exec()
//             console.log(checkGameFriend?.value?.current_index)
//             if (!checkGameFriend)
//                 return res.status(201).send({
//                     data: null,
//                     msg: "Không tìm thấy cấu hình danh sách kết bạn",
//                     status: false,
//                 });

//             if (checkGameFriend?.value?.list?.length == 0 || checkGameFriend?.value?.current_index == null )
//                 return res.status(201).send({
//                     data: null,
//                     msg: "Không tìm thấy cấu hình danh sách kết bạn",
//                     status: false,
//                 });
        
//             game_id_friend = checkGameFriend?.value?.list[checkGameFriend?.value.current_index].item
           
//         }
//         if (discount_code) discount_code = discount_code?.trim()
//         let price_before = item.price
//         let price = item.price
      
//         let discount_id = null
//         let paymentPrice = await getPaymentPrice(item.category, discount_code, price_before, 1, user)
//         if (!paymentPrice.status)
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
//         if (user.balance >= price) {
//             user.balance = user.balance - price
//             if(item.category.product_type !== 2)
//                 user.game_id_received = game_id_received
//             else {
//                 if(!game_id_received.includes("@"))
//                     user.game_id_received = game_id_received
//             }
//             user.save()
//             await Items.updateOne(
//                 { _id: item._id },
//                 { $inc: { total_sell: 1 } }
//             ).exec()
//             await Categorys.updateOne(
//                 { _id: item.category },
//                 { $inc: { total_sell: 1 } }
//             ).exec()
//             let newHistory = new History_Items({
//                 user: user._id,
//                 item: item._id,
//                 game_id_received,
//                 is_friend,
//                 discount: discount_id,
//                 price,
//                 price_before,
//                 game_id_friend,
//                 log: `${moment().format("DD/MM/YYYY HH:mm")} | Đặt hàng thành công`,
//                 type: 0,
//                 game_password_received,
//                 login_type
//             })
//             return newHistory.save().then(async (data) => {
//                 if (discount_id)
//                     await Discount.updateOne(
//                         { _id: discount_id },
//                         { $inc: { total_use: 1, amount: -1 } }
//                     ).exec()
//                     // game_id_received,
//                     // is_friend,
//                     // discount: discount_id,
//                     // price,
//                     // price_before,
//                     // game_id_friend,
//                 let content =
//                 `Đơn hàng skin/vật phẩm | ${moment().format("DD/MM - HH:mm")}\r\n` +
//                 `-------------------\r\n` +
//                 `${item.name}\r\n` +
//                 `Người đặt: ${user.username} - ${user.phone}\r\n` +
//                 `Giá gốc: ${curencyFormat(price_before)}\r\n` +
//                 `Tổng tiền: ${curencyFormat(price)}\r\n` +
//                 `Trạng thái: ${is_friend ? "Đã mua trước đây" : "Mới mua lần đầu"}\r\n` +
//                 `ID Riot nhận: ${game_id_received}\r\n` +
//                 `ID kết bạn: ${game_id_friend.length ? game_id_friend.join("|"):"Không rõ"}\r\n` +
//                 `-------------------\r\n`
//                 sendTelegram(content,"item")

//                 return res.status(200).send({
//                     msg: 'Mua vật phẩm thành công!',
//                     status: true,
//                     data: {...data._doc, item: item}
//                 });
//             }).catch((err) => {
//                 return res.status(201).send({
//                     msg: "Mua vật phẩm thất bại: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             })
//         }
//         else {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Số dư của bạn không đủ để mua vật phẩm này",
//                 status: false,
//             });
//         }

//     } catch (error) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Mua vật phẩm thất bại: " + error.message,
//         });
//     }
// }
// exports.get_items = async (req, res) => {
//     const { user } = req
//     let { dashboard, type, category, search } = req.body
//     let match = {}
//     if (dashboard) {
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         match = {}
//         if (typeof type !== "undefined" && type !== null) match = {
//             ...match, type: Number(type)
//         }
//     }
//     else {
//         match = { type: 0 }
//     }
//     if (category) match = {
//         ...match, category
//     }


//     if (search) {
//         if (!isNaN(search))
//             match = {
//                 ...match,
//                 $or: [
//                     { "item_id": Number(search) },
//                     { "name": { $regex: search, '$options': 'i' } },
//                     { "description": { $regex: search, '$options': 'i' } },

//                 ],
//             }
//         else match = {
//             ...match,
//             $or: [

//                 { "name": { $regex: search, '$options': 'i' } },
//                 { "description": { $regex: search, '$options': 'i' } },

//             ],
//         }
//     }

//     var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//     var limit = parseInt(req.body.limit) || 15;
//     // Items.updateMany({},{order:99999}).exec()
//     try {
//         Items.find(match)
//             .populate('category')
//             .sort({ order: 1, createdAt: -1})
//             .skip(page * limit) //Notice here
//             .limit(limit)

//             .exec((err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 Items.countDocuments(match).exec((err, _count) => {
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
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách vòng quay thất bại: " + error.message,
//         });

//     }
// }
// exports.get_items_user = async (req, res) => {
//     let { category, search, is_hot, id, price, price_order, is_home } = req.body
//     let match = { type: 0 }

//     if (typeof category !== "undefined" && category !== null)
//         match = {
//             ...match, category: category
//         }
//     // if (typeof is_home !== "undefined" && is_home !== null) match = {...match, order:{$ne: null}}
//     if (typeof id !== "undefined" && id !== null && id !== "") {
//         // if(id.length > 4)
//         // {
//         //     if(id.substring(0,4) == "4376") id = id.substring(4 , id.length)
//         // }
//         match.item_id = id
//     }
//     if (typeof match.item_id !== "undefined" && isNaN(match.item_id))
//         return res.status(200).send({
//             msg: 'Lấy danh sách thất bại. Không tìm thấy sản phẩm',
//             status: true,
//             data: []
//         });
//     if (typeof price !== "undefined" && price !== null) {
//         price = Number(price)

//         match.price = {
//             "$gte": 0,
//             "$lte": price
//         }
//     }
//     if (typeof search !== "undefined" && search !== null && search !== "") {
//         match = {
//             ...match,
//             $or: [

//                 { "name": { $regex: search, '$options': 'i' } },
//                 { "description": { $regex: search, '$options': 'i' } },

//             ],
//         }

//     }
//     //console.log(match)
//     var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//     var limit = parseInt(req.body.limit) || 15;
//     try {
//         Items.find(match)
//             .populate({
//                 path: 'category',
//                 select: "_id name product_type discount type",

//             })
//             .sort(is_home ?{order: 1, createdAt: -1} :match.price ? { 'price': price_order } : { order: 1, createdAt: -1 })
//             .skip(page * limit) //Notice here
//             .limit(limit)

//             .exec((err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 Items.countDocuments(match).exec((err, _count) => {
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
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách vòng quay thất bại: " + error.message,
//         });

//     }
// }
// exports.search_item = async (req, res) => {
//     const { body } = req
//     const search = body.search
//     let match
//     if (search) {
//         match = {
//             $or: [
//                 { name: { $regex: search, '$options': 'i' } },
//             ],
//         }
//     }
//     else {
//         return res.status(201).send({
//             data: [],
//             msg: "Tìm kiếm không hợp lệ",
//             status: false,
//         });
//     }
//     Items.find(match)
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
// exports.get_historys = async (req, res) => {
//     try {
//         const { user, body } = req;
//         const { request_type, item, owner, search, type } = body // request_type : 0 admin/ 1 get owner/ 2 get apply
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
//             ...match, type: Number(type)
//         }
//         if (typeof item !== "undefined" && item !== null) match = {
//             ...match, item: item
//         }
//         if (search) {
//             match = {
//                 ...match,
//                 $or: [

//                     { game_id_friend: { $elemMatch: { $regex: search, '$options': 'i' } }},
//                     { game_id_received: { $regex: search, '$options': 'i' } },
//                     { log: { $regex: search, '$options': 'i' }},
//                 ],
//             }
//         }
//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 15;
//         History_Items.find(match)
//             .populate({
//                 path: 'item',
//                 populate: {
//                     path: 'category',
//                     select: "_id name product_type type"
//                 }
//             })
//             .populate({
//                 path: 'user',
//                 select: "_id username phone email"
//             })
//             .populate({
//                 path: 'discount',
//                 select: "_id value discount_type discount_code"
//             })
//             .sort({ _id: -1 })
//             .skip(page * limit) //Notice here
//             .limit(limit)
//             .exec((err, doc) => {
//                 //console.log(err)
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 History_Items.countDocuments(match).exec((err, _count) => {
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
// exports.update_history = async (req, res) => {
//     let { user: auth } = req;
//     let { _id, item, user, game_id_received, game_password_received, login_type, is_friend, log, type, request_type, } = req.body
//     if (typeof request_type == "undefined" || request_type == null) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Truy vấn không hợp lệ",
//         });
//     }
//     if (request_type == 0) {
//         if (!_id || !item || !user || !game_id_received || !typeof type == "undefined") {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//     }
//     else {
//         if (!_id || !note) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//     }
//     if (request_type == 0 && auth.role !== 0) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không có quyền thực thi",
//         });
//     }
//     let history = null
//     if (auth.role !== 0) {
//         history = await History_Items.findOne({ _id, user: auth._id }).populate({
//             path: 'item',
//             populate: {
//                 path: 'category',
//                 select: "_id name product_type type"
//             }
//         }).exec()
//     }
//     else {
//         history = await History_Items.findOne({ _id }).exec()
//     }

//     if (!history)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy đơn hàng này",
//         });
//     if(history?.item?.category?.product_type == 2)
//     {
//         if(!game_password_received || isNaN(login_type))
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//     }
//     if(type !== history.type)
//     {
//         if(history.type == 2)
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Đơn này đã bị hủy, không thể thay đổi trạng thái",
//             });
//         }
//         if(type == 2)
//         {
//             let userPayment = await Users.findOne({_id: history.user}).exec()
//             if(userPayment)
//             {
//                 userPayment.balance += history.price
//                 userPayment.save()
//             }
//         }
//     }
//     let update =  request_type == 0 ?  { item, user, game_id_received, is_friend, type, log,game_password_received, login_type, } : { log } 

//     History_Items.findOneAndUpdate({ _id },
//         update,
//         { "new": true },
//         (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi update đơn hàng: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             data = doc.toObject()
//             return res.status(200).send({
//                 msg: 'Update đơn hàng thành công!',
//                 status: true,
//                 data: data
//             });
//         }
//     )
//         .populate({
//             path: 'item',
//             populate: {
//                 path: 'category',
//                 select: "_id name product_type type"
//             }
//         })
//         .populate({
//             path: 'user',
//             select: "_id username phone email"
//         })
//         .populate({
//             path: 'discount',
//             select: "_id value discount_type discount_code"
//         })
// }
// exports.delete_history = async (req, res) => {
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
//     let item = await History_Items.findOne({ _id }).exec()
//     if (!item) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy đơn hàng này",
//         });
//     }

//     item.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa đơn hàng thành công!',
//             status: true,
//             data: item
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa đơn hàng: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.get_item_price = async (req, res) => {
//     try {
//         const { body, user } = req
//         let { _id, discount_code } = body
//         let item = await Items.findOne({ _id }).exec()
//         if (!item)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Sản phẩm này không tồn tại",
//             });
//         if (discount_code) discount_code = discount_code?.trim()
//         let paymentPrice = await getPaymentPrice(item.category, discount_code, item.price, 1, user, null)
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
// exports.get_item_price_type = async (req, res) => {
//     let match = {}
//     var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//     var limit = parseInt(req.body.limit) || 15;
//     try {
//         Item_Prices.find(match)
//             .sort({ '_id': -1 })
//             .skip(page * limit) //Notice here
//             .limit(limit)

//             .exec((err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 Item_Prices.countDocuments(match).exec((err, _count) => {
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
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách vòng quay thất bại: " + error.message,
//         });

//     }
// }
// exports.update_item_price_type = async (req, res) => {
//     let { user, body } = req;
//     let { _id, name, price } = body
//     if (user.role !== 0) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không có quyền thực thi",
//         });
//     }
//     if (!_id || !name || !price) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Vui lòng nhập đầy đủ thông tin",
//         });
//     }

//     let checkItemPrice = await Item_Prices.findOne({ _id }).exec()

//     if (!checkItemPrice)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy thể loại giá",
//         })

    
//     let update = { name, price }

//     Item_Prices.findOneAndUpdate({ _id },
//         update,
//         { "new": true },
//         async (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi update phân loại giá vật phẩm: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             await Items.updateMany({ item_prices: _id }, { price: Number(price) }).exec()
//             data = doc.toObject()
//             return res.status(200).send({
//                 msg: 'Update phân loại giá vật phẩm thành công!',
//                 status: true,
//                 data: data
//             });
//         }
//     )
// }
// exports.delete_item_price_type = async (req, res) => {
//     let { user, body } = req;
//     let { _id } = body
//     if (user.role !== 0) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không có quyền thực thi",
//         });
//     }
//     if (!_id) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Vui lòng nhập đầy đủ thông tin",
//         });
//     }

//     let checkItemPrice = await Item_Prices.findOne({ _id }).exec()

//     if (!checkItemPrice)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy thể loại giá",
//         });


//     checkItemPrice.remove().then(async (data) => {
//         return res.status(200).send({
//             msg: 'Xóa phân loại giá vật phẩm thành công!',
//             status: true,
//             data: checkItemPrice
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa phân loại giá vật phẩm: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.add_item_price_type = async (req, res) => {
//     try {
//         let { user } = req;
//         let { name, price } = req.body
//         if (!name || !price ) {
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

//         let itemPricesCheck = await Item_Prices.findOne({ name: name }).exec()
//         if (itemPricesCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Phân loại giá vật phẩm đã tồn tại",
//             });
     
//         let newItem = new Item_Prices({
//             name, price
//         })
//         return newItem.save().then(async (data) => {
//             return res.status(200).send({
//                 msg: 'Thêm phân loại giá vật phẩm thành công!',
//                 status: true,
//                 data: newItem
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Lỗi thêm phân loại giá vật phẩm: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (error) {
//         return res.status(201).send({
//             msg: "Lỗi thêm phân loại giá vật phẩm: " + error.message,
//             status: false,
//             data: null
//         });
//     }
// }