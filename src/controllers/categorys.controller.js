
// const Accounts = require("../models/Accounts");
// const Categorys = require("../models/Categorys")
// const moment = require("moment");
// const Bluebird = require("bluebird");
// const Items = require("../models/Items");
// exports.create_category = async (req, res) => {
//     try {
//         let { user } = req;
//         let { url, name, description, img, price , status, type, total_sell, discount, product_type, order, is_hot, blue_skin, red_skin, normal_skin, champion_price,
//         khung_ct, khung_td, khung_dct, rank_ct, rank_dct, rank_td
//         } = req.body
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         if (!url || !name || !description || !img || !price, ![true, false].includes(status) || typeof type == "undefined" || typeof total_sell == "undefined" || isNaN(discount)  || discount == null || isNaN(order) || typeof is_hot == "undefined") {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
//         if(type == 0 && ![0, 1].includes(product_type))
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn loại account",
//             });
//         }
//         if(type == 0 && product_type == 0)
//         {
//             if(isNaN(blue_skin) || isNaN(red_skin) || isNaN(normal_skin) || isNaN(rank_ct)|| isNaN(rank_dct)|| isNaN(rank_td)|| isNaN(khung_ct)|| isNaN(khung_dct)|| isNaN(khung_td)|| isNaN(champion_price))
//             {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng nhập đầy đủ thông tin",
//                 });
//             }
//         }
//         let categoryCheck = await Categorys.findOne({url: url}).exec()
//         if(categoryCheck)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Đường dẫn của danh mục này đã tồn tại",
//             });
//         let newCategory = new Categorys({ url, name, description, img, price , status, type, total_sell, discount, product_type,order, is_hot,blue_skin, red_skin, normal_skin, champion_price,
//             khung_ct, khung_td, khung_dct, rank_ct, rank_dct, rank_td  })
//         return newCategory.save().then(async (data) => {
//             data = data.toObject()
//             return res.status(200).send({
//                 msg: 'Thêm danh mục thành công!',
//                 status: true,
//                 data: newCategory
//             });
//         }).catch((err) => {
//             return res.status(201).send({
//                 msg: "Lỗi thêm danh mục: " + err.message,
//                 status: false,
//                 data: null
//             });
//         })
//     } catch (error) {
//         return res.status(201).send({
//             msg: `Thêm danh mục thất bại: ${error.message}`,
//             status: false,
//             data: result
//         });
//     }
// }
// exports.update_category = async (req, res) => {
//     try {
//         let { user } = req;
//         let { _id, url, name, description, img, price , status, type, total_sell, discount, product_type, order, is_hot,blue_skin, red_skin, normal_skin, champion_price,
//             khung_ct, khung_td, khung_dct, rank_ct, rank_dct, rank_td} = req.body
//         if (user.role !== 0) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Bạn không có quyền thực thi",
//             });
//         }
//         if (!url || !name || !description || !img || !price || ![true, false].includes(status) || !total_sell || isNaN(discount) || discount == null || isNaN(order) || typeof is_hot == "undefined" ) {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng nhập đầy đủ thông tin",
//             });
//         }
      
//         if(type == 0 && ![0, 1].includes(product_type))
//         {
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Vui lòng chọn loại account",
//             });
//         }
//         if(type == 0 && product_type == 0)
//         {
//             if(isNaN(blue_skin) || isNaN(red_skin) || isNaN(normal_skin) || isNaN(rank_ct)|| isNaN(rank_dct)|| isNaN(rank_td)|| isNaN(khung_ct)|| isNaN(khung_dct)|| isNaN(khung_td)|| isNaN(champion_price))
//             {
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Vui lòng nhập đầy đủ thông tin",
//                 });
//             }
//         }
//         if(type == 1) // Vật phẩm
//         {
//             let checkExitsAcc = await Accounts.findOne({category: _id }).exec()
//             if(checkExitsAcc)
//                 return res.status(201).send({
//                     data: null,
//                     status: false,
//                     msg: "Danh mục này đã có account không thể thay đổi thể loại",
//                 });
//         }
//         let category = await Categorys.findOne({_id}).exec()
//         if(typeof type !== "undefined" && category.type !== type)
//         {
//             let checkHasItem = await Items.findOne({category: _id}).exec()
//             let checkHasAccount = await Accounts.findOne({category: _id}).exec()
//             if(checkHasItem || checkHasAccount)
//             return res.status(201).send({
//                 data: null,
//                 status: false,
//                 msg: "Danh mục này có tài khoản hoặc item, không thể thay đổi thể loại",
//             });
//         }
//         Categorys.findOneAndUpdate({ _id },
//             { url, name, description, img, price, status , type, total_sell, discount: discount ? discount: 0, product_type, order, is_hot, blue_skin, red_skin, normal_skin, champion_price,
//                 khung_ct, khung_td, khung_dct, rank_ct, rank_dct, rank_td},
//             { "new": true },
//             (err, doc) => {
//                 if (err) {
//                     return res.status(201).send({
//                         msg: "Lỗi update danh mục: " + err.message,
//                         status: false,
//                         data: null
//                     });
//                 }
//                 data = doc.toObject()
//                 return res.status(200).send({
//                     msg: 'Update danh mục thành công!',
//                     status: true,
//                     data: data
//                 });
//             }
//         )
//     } catch (error) {
//         return res.status(201).send({
//             msg: `Update danh mục thất bại: ${error.message}`,
//             status: false,
//             data: null
//         });
//     }
// }
// exports.delete_category = async (req, res) => {
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
//     let category = await Categorys.findOne({ _id }).exec()
//     if (!category) {
//         return res.status(201).send({
//             data: null,
//             status: false,
//             msg: "Không tìm thấy danh mục này",
//         });
//     }
//     let checkExitsItem = category.type == 0 ? await Accounts.findOne({category: category._id}).exec() : await Items.findOne({category: category._id}).exec()

//     if(checkExitsItem)
//     return res.status(201).send({
//         data: null,
//         status: false,
//         msg: "Danh mục này có sản phẩm, không thể xóa",
//     });
//     // let category_move = await Categorys.findOne({ _id: move_to_id }).exec()
//     // if (!category_move) {
//     //     return res.status(201).send({
//     //         data: null,
//     //         status: false,
//     //         msg: "Không tìm thấy danh mục chuyển tới",
//     //     });
//     // }
//     // await Accounts.updateMany({ category: category._id }, { category: category_move._id }).exec()
//     // await Items.updateMany({ category: category._id }, { category: category_move._id }).exec()
//     category.remove().then(async (data) => {
//         data = data.toObject()
//         return res.status(200).send({
//             msg: 'Xóa danh mục thành công!',
//             status: true,
//             data: category
//         });
//     }).catch((err) => {
//         return res.status(201).send({
//             msg: "Lỗi xóa danh mục: " + err.message,
//             status: false,
//             data: null
//         });
//     })
// }
// exports.get_categorys = async (req, res) => {
//     const {user, body}= req;
//     let { type, dashboard } = body
//     try {
//         var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(req.body.limit) || 10;
//         let match = {}
//         if(typeof type !== "undefined" && type !== null) match.type = type
//         if(dashboard)
//         {
//             if(user.role !== 0)
//                 return res.status(201).send({
//                     data: {},
//                     msg: "Bạn không có quyền thực thi",
//                     status: false,
//                 });
//         }
//         else {
//             match.status = true
//         }
//         Categorys.find(match)
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
//           Categorys.countDocuments(match).exec((error, _count) => {
//             if (error) {
//               return res.status(201).send({
//                 msg: 'Lấy danh sách thất bại :' + error.message,
//                 status: false,
//                 data: null
//               });
//             }
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
//             msg: 'Lấy danh sách thất bại :' + error.message,
//             status: false,
//             data: null
//           });

//     }
// }
// exports.get_categorys_user = async (req, res) => {
//     const {body}= req;
//     let { type, _id, url } = body
//     try {
//         var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//         var limit = parseInt(req.body.limit) || 10;
//         let match = {
//             status: true
//         }
//         if(typeof type !== "undefined" && type !== null) match.type = type
//         if(typeof url !== "undefined" && url !== null) match.url = url

//         Categorys.find(match)
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
//           Categorys.countDocuments(match).exec((error, _count) => {
//             if (error) {
//               return res.status(201).send({
//                 msg: 'Lấy danh sách thất bại :' + error.message,
//                 status: false,
//                 data: null
//               });
//             }
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
//             msg: 'Lấy danh sách thất bại :' + error.message,
//             status: false,
//             data: null
//           });

//     }
// }