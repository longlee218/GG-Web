// const Boostings = require("../models/Boostings");
// const Settings = require("../models/Settings");
// const Users = require("../models/Users");
// const moment = require("moment");
// const { uuidv4Payment, getPaymentPrice } = require("../utils/help");
// const Discounts = require("../models/Discounts");
// exports.add_discount = async (req, res) => {
//     try {
//         const { user, body } = req
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Không có quyền thực thi",
//             });
//         }
//         let { discount_code, start_date, end_date, value, discount_type, type, amount, total_use, status } = body
//         if (!discount_code || !start_date || !end_date || !value || typeof discount_type == "undefined" || typeof type == "undefined" || isNaN(amount) || ![true, false].includes(status)) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }

//         let checkExits = await Discounts.findOne({ discount_code }).exec()
//         if (checkExits)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: `Mã giảm giá này đã có trên hệ thống.`,
//             });
//         let newDiscount = new Discounts({
//             discount_code, start_date, end_date, value, discount_type, type, amount, total_use: 0, status, from: 0
//         })
//         return newDiscount.save().then(async (data) => {
//             return res.status(200).send({
//                 msg: 'Tạo mã giảm giá thành công',
//                 status: true,
//                 data: data
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Tạo mã giảm giá thất bại: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (err) {
//         return res.status(201).send({
//             msg: "Tạo mã giảm giá thất bại: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.update_discount = async (req, res) => {
//     try {
//         const { user, body } = req
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Không có quyền thực thi",
//             });
//         }
//         let { _id, discount_code, start_date, end_date, value, discount_type, type, amount, total_use, status } = body
//         if (!discount_code || !start_date || !end_date || !value || typeof discount_type == "undefined" || typeof type == "undefined" || isNaN(amount) || isNaN(total_use) || ![true, false].includes(status)) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }

//         let checkExits = await Discounts.findOne({ _id }).exec()
//         if (!checkExits)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: `Mã giảm giá này không tồn tại.`,
//             });
//         Discounts.findOneAndUpdate({ _id },
//             { discount_code, start_date, end_date, value, discount_type, type, amount, total_use, status },
//             { "new": true },
//             (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi update mã giảm giá: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 data = doc.toObject()
//                 return res.status(200).send({
//                     msg: 'Update mã giảm giá thành công!',
//                     status: true,
//                     data: data
//                 });
//             }
//         )
//     } catch (err) {
//         return res.status(201).send({
//             msg: "Update mã giảm giá thất bại: " + err.message,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.delete_discount = async (req, res) => {
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
//     let item = await Discounts.findOne({ _id }).exec()
//     if (!item) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy mã giảm giá này",
//         });
//     }

//     item.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa mã giảm giá thành công!',
//             status: true,
//             data: item
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa mã giảm giá item: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.get_discounts = async (req, res) => {
//     let { user } = req;
//     let { request_type, discount_code, search } = req.body
//     if (request_type == 0 && user.role !== 0) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Bạn không có quyền thực thi",
//         });
//     }
//     if (request_type == 1 && !discount_code) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Vui lòng nhập đầy đủ thông tin",
//         });
//     }
//     if (request_type == 1) {
//         let discount = await Discounts.findOne({ discount_code }).exec()
//         if (!discount)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Mã giảm giá không hợp lệ",
//             });
//         else
//             return res.status(200).send({
//                 data: [discount],
//                 status: true,
//                 msg: "Lấy mã giảm giá thành công",
//             });
//     }
//     else {
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         let match = {from: 0}
//         if (search)
//             match = { "discount_code": { $regex: search, '$options': 'i' } }
//         var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(req.body.limit) || 10;
//         Discounts.find(match)
//             .sort({ _id: -1 })
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
//                 Discounts.countDocuments(match).exec((err, _count) => {
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
//     }

// }