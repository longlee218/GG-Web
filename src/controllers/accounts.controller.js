// const Accounts = require("../models/Accounts");
// const Categorys = require("../models/Categorys")
// const moment = require("moment");
// const Bluebird = require("bluebird");
// var validator = require("email-validator");
// var passwordValidator = require('password-validator');
// var ObjectId = require("mongodb").ObjectId;

// var schema = new passwordValidator();
// schema
//     .is().min(8)
//     .is().max(100)
//     .has().letters(1)
//     .has().symbols(1)
//     .has().not().spaces()
// const { curencyFormat, loginRiot, change_email_account, change_password_account, change_riot_id_account, deleteFolderRecursive, getPaymentPrice } = require("../utils/help");

// const History_Accounts = require("../models/History_Accounts");
// const Discounts = require("../models/Discounts");
// const Users = require("../models/Users");
// const { sendTelegram } = require("./telegram.controller");
// let findDuplicates = itemId => itemId.filter((item, index) => itemId.indexOf(item) != index)
// exports.add_account = async (req, res) => {
//     try {
//         let { user } = req;
//         let { username, password, email, is_hot, category, champ, level, skin, rank, khung, price, img, img_list,description, red_skin, blue_skin, normal_skin } = req.body
//         if (!username || !password || !email || !category || isNaN(price) || !price || !img) {
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
//         if (typeof type !== "undefined" && type !== null) {
//             if (type !== 0 && type !== 3 && owner == null)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng chọn chủ tài khoản hoặc thay đổi trạng thái Account",
//                 });
//             else if ((type == 0 || type == 3) && owner !== null)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng xóa chủ tài khoản hoặc thay đổi trạng thái Account",
//                 });
//         }
//         if (!validator.validate(email)) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Định dạng email không đúng",
//             });
//         }
//         let log = [`${moment().format("DD/MM/YYYY - HH:mm")} | Admin thêm tài khoản vào hệ thống`]
//         let categoryCheck = await Categorys.findOne({ _id: category }).exec()
//         if (!categoryCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Danh mục này không tồn tại hoặc không hợp lệ",
//             });
//         let accountCheck = await Accounts.findOne({ username }).exec()
//         if (accountCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Account này đã tồn tại",
//             });
//         if(categoryCheck.type == 0 && categoryCheck.product_type == 0)
//         {
//             if(isNaN(blue_skin) || isNaN(red_skin) || isNaN(normal_skin))
//             {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng nhập đầy đủ thông tin",
//                 });
//             }
//         }
//         let newAcc = new Accounts({
//             username, password, email, is_hot, category, champ, level, skin, rank, khung, price, img, img_list, log, type: 0, is_warranty: true, description,  red_skin, blue_skin, normal_skin 
//         })
//         return newAcc.save().then(async (data) => {
//             data = data.toObject()
//             return res.status(200).send({
//                 msg: 'Thêm tài khoản thành công!',
//                 status: true,
//                 data: {...newAcc._doc, category: category}
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Lỗi thêm tài khoản: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (error) {
//         return res.status(201).send({
//             msg: "Lỗi thêm tài khoản: " + error.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.update_account = async (req, res) => {
//     let { user } = req;
//     let { _id, username, password, email, is_hot, category, champ, level, skin, rank, khung, price, img, img_list, type, log, is_warranty, owner, description,  red_skin, blue_skin, normal_skin  } = req.body
//     if (!_id || !username || !password || !email || !category || isNaN(price) || !price || isNaN(type) || ![true, false].includes(is_warranty)) {
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
//     let accountCheck = await Accounts.findOne({_id}).exec()
//     if(!accountCheck)
//     {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy tài khoản này",
//         });
//     }
  
//     let accountCheckUsername = await Accounts.findOne({username, _id: {$ne: _id}}).exec()
//     if(accountCheckUsername)
//     {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Username này đã tồn tại trong hệ thống",
//         });
//     }
//     if (typeof type !== "undefined" && type !== null) {
//         if (type !== 0 && type !== 3 && owner == null)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn chủ tài khoản hoặc thay đổi trạng thái Account",
//             });
//         else if ((type == 0 || type == 3) && owner !== null && owner._id !== null)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng xóa chủ tài khoản hoặc thay đổi trạng thái Account",
//             });
//     }
//     if (!validator.validate(email)) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Định dạng email không đúng",
//         });
//     }
//     let categoryCheck = await Categorys.findOne({ _id: category }).exec()
//     if (!categoryCheck)
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Danh mục này không tồn tại hoặc không hợp lệ",
//         });
//     if(categoryCheck.type == 0 && categoryCheck.product_type == 0)
//     {
//         if(isNaN(blue_skin) || isNaN(red_skin) || isNaN(normal_skin))
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//     }
//     let update
//     let owner_id = owner?._id
//     if(typeof owner_id == "undefined" || owner_id == null)
//         owner_id = owner

//     if(ObjectId(owner_id) !== ObjectId(accountCheck.owner) && owner_id !== null && owner_id !== "" )
//     {
//         newHistory = new History_Accounts({
//             user: user._id,
//             account: accountCheck._id,
//             discount: null,
//             discount_ref: null,
//             price: accountCheck.price,
//             price_before: accountCheck.price,
//             note: "Admin set tài khoản cho user",
//         })
//         newHistory.save()
//     }

//     if(accountCheck.owner !== null && (owner_id == null || owner_id == "" || typeof owner_id == "undefined" ))
//     {
//         await History_Accounts.deleteOne({account: accountCheck._id, user: accountCheck.owner}).exec()
//     }
//     if (typeof log == "object") {
//         update = {
//             username, password, email, is_hot, category, champ, level, skin, rank, khung, price, img, img_list, type, is_warranty, owner, description,
//             red_skin, blue_skin, normal_skin,
//         $push: { log: `${moment().format("DD/MM/YYYY - HH:mm")} | Admin thay đổi thông tin account` }
//         }
//     }
//     else {
//         update = {
//             username, password, email, is_hot, category, champ, level, skin, rank, khung, price, img, img_list, type, is_warranty, owner, description,
//             $push: { log: `${moment().format("DD/MM/YYYY - HH:mm")} | ${user.role == 0 ? "Admin" : "Người dùng"} viết: ${log}` }
//         }
//     }
    
//     if((type == 1 || type == 2) && type !== accountCheck.type)
//     {
//         update.sell_date = moment()
//     }
//     Accounts.findOneAndUpdate({ _id },
//         update,
//         { "new": true },
//         (err, doc) => {
//             if (err) {
//                 return res.status(201).send({
//                     msg: "Lỗi update tài khoản: " + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             data = doc.toObject()
//             return res.status(200).send({
//                 msg: 'Update tài khoản thành công!',
//                 status: true,
//                 data: { ...doc._doc, owner: { ...owner }, category: { ...category } }
//             });
//         }
//     )
// }
// exports.add_account_random = async (req, res) => {
//     try {
//         let { user } = req;
//         let { account_list, category, img } = req.body
//         // user|pass|email|
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         if (!account_list || account_list.length == 0 || !category) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         let categoryData = await Categorys.findOne({ _id: category, type: 0, product_type: 1 }).exec()
//         if (!categoryData) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Không tìm thấy danh mục tài khoản random",
//             });
//         }
//         let result = true
//         let errorItem = null
//         let itemId = []
//         let newAccount = []
//         let msg = ""

//         for (let index = 0; index < account_list.length; index++) {
//             const accountData = account_list[index];
//             let account = accountData.split("|")
//             let username = account[0]
//             let password = account[1]
//             let email = account[2]
//             let price = categoryData.price
//             if (account.length !== 3) {
//                 result = false
//                 errorItem = accountData
//                 msg = "Tài khoản không đúng định dạng"
//                 break;
//             }
//             if (!validator.validate(email)) {
//                 result = false
//                 errorItem = accountData
//                 msg = "Email không hợp lệ"
//                 break;
//             }
//             if (password.length < 5 || username.length < 5) {
//                 result = false
//                 errorItem = accountData
//                 msg = "Tài khoản không hợp lệ"
//                 break;

//             }
//             itemId.push(username)

//             newAccount.push({
//                 img: categoryData.img, username, password, email, price, category: categoryData._id, log: [`${moment().format("DD/MM/YYYY - HH:mm")} | Admin thêm tài khoản vào hệ thống`]
//             })
//         }

//         let duplicate = findDuplicates(itemId)
//         if (duplicate.length > 0) {

//             let username = duplicate[0]
//             let account = newAccount.find(item => item.username == username)
//             return res.status(200).send({
//                 msg: `Tài khoản trùng nhau: ${account.username}|${account.password}|${account.email}`,
//                 status: false,
//                 data: null
//             });
//         }
//         if (!result) {
//             return res.status(201).send({
//                 msg: `${msg}. Kiểm tra account: ${errorItem}`,
//                 status: false,
//                 data: null
//             });
//         }
//         let checkExits = await Accounts.find({ username: { "$in": itemId } }).exec()
//         if (checkExits && checkExits.length > 0) {
//             return res.status(200).send({
//                 msg: `Tài khoản đã tồn tại: ${checkExits[0].username}|${checkExits[0].password}|${checkExits[0].email}`,
//                 status: false,
//                 data: null
//             });
//         }
//         Accounts.create(newAccount, { new: true }, function (error, doc) {
//             if (error)
//                 return res.status(201).send({
//                     msg: `Thêm tài khoản thất bại: ${error.message}`,
//                     status: false,
//                     data: null
//                 });
//             let data = doc.map(item => {
//                 return { ...item._doc, category: categoryData }
//             })
//             return res.status(200).send({
//                 msg: 'Thêm tài khoản thành công!',
//                 status: true,
//                 data: data,
//             });
//         });

//     } catch (error) {
//         return res.status(201).send({
//             msg: `Thêm tài khoản thất bại: ${error.message}`,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.delete_account = async (req, res) => {
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
//     let account = await Accounts.findOne({ _id }).populate("category").exec()
//     if (!account) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy tài khoản này",
//         });
//     }
//     if(account?.category?.product_type == 0)
//         deleteFolderRecursive(`uploads_abc_xyz/${account.username}/`)
//     if (account.type !== 0 && account.type !== 3) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Tài khoản đã được bán hoặc tặng, không thể xóa"
//         });
//     }
//     account.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa tài khoản thành công!',
//             status: true,
//             data: account
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa tài khoản: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.get_accounts_by_category = async (req, res) => {
//     try {
//         const { category_id, id, price, rank, khung, order } = req.body
//         if (!category_id) {
//             return res.status(201).send({
//                 data: [],
//                 msg: "Vui lòng chọn danh mục account",
//                 status: false,
//             });
//         }
//         let match = {
//             category: category_id,
//             type: 0
//         }
//         if (id) match.id = id
//         if (price) {
//             price = Number(price)
//             let arrayPrice = [
//                 { min: 0, max: 50000 },
//                 { min: 51000, max: 200000 },
//                 { min: 201000, max: 500000 },
//                 { min: 501000, max: 1000000 },
//                 { min: 1001000, max: 99000000 },
//                 { min: 5001000, max: 99000000 },
//                 { min: 10001000, max: 99000000 },
//             ]
//             let priceSelect = arrayPrice[price]
//             match.price = {
//                 "$gte": priceSelect.min,
//                 "$lte": priceSelect.max
//             }
//         }
//         if (rank) match.rank = rank
//         if (khung) match.khung = khung
//         let accounts = await Accounts.find(match).select("-email").sort({ 'price': order }).exec()
//         return res.status(200).send({
//             data: accounts,
//             status: true,
//             msg: "Lấy danh sách accounts thành công",
//         });
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách accounts thất bại: " + error.message,
//         });

//     }
// }
// exports.get_accounts_by_admin = async (req, res) => {
//     try {
//         const { user, body } = req
//         const { type, search, category } = body
//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 10;

//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: [],
//                 msg: "Bạn không có quyền thực thi hành động này",
//                 status: false,
//             });
//         }

//         let match = {}
//         if (category) match = {
//             ...match, category
//         }

//         if (typeof type !== "undefined" && type !== null) match = {
//             ...match, type: Number(type)
//         }

//         if (search) {
//             if (!isNaN(search))
//                 match = {
//                     ...match,
//                     $or: [
//                         { "id": Number(search) },
//                         { "username": { $regex: search, '$options': 'i' } },
//                         { "email": { $regex: search, '$options': 'i' } },
//                     ],
//                 }
//             else match = {
//                 ...match,
//                 $or: [

//                     { "username": { $regex: search, '$options': 'i' } },
//                     { "email": { $regex: search, '$options': 'i' } },
//                 ],
//             }
//         }

//         const data = await Accounts.find(match)
//             .populate('owner')
//             .populate('category')
//             .sort({ _id: -1 })
//             .skip(page * limit) //Notice here
//             .limit(limit)
//             .exec()
//         let count = await Accounts
//             .countDocuments(match)
//             .populate('owner')
//             .populate('category')
//             .exec();

//         if (data) {
//             return res.status(200).send({
//                 msg: 'Lấy danh sách account thành công',
//                 status: true,
//                 data: {
//                     total: count,
//                     last_page: Math.ceil(count / limit),
//                     current_page: page,
//                     pageSize: data.length,
//                     per_page: limit,
//                     data: data,
//                 }
//             });
//         } else
//             return res.status(201).send({
//                 data: [],
//                 status: false,
//                 msg: "Lấy danh sách account thất bại",
//             });
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách account thất bại: " + error.message,
//         });
//     }
// };
// exports.get_accounts_owner = async (req, res) => {
//     try {
//         const { user, body } = req;
//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 15;
//         let match ={ owner: user._id }
//         Accounts.find(match).select("_id sell_date price username img is_password_change is_warranty log time_change_riot_id email_new")
//         .populate({
//             path: 'category',
//             select: "_id name product_type discount type url img",

//         })
//         .sort({ _id: -1 })
//         .skip(page * limit) //Notice here
//         .limit(limit)
//         .exec((err, doc) => {

//             if (err) {
//                 return res.status(201).send({
//                     msg: 'Lấy danh sách thất bại :' + err.message,
//                     status: false,
//                     data: null
//                 });
//             }
//             Accounts.countDocuments(match).exec((err, _count) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: 'Lấy danh sách thất bại :' + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 // let count = _count[0]?.count || 0
//                 let count = _count
//                 return res.status(200).send({
//                     msg: 'Lấy danh sách thành công',
//                     status: true,
//                     data: {
//                         total: count,
//                         last_page: parseInt(count / limit),
//                         current_page: page,
//                         pageSize: doc.length,
//                         per_page: limit,
//                         data: doc,
//                     }
//                 });
//             });
//         });
//     } catch (error) {
//         return res.status(201).send({
//             data: [],
//             status: false,
//             msg: "Lấy danh sách accounts thất bại: " + error.message,
//         });
//     }
// }
// exports.buy_account = async (req, res) => {
//     try {
//         const { user, body } = req;
//         let { _id, discount_code } = body;
//         if (!_id) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn tài khoản",
//             });
//         }
//         let account = await Accounts.findOne({ _id, type: 0, owner: null, category: { $ne: null } }).exec()
//         if (!account) {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Tài khoản này không khả dụng, vui lòng chọn tài khoản khác",
//                 status: false,
//             });
//         }
//         if(discount_code)  discount_code = discount_code?.trim()
//         let price_before = account.price
//         let price = account.price
//         let note = ""
//         let discount_id = null
//         let discount_ref = null
//         let userRef = await Users.findOne({ref: discount_code, "username": { "$ne": user.username }}).exec()
//         let paymentPrice = await getPaymentPrice(account.category, discount_code, price_before, 0, user, userRef)
//         if (!paymentPrice.status)
//             return res.status(201).send({
//                 data: null,
//                 msg: paymentPrice.message,
//                 status: false,
//             });
//         else {
//             price = paymentPrice.data
//             note = paymentPrice.note
//             discount_id = paymentPrice.discount_type == 0 ? paymentPrice.discount_id ?  paymentPrice.discount_id: null : null
//             discount_ref = paymentPrice.discount_type == 1 ? paymentPrice.discount_id ? paymentPrice.discount_id : null : null
//             if(paymentPrice.discount_type == 1)
//             {
//                 let profit_sell = (account.price / 100) * userRef.share_profit
//                 userRef.sell_count += 1
//                 userRef.balance+= Number(profit_sell)
//             }
//         }
//         if (user.balance >= price) {
//             user.balance = user.balance - price
//             let newHistory = new History_Accounts({
//                 user: user._id,
//                 account: account._id,
//                 discount: discount_id,
//                 discount_ref: discount_ref,
//                 price,
//                 price_before,
//                 note,
//             })
//             return newHistory.save().then(async (data) => {
//                 user.save()
//                 if(userRef)  userRef.save()
//                 await Accounts.updateOne(
//                     { _id: account._id },
//                     {
//                         owner: user._id,
//                         sell_date: moment(),
//                         type: 1,
//                         $push: { log: `${moment().format("DD/MM/YYYY - HH:mm")} | User ${user.username} mua account giá ${curencyFormat(account.price)}` }
//                     },
//                 ).exec()
//                 await Categorys.updateOne(
//                     { _id: account.category },
//                     { $inc: { total_sell: 1 } }
//                 ).exec()
//                 if (discount_id)
//                     await Discounts.updateOne(
//                         { _id: discount_id },
//                         { $inc: { total_use: 1 , amount: -1} }
//                     ).exec()
//                 let content =
//                 `Đơn hàng account | ${moment().format("DD/MM - HH:mm")}\r\n` +
//                 `-------------------\r\n` +
//                 `Account: ${account.username} - #${account.id}\r\n` +
//                 `Người đặt: ${user.name} - ${user.phone}\r\n` +
//                 `Giá gốc: ${curencyFormat(price_before)}\r\n` +
//                 `Tổng tiền: ${curencyFormat(price)}\r\n` +
//                 `-------------------\r\n`
//                 sendTelegram(content,"account")
//                 return res.status(200).send({
//                     msg: 'Mua vật phẩm thành công!',
//                     status: true,
//                     data: data
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
//                 msg: "Số dư của bạn không đủ để mua tài khoản này",
//                 status: false,
//             });
//         }

//     } catch (error) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Mua accounts thất bại: " + error.message,
//         });
//     }
// }
// exports.change_account_info = async (req, res) => {
//     try {

//         const { user, body } = req;
//         let { _id, password, email, game_name, tag_line } = body;
//         if (!_id) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn tài khoản",
//             });
//         }
//         let account = await Accounts.findOne({ _id, $or: [{ type: 1 }, { type: 2 }], owner: user._id }).exec()
//         if (!account) {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Tài khoản này không thuộc sở hữu của bạn hoặc không tồn tại, vui lòng chọn tài khoản khác",
//                 status: false,
//             });
//         }
//         let result = {}
//         let checkGamename = true
//         let checkEmail = true
//         let checkPassword = true
//         if (game_name && tag_line) {
//             if (account.time_change_riot_id !== null) {
//                 let dateUpdateRiotGame = moment().diff(account.time_change_riot_id, 'days')
//                 if (dateUpdateRiotGame <= 31) {
//                     checkGamename = false
//                     result.game_name = {
//                         data: game_name + " #" + tag_line,
//                         msg: `Riot ID chỉ có thể thay đổi trong vòng 30 ngày. Lần thay đổi gần đây vào lúc ${moment(account.time_change_riot_id).format("DD/MM/YYYY")}`,
//                         status: false,
//                     };
//                 }
//             }
//             else if (game_name.length < 6 || game_name.length > 15 || tag_line.length < 2 || tag_line.length > 5) {
//                 checkGamename = false
//                 result.game_name = {
//                     data: game_name + " #" + tag_line,
//                     msg: "Game name từ 6-15 kí tự. Tag line từ 2-5 kí tự",
//                     status: false,
//                 }
//             }
//         } else checkGamename = false
//         if (email) {
//             if (!validator.validate(email)) {
//                 checkEmail = false
//                 result.email = {
//                     data: email,
//                     msg: "Định dạng email không đúng",
//                     status: false,
//                 }
//             }
//             else if (email == account.email_new || email == account.email) {
//                 checkEmail = false
//                 result.email = {
//                     data: email,
//                     msg: "Email mới trùng với Email cũ",
//                     status: false,
//                 }
//             }
//         }
//         else checkEmail = false
//         if (password) {

//             if (!schema.validate(password)) {
//                 checkPassword = false
//                 result.password = {
//                     data: password,
//                     msg: "Password không hợp lệ. Phải có ít nhất 8 kí tự, có chữ cái và kí tự hoặc số",
//                     status: false,
//                 }
//             }
//             else if (password == account.password) {
//                 checkPassword = false
//                 result.password = {
//                     data: password,
//                     msg: "Password mới trùng với password cũ",
//                     status: false,
//                 }
//             }
//         }
//         else checkPassword = false
//         if (checkGamename || checkEmail || checkPassword) {
//             let loginUserData = await loginRiot(account.username, account.password, account.email)
//             if (!loginUserData.status) {
//                 await Accounts.updateOne(
//                     { _id: _id },
//                     { $push: { log: `${moment().format("DD/MM/YYYY HH:mm")} | ${loginUserData.msg}` } },
//                 ).exec()
//                 return res.status(201).send({
//                     data: null,
//                     msg: loginUserData.msg + " Vui lòng thử lại",
//                     status: false,
//                 });
//             }
//             let { data: accountData, csrf_token, ip, jar } = loginUserData

//             if (checkEmail) {
//                 let changeEmailData = await change_email_account(jar, ip, email, csrf_token)
//                 if (changeEmailData.status) {
//                     await Accounts.updateOne(
//                         { _id: _id },
//                         {
//                             email_new: email,
//                             is_warranty: false,
//                             $push: { log: `${moment().format("DD/MM/YYYY HH:mm")} | Thay đổi email` }
//                         },
//                     ).exec()
//                 }
//                 result.email = {
//                     status: changeEmailData.status,
//                     data: email,
//                     msg: changeEmailData.msg
//                 }
//             }
//             if (checkPassword) {
//                 let changePasswordData = await change_password_account(jar, ip, password, account.password, csrf_token)
//                 if (changePasswordData.status) {
//                     await Accounts.updateOne(
//                         { _id: _id },
//                         {
//                             password: password,
//                             is_password_change: true,
//                             $push: { log: `${moment().format("DD/MM/YYYY HH:mm")} | Thay đổi password` }
//                         },
//                     ).exec()
//                 }
//                 result.password = {
//                     status: changePasswordData.status,
//                     data: password,
//                     msg: changePasswordData.msg
//                 }
//             }
//             if (checkGamename) {
//                 let changRiotId = await change_riot_id_account(jar, ip, game_name, tag_line, csrf_token)
//                 if (changRiotId.status) {
//                     await Accounts.updateOne(
//                         { _id: _id },
//                         {
//                             time_change_riot_id: moment(),
//                             is_warranty: false,
//                             $push: { log: `${moment().format("DD/MM/YYYY HH:mm")} | Thay đổi RiotGame: ${game_name + " #" + tag_line}` }
//                         },
//                     ).exec()
//                 }
//                 result.game_name = {
//                     status: changRiotId.status,
//                     data: game_name + " #" + tag_line,
//                     msg: changRiotId.status == false ? "Riotgame ID này không khả dụng hoặc account đã thay đổi gần đây. Vui lòng thử lại sau" : changRiotId.msg
//                 }
//             }
//         }
//         return res.status(200).send({
//             data: result,
//             status: true,
//             msg: "Thay đổi thông tin tài khoản thành công",
//         });
//     } catch (error) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Thay đổi thông tin tài khoản thất bại: " + error.message,
//         });
//     }
// }
// exports.get_accounts = async (req, res) => {
//     try {
//         const { body } = req
//         let { category, id, price, rank, khung, price_order, is_hot } = body
//         let match = {
//             type: 0
//         }
//         if (typeof category !== "undefined" && category !== null) match.category = category
//         if (typeof id !== "undefined" && id !== null && id !== "") 
//         {
//             // if(id.length > 4)
//             // {
//             //     if(id.substring(0,4) == "3246") id = id.substring(4 , id.length)
//             // }
//             match.id = id
//         }
     
//         if(typeof match.id !== "undefined" && isNaN(match.id))
//             return res.status(200).send({
//                 msg: 'Lấy danh sách thất bại. Không tìm thấy sản phẩm',
//                 status: true,
//                 data: []
//             });
//         if (typeof price !== "undefined" && price !== null) {
//             price = Number(price)
//             let arrayPrice = [
//                 { min: 0, max: 50000 },
//                 { min: 51000, max: 200000 },
//                 { min: 201000, max: 500000 },
//                 { min: 501000, max: 1000000 },
//                 { min: 1001000, max: 99000000 },
//                 { min: 5001000, max: 99000000 },
//                 { min: 10001000, max: 99000000 },
//             ]
//             let priceSelect = arrayPrice[price]
//             match.price = {
//                 "$gte": priceSelect.min,
//                 "$lte": priceSelect.max
//             }
//         }
//         if (typeof rank !== "undefined" && rank !== null) match.rank = rank
//         if (typeof khung !== "undefined" && khung !== null) match.khung = khung
//         if (typeof is_hot !== "undefined" && is_hot !== null) match.is_hot = is_hot
//         // console.log(match)

//         var page = parseInt(body.page) || 0; //for next page pass 1 here 
//         var limit = parseInt(body.limit) || 15;
//         Accounts.find(match)
//             .populate({
//                 path: 'category',
//                 select: "_id name product_type discount type url img",

//             })
//             .select("-email -password -email_new -is_warranty")
//             .sort(match.price ? { 'price': price_order } : { 'is_hot': -1 })
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
//                 Accounts.countDocuments(match).exec((err, _count) => {
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
//             msg: "Lấy danh sách accounts thất bại: " + error.message,
//         });

//     }
// }
// exports.search_account = async (req, res) => {
//     const { user, body } = req
//     const search = body.search
//     let match
//     if (user.role !== 0)
//         match.owner = user._id
//     if (search) {
//         match = {
//             $or: [
//                 { username: { $regex: search, '$options': 'i' } },
                
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
//     Accounts.find(match)
//         .sort({ _id: -1 })
//         .select("_id username")
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
//         const { request_type, account, owner, type } = body // request_type : 0 admin/ 1 get owner/ 2 get apply
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
//         if (typeof account !== "undefined" && account !== null) match = {
//             ...match, account: account
//         }

//         var page = parseInt(body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(body.limit) || 15;
//         History_Accounts.find(match)
//             .populate({
//                 path: 'account',
//                 select: '_id username img is_password_change is_warranty log time_change_riot_id email_new',
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
//                 select: "_id value discount_type discount_code type"
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
//                 History_Accounts.countDocuments(match).exec((err, _count) => {
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
//     let match = {}
//     if (user.role !== 0) {
//         match.user = user._id
//     }
//     match._id = _id
//     let item = await History_Accounts.findOne(match).exec()
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
// exports.get_account_price = async (req, res) => {
//     try {
//         const { body,  user } = req
//         let { _id, discount_code } = body
//         let account = await Accounts.findOne({_id}).exec()
//         if(!account)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Sản phẩm này không tồn tại",
//             });
//         if(discount_code)  discount_code = discount_code?.trim()
//         let userRef = await Users.findOne({ref: discount_code, "username": { "$ne": user.username }}).exec()
//         let paymentPrice = await getPaymentPrice(account.category, discount_code, account.price, 0, user, userRef)
//         return res.status(201).send({
//             data: paymentPrice.data,
//             status: paymentPrice.status,
//             msg: paymentPrice.status ? paymentPrice.note : paymentPrice.message,
//         });
//     } catch (error) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Lấy giá sản phẩm thất bại: " + error.message,
//         });

//     }
// }
// exports.get_account_info = async (req, res) => {
//     try {
//         const { body,  user } = req
//         let { _id, type } = body
       

//         if(!type || !_id)
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn account",
//             });
//         }
//         let account = await Accounts.findOne({ _id, $or: [{ type: 1 }, { type: 2 }], owner: user._id }).exec()
//         if (!account) {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Tài khoản này không thuộc sở hữu của bạn hoặc không tồn tại, vui lòng chọn tài khoản khác",
//                 status: false,
//             });
//         }
//         if(type == "password")
//         {
//             if(account.is_password_change)
//                 return res.status(200).send({
//                     data: {
//                         type: "password",
//                         password: account.password,
//                         username: account.username

//                     },
//                     msg: "Lấy mật khẩu thành công",
//                     status: true,
//                 });
//             else   
//                 return res.status(201).send({
//                     data: null,
//                     msg: "Vui lòng chọn chức năng đổi mật khẩu để setup mật khẩu lần đầu tiên",
//                     status: false,
//                 });
//         }

//         else {
//             if(account.is_warranty == false)
//             {
//                 return res.status(200).send({
//                     data: {
//                         type: "info",
//                         password: account.password,
//                         email: account.email_new,
//                         username: account.username
//                     },
//                     msg: "Lấy thông tin tài khoản thành công",
//                     status: true,
//                 });
//             }
//             else {
//                 return res.status(201).send({
//                     data: null,
//                     msg: "Tài khoản này hiện tại đang được bảo hành, bạn chỉ có thể lấy thông tin mật khẩu",
//                     status: false,
//                 });
//             }
//         }
       
//     } catch (error) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Lấy thông tin thất bại: " + error.message,
//         });

//     }
// }
// exports.change_owner = async (req, res) => {
//     try {
//         const { body,  user } = req
//         let { _id, receiver } = body
       
//         if(!receiver || !_id)
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn account",
//             });
//         }
//         let account = await Accounts.findOne({ _id, $or: [{ type: 1 }, { type: 2 }], owner: user._id }).exec()
//         if (!account) {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Tài khoản này không thuộc sở hữu của bạn hoặc không tồn tại, vui lòng chọn tài khoản khác",
//                 status: false,
//             });
//         }
//         if(account.is_warranty == false || account.email_new !== null)
//         return res.status(201).send({
//             data: null,
//             msg: "Account này đã hết bảo hành hoặc đã đổi email, không được chuyển",
//             status: false,
//         });
//         let receiverCheck = await Users.findOne({username: receiver}).exec()
//         if(!receiverCheck)
//             return res.status(201).send({
//                 data: null,
//                 msg: "Người nhận không tồn tại",
//                 status: false,
//             });
//         let update = {
//                 owner: receiverCheck._id,
//                 $push: { log: `${moment().format("DD/MM/YYYY - HH:mm")} | User ${user.username} đã chuyển account cho ${receiverCheck.username}` }
//         }
//         Accounts.findOneAndUpdate({ _id },
//             update,
//             { "new": true },
//             (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi update tài khoản: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 data = doc.toObject()
//                 return res.status(200).send({
//                     msg: 'Update tài khoản thành công!',
//                     status: true,
//                     data: data
//                 });
//             }
//         ).populate({
//             path: 'category',
//             select: "_id name product_type discount type url img",

//         })
//         .populate({
//             path: 'owner',
//             select: "_id username name phone",

//         })
//         .select("-email -password -email_new -is_warranty")
       
//     } catch (error) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Lấy thông tin thất bại: " + error.message,
//         });

//     }
// }