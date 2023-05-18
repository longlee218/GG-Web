require("dotenv").config();
const { validationResult } = require("express-validator");
const ResponseBuilder = require("../utils/responseBuilder");

const UserController = {
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  login: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseBuilder(res).error(errors.array().shift())
    }
    const body = req.body;
    return ResponseBuilder(res).success(body);
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  register: async (req, res, next) => {
    const body = req.body;
    return ResponseBuilder(res).success(body);
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  me: async (req, res, next) => {
    const body = req.body;
    return ResponseBuilder(res).success(body);
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  update: async (req, res, next) => {
    const body = req.body;
    return ResponseBuilder(res).success(body);
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  logout: async (req, res, next) => {
    const body = req.body;
    return ResponseBuilder(res).success(body);
  }
}

module.exports = UserController;


// exports.register = async (req, res) => {
//   try {
//     let { username, password, email, phone } = req.body;
//     if (!username || !password || !email || !phone) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Vui lòng nhập đầy đủ thông tin",
//       });
//     }
//     if (username.length > 20) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Username quá dài",
//       });
//     }
//     if (!validator.validate(email)) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Định dạng email không đúng",
//       });
//     }
//     if (phone && !help.isVietnamesePhoneNumberValid(phone)) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Định dạng sđt không đúng",
//       });
//     }
//     if (phone) {
//       if (phone.substr(0, 3) == "+84") phone = phone.replace("+84", "0")
//       else if (phone.substr(0, 2) == "84") phone = "0" + phone.substr(2, phone.length)
//     }
//     if (password.length < 6) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Password phải ít nhất 6 kí tự",
//       });
//     }
//     let checkExits = await Users.findOne({
//       $or: [{ username }, { email }, { phone }]
//     }).exec();
//     if (checkExits) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Username hoặc email/sđt đã được đăng ký trước đây!",
//       });
//     }
//     let newCode = help.uuidv4Short()
//     let device = "web"
//     const token = help.createToken(username, md5(new Date()), req.clientIp, device, newCode);
//     const user = {
//       username,
//       password: md5(password), 
//       role: 2, // 0: admin // 1: quản trị viên / 2: user / 3: nhà cung cấp
//       status: true,
//       ip_web: req.clientIp,
//       balance: 0,
//       balance_deposit: 0,
//       code_web: newCode,
//       email,
//       phone,
//     }
//     let newUser = new Users({ ...user })
//     return newUser.save().then(async (data) => {
//       data = data.toObject()
//       delete data.password
//       delete data.code_web
//       delete data.code_mobile
//       delete data.ip_web
//       delete data.ip_mobile
//       return res.status(200).send({
//         msg: 'Đăng ký thành công!',
//         status: true,
//         data: {
//           user: data, token
//         }
//       });
//     }).catch((err) => {
//       return res.status(201).send({
//         msg: "Lỗi đăng ký: " + err.message,
//         status: false,
//         data: null
//       });
//     })

//   } catch (error) {
//     return res.status(201).send({
//       data: { user: {}, token: null },
//       status: false,
//       msg: error.message,
//     });
//   }
// }
// exports.login = async (req, res) => {
//   try {
//     const { username, password, device } = req.body;
//     if (!username || !password || !device) {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Vui lòng nhập đầy đủ thông tin",
//       });
//     }
//     const user = await Users.findOne({
//       $or: [
//         { username, password: md5(password) },
//         { email: username, password: md5(password) },
//         { phone: username, password: md5(password) }
//       ]
//     }).exec();
//     if (user) {
//       let newCode = help.uuidv4Short();
//       if (device == "mobile") {
//         user.code_mobile = newCode
//         user.ip_mobile = req.clientIp
//       }
//       else {
//         user.code_web = newCode
//         user.ip_web = req.clientIp
//       }
//       const token = help.createToken(username, md5(new Date()), req.clientIp, device, newCode);
//       return user.save().then(async (data) => {
//         data = data.toObject()
//         delete data.password
//         delete data.code_web
//         delete data.code_mobile
//         delete data.ip_web
//         delete data.ip_mobile
//         return res.status(200).send({
//           msg: 'Đăng nhập thành công!',
//           status: true,
//           data: {
//             user: data, token
//           }
//         });
//       }).catch((err) => {
//         return res.status(201).send({
//           msg: "Lỗi đăng nhập: " + err.message,
//           status: false,
//           data: null
//         });
//       })
//     } else {
//       return res.status(201).send({
//         data: { user: {}, token: null },
//         status: false,
//         msg: "Username hoặc password không đúng",
//       });
//     }
//   } catch (error) {
//     return res.status(201).send({
//       data: { user: {}, token: null },
//       status: false,
//       msg: error.message,
//     });
//   }
// }
// exports.me = async (req, res) => {
//   try {
//     const { user } = req;
//     let data = user.toObject()
//     try {
//       delete data.password
//       delete data.code_web
//       delete data.code_mobile
//       delete data.ip_web
//       delete data.ip_mobile
//     } catch (error) {

//     }
//     return res.status(200).send({
//       data: { user: data },
//       status: true,
//       msg: "Lấy thông tin thành công",
//     });

//   } catch (err) {
//     return res.status(201).send({
//       data: { user: null },
//       status: false,
//       msg: "Lấy thông tin thất bại: " + err.message,
//     });
//   }

// }
// exports.logout = async (req, res) => {
//   const { user, device } = req;
//   if (!user || !device) {
//     return res.status(201).send({
//       data: { user: {}, token: null },
//       status: false,
//       msg: "Vui lòng nhập đầy đủ thông tin",
//     });
//   }
//   try {
//     await Users.findOneAndUpdate({ user_id: user._id }, {
//       code_web: "",
//     }).exec();

//     return res.status(200).send({
//       data: {},
//       status: true,
//       msg: "Đăng xuất thành công",
//     });
//   } catch (error) {
//     return res.status(201).send({
//       data: {},
//       status: false,
//       msg: "Đăng xuất thất bại",
//     });
//   }
// };
// exports.renew = async (req, res) => {
//   const { user } = req
//   let { day, post} = req.body;
//   if (isNaN(day) || !post || post == "") {
//     return res.status(201).send({
//       data: {},
//       msg: "Vui lòng nhập đầy đủ thông tin",
//       status: false,
//     });
//   }
  
//   if (!day || day == 0)
//     return res.status(201).send({
//       data: {},
//       msg: "Số ngày yêu cầu gia hạn không hợp lệ",
//       status: false,
//     });
//   if (point > user.balance) {
//     return res.status(201).send({
//       data: {},
//       msg: "Bạn đang chuyển nhiều hơn số dư hiện tại",
//       status: false,
//     });
//   }
//   let receive = await Users.findOne({username}).exec();
//   if(!receive)
//   {
//     return res.status(201).send({
//       data: {},
//       msg: `Username ${username} không tồn tại`,
//       status: false,
//     });
//   }
//   try {
//     //////////////XỬ LÝ PAYMENT
//     let payment = new Payments();
//     payment.create_by = user._id
//     payment.user = receive._id
//     payment.point = point
//     payment.type = 2
//     payment.current_point = user.balance - point
//     ///////////////XỬ LÝ USER
//     user.balance -= point
//     receive.balance += point
//     payment.save().then(async (data) => {
//       user.save();
//       receive.save();
//       data = data.toObject();
//       try {
//         delete data.post
//         delete data.deposit
//       } catch (error) {}
//       return res.status(200).send({
//         msg: `Chuyển ${point} cho user: ${username} thành công`,
//         status: true,
//         data: data
//       });
//     }).catch((error) => {
//       return res.status(201).send({
//         msg: `Chuyển ${point} cho user: ${username} không thành công, liên hệ Admin, ${error.message}`,
//         status: false,
//         data: null
//       });
//     })
//   } catch (error) {
//     return res.status(201).send({
//       data: {},
//       msg: "Yêu cầu không thành công. Vui lòng liên hệ Admin, " + error.message,
//       status: false,
//     });
//   }
// }
// exports.send_point = async (req, res) => {
//   const { user } = req
//   let { point, username} = req.body;
//   if (isNaN(point) || !username || username == "") {
//     return res.status(201).send({
//       data: {},
//       msg: "Vui lòng nhập đầy đủ thông tin",
//       status: false,
//     });
//   }
//   point = parseFloat(point)
//   if (!point || point == 0)
//     return res.status(201).send({
//       data: {},
//       msg: "Số tiền yêu cầu chuyển không hợp lệ",
//       status: false,
//     });
//   if (point > user.balance) {
//     return res.status(201).send({
//       data: {},
//       msg: "Bạn đang chuyển nhiều hơn số dư hiện tại",
//       status: false,
//     });
//   }
//   let receive = await Users.findOne({username}).exec();
//   if(!receive)
//   {
//     return res.status(201).send({
//       data: {},
//       msg: `Username ${username} không tồn tại`,
//       status: false,
//     });
//   }
//   try {
//     //////////////XỬ LÝ PAYMENT
//     let payment = new Payments();
//     payment.create_by = user._id
//     payment.user = receive._id
//     payment.point = point
//     payment.type = 2
//     payment.current_point = user.balance - point
//     ///////////////XỬ LÝ USER
//     user.balance -= point
//     receive.balance += point
//     payment.save().then(async (data) => {
//       user.save();
//       receive.save();
//       data = data.toObject();
//       try {
//         delete data.post
//         delete data.deposit
//       } catch (error) {}
//       return res.status(200).send({
//         msg: `Chuyển ${point} cho user: ${username} thành công`,
//         status: true,
//         data: data
//       });
//     }).catch((error) => {
//       return res.status(201).send({
//         msg: `Chuyển ${point} cho user: ${username} không thành công, liên hệ Admin, ${error.message}`,
//         status: false,
//         data: null
//       });
//     })
//   } catch (error) {
//     return res.status(201).send({
//       data: {},
//       msg: "Yêu cầu không thành công. Vui lòng liên hệ Admin, " + error.message,
//       status: false,
//     });
//   }
// }

// exports.get_payments_withdraw = async (req, res) => {
//   try {
//     const { user, body } = req;
//     const { request_type, type, owner, search } = body // request_type : 0 admin/ 1 get owner/ 2 get apply
//     let match = {}
//     if (typeof request_type == "undefined" || request_type == null) {
//       return res.status(201).send({
//         data: null,
//         status: false,
//         msg: "Truy vấn không hợp lệ",
//       });
//     }
//     if (request_type == 0) {
//       if (user.role !== 0) {
//         return res.status(201).send({
//           data: null,
//           status: false,
//           msg: "Không có quyền thực thi",
//         });
//       }
//       if (typeof owner !== "undefined" && owner !== null) match = {
//         ...match, user: owner
//       }
//     }
//     else {
//       match.user = user._id
//     }
//     if (typeof type !== "undefined" && type !== null) match = {
//       ...match, type: type
//     }
//     if (search) {
//       match = {
//         ...match,
//         $or: [
//           { "account_number": { $regex: search, '$options': 'i' } },
//           { "account_name": { $regex: search, '$options': 'i' } },
//         ],
//       }
//     }
//     var page = parseInt(body.page) || 0; //for next page pass 1 here
//     var limit = parseInt(body.limit) || 15;
//     History_Withdraws.find(match)
//       .populate({
//         path: 'user',
//         select: "_id username phone email"
//       })
//       .sort({ _id: -1 })
//       .skip(page * limit) //Notice here
//       .limit(limit)
//       .exec((err, doc) => {
//         // console.log(err)
//         if (err) {
//           return res.status(201).send({
//             msg: 'Lấy danh sách thất bại :' + err.message,
//             status: false,
//             data: null
//           });
//         }
//         History_Withdraws.countDocuments(match).exec((err, _count) => {
//           if (err) {
//             return res.status(201).send({
//               msg: 'Lấy danh sách thất bại :' + err.message,
//               status: false,
//               data: null
//             });
//           }
//           // let count = _count[0]?.count || 0
//           let count = _count
//           return res.status(200).send({
//             msg: 'Lấy danh sách thành công',
//             status: true,
//             data: {
//               total: count,
//               last_page: parseInt(count / limit),
//               current_page: page,
//               pageSize: doc.length,
//               per_page: limit,
//               data: doc,
//             }
//           });
//         });
//       });

//   } catch (err) {
//     return res.status(201).send({
//       msg: 'Lấy danh sách thất bại :' + err.message,
//       status: false,
//       data: null
//     });
//   }
// };
// exports.approve_payments_withdraw = async (req, res) => {
//   const { user, body } = req
//   let idPayment = body._id
//   let type = body.type
//   let note = body.note
//   if (user.role !== 0 && user.role !== 1) {
//     return res.status(201).send({
//       data: {},
//       msg: "Bạn không có quyền thực thi hành động này",
//       status: false,
//     });
//   }
//   if (typeof type == "undefined") {
//     return res.status(201).send({
//       data: {},
//       msg: "Truy vấn không hợp lệ",
//       status: false,
//     });
//   }
//   let payment = await History_Withdraws.findOne({ _id: idPayment }).select("-log").exec()
//   if (payment) {
//     let userPayment = await Users.findOne({ _id: payment.user, status: true }).exec()
//     if (userPayment) {
//       let setting =  await Settings.findOne({key:"sell_count"}).exec()
//       if(!setting)
//         return res.status(201).send({
//           data: {},
//           msg: "Không tìm thấy cấu hình sell_count. Liên hệ admin",
//           status: false,
//         });
//       if (userPayment.role == 2 && userPayment.sell_count < setting.value) {
//         return res.status(201).send({
//           data: {},
//           status: false,
//           msg: `Người dùng này chưa bán được ${setting.value} đơn hàng`,
//         });
//       }
//       if (userPayment.role !== 2 && user.role !== 1 && user.role !== 0) {
//         return res.status(201).send({
//           data: {},
//           status: false,
//           msg: `Người dùng này không đủ điều kiện để rút tiền`,
//         });
//       }
//       let log = null
//       if (type == 1 && type !== payment.type) {
//         if (userPayment.balance >= payment.amount) {
//           userPayment.balance = userPayment.balance - payment.amount
//           userPayment.balance_withdraw = userPayment.balance_withdraw + payment.amount
//           userPayment.account_name = payment.account_name
//           userPayment.account_number = payment.account_number
//           userPayment.withdraw_method = payment.method
//           payment.approve_date = new Date()
//           log = `${moment().format("DD/MM/YYYY HH:mm")} | Đã thanh toán ${help.curencyFormat(payment.amount)} cho  ${payment.account_name} - ${payment.method}`
//         }
//         else {
//           return res.status(201).send({
//             data: {},
//             status: false,
//             msg: `Số dư người dùng không đủ để rút ${help.curencyFormat(payment.amount)}`,
//           });
//         }
//       }
//       else if (type == 2 && type !== payment.type) {
//         log = `${moment().format("DD/MM/YYYY HH:mm")} | Từ chối thanh toán: ${help.curencyFormat(payment.amount)} cho ${payment.account_name} - ${payment.method}`
//       }
//       else if (note) {
//         log = `${moment().format("DD/MM/YYYY HH:mm")} | Admin viết: ${note}`
//       }
//       else log = `${moment().format("DD/MM/YYYY HH:mm")} | Admin cập nhật đơn rút`
//       payment.type = type
//       let update = { ...payment._doc, $push: { log: log } }
//       History_Withdraws.findOneAndUpdate({ _id: payment._id },
//         update,
//         { "new": true },
//         (err, doc) => {
//           if (err) {
//             return res.status(201).send({
//               msg: "Lỗi update đơn rút tiền: " + err.message,
//               status: false,
//               data: null
//             });
//           }
//           if (userPayment) userPayment.save()
//           data = doc.toObject()
//           return res.status(200).send({
//             msg: "Cập nhật thành công",
//             status: true,
//             data: { ...data }
//           });
//         }
//       ).populate({
//         path: 'user',
//         select: "_id username phone email"
//       })
//     }
//     else {
//       return res.status(201).send({
//         data: {},
//         status: false,
//         msg: `Số dư người dùng không đủ để rút ${help.curencyFormat(payment.amount)}`,
//       });
//     }
//   }
//   else
//     return res.status(201).send({
//       data: {},
//       status: false,
//       msg: "Người dùng không tồn tại hoặc đang bị khóa",
//     });
// }
// exports.delete_payments_withdraw = async (req, res) => {
//   let { user } = req;
//   let { _id } = req.body
//   if (!_id) {
//     return res.status(201).send({
//       data: null,
//       status: false,
//       msg: "Vui lòng nhập đầy đủ thông tin",
//     });
//   }
//   if (user.role !== 0) {
//     return res.status(201).send({
//       data: null,
//       status: false,
//       msg: "Bạn không có quyền thực thi",
//     });
//   }
//   let item = await History_Withdraws.findOne({ _id }).exec()
//   if (!item) {
//     return res.status(201).send({
//       data: null,
//       status: false,
//       msg: "Không tìm thấy lịch sử rút tiền này",
//     });
//   }

//   item.remove().then(async (data) => {
//     data = data.toObject()
//     return res.status(200).send({
//       msg: 'Xóa lịch sử rút tiền thành công!',
//       status: true,
//       data: item
//     });
//   }).catch((err) => {
//     return res.status(201).send({
//       msg: "Lỗi xóa lịch sử rút tiền: " + err.message,
//       status: false,
//       data: null
//     });
//   })
// }
// exports.update_payments_withdraw = async (req, res) => {
//   const { user, body } = req
//   let idPayment = body._id
//   let note = body.note
//   if(!note)
//     return res.status(201).send({
//       msg: "Vui lòng nhập đầy đủ thông tin",
//       status: false,
//       data: null
//     });
//   let payment = await History_Withdraws.findOne({ _id: idPayment, user: user._id }).select("-log").exec()
//   if (payment) {
//     let userPayment = await Users.findOne({ _id: payment.user, status: true }).exec()
//     if (userPayment) {
//       let log =  `${moment().format("DD/MM/YYYY HH:mm")} | ${user.username} viết: ${note}`
//       let update = { $push: { log: log } }
//       History_Withdraws.findOneAndUpdate({ _id: payment._id },
//         update,
//         { "new": true },
//         (err, doc) => {
//           if (err) {
//             return res.status(201).send({
//               msg: "Lỗi update đơn rút tiền: " + err.message,
//               status: false,
//               data: null
//             });
//           }
//           if (userPayment) userPayment.save()
//           data = doc.toObject()
//           return res.status(200).send({
//             msg: "Cập nhật thành công",
//             status: true,
//             data: { ...data }
//           });
//         }
//       ).populate({
//         path: 'user',
//         select: "_id username phone email"
//       })
//     }
//     else
//       return res.status(201).send({
//         data: {},
//         status: false,
//         msg: "Người dùng không tồn tại hoặc đang bị khóa",
//       });
//   }
//   else
//     return res.status(201).send({
//       data: {},
//       status: false,
//       msg: "Lấy thông tin thanh toán thất bại",
//     });
// };

// exports.get_users = async (req, res) => {
//   const { user: userAuth, body } = req
//   var page = parseInt(req.body.page) || 0; //for next page pass 1 here
//   var limit = parseInt(req.body.limit) || 10;
//   if (userAuth.role !== 0)
//     return res.status(201).send({
//       data: [],
//       msg: "Bạn không có quyền thực thi",
//       status: false,
//     });
//   let match
//   if (body.search) {
//     match = {
//       $or: [
//         { name: { $regex: body.search, '$options': 'i' } },
//         { phone: { $regex: body.search, '$options': 'i' } },
//         { username: { $regex: body.search, '$options': 'i' } },
//         { email: { $regex: body.search, '$options': 'i' } },
//       ],
//     }
//   }
//   else {
//     match = {}
//   }
//   if (typeof body.role !== "undefined" && body.role !== null) match.role = body.role


//   Users.find(match)
//     .sort({ _id: -1 })
//     .skip(page * limit) //Notice here
//     .limit(limit)
//     .select("-password")
//     .exec((err, doc) => {
//       if (err) {
//         return res.status(201).send({
//           msg: 'Lấy danh sách thất bại :' + err.message,
//           status: false,
//           data: null
//         });
//       }
//       Users.countDocuments(match).exec((err, _count) => {
//         if (err) {
//           return res.status(201).send({
//             msg: 'Lấy danh sách thất bại :' + err.message,
//             status: false,
//             data: []
//           });
//         }
//         // let count = _count[0]?.count || 0
//         let count = _count
//         return res.status(200).send({
//           msg: 'Lấy danh sách thành công',
//           status: true,
//           data: {
//             total: count,
//             last_page: parseInt(count / limit),
//             current_page: page,
//             pageSize: doc.length,
//             per_page: limit,
//             data: doc,
//           }
//         });
//       });
//     });

// };
// exports.update_user = async (req, res) => {
//   try {
//     let { user: userAuth } = req
//     let { _id, name, phone, email, balance, share_profit, role, status, balance_wildcore, note, password, accept_order } = req.body;
//     if (!_id)
//       return res.status(201).send({
//         data: {},
//         msg: "Vui lòng nhập đầy đủ thông tin",
//         status: false,
//       });

//     if (phone && !help.isVietnamesePhoneNumberValid(phone)) {
//       return res.status(201).send({
//         data: {},
//         msg: "SĐT không hợp lệ",
//         status: false,
//       });
//     }
//     if (phone) {
//       if (phone.substr(0, 3) == "+84") phone = phone.replace("+84", "0")
//       else if (phone.substr(0, 2) == "84") phone = "0" + phone.substr(2, phone.length)
//     }
//     const user = await Users.findOne({ _id }).exec();
//     if (phone) {
//       const phoneCheck = await Users.findOne({ phone, _id: { $ne: user._id } }).exec();
//       if (phoneCheck)
//         return res.status(201).send({
//           data: {},
//           msg: "SĐT này đã được người khác đăng ký. Vui lòng sử dụng SĐT khác",
//           status: false,
//         });
//     }
//     if (email) {
//       const emailCheck = await Users.findOne({ email, _id: { $ne: user._id } }).exec();
//       if (emailCheck)
//         return res.status(201).send({
//           data: {},
//           msg: "Email này đã được người khác đăng ký. Vui lòng sử dụng Email khác",
//           status: false,
//         });

//     }
//     if (!password) password = user.password
//     else {
//       if (userAuth.role !== 0)
//         return res.status(201).send({
//           data: {},
//           msg: "Bạn không có quyền thực thi",
//           status: false,
//         });
//       else password = md5(password)
//     }
//     if (role !== 0 && role !== 1 && role !== 2) role = user.role
//     else {
//       if (userAuth.role !== 0)
//         return res.status(201).send({
//           data: {},
//           msg: "Bạn không có quyền thực thi",
//           status: false,
//         });
//     }

//     if (!balance || isNaN(balance)) balance = user.balance
//     else {
//       if (userAuth.role !== 0)
//         return res.status(201).send({
//           data: {},
//           msg: "Bạn không có quyền thực thi",
//           status: false,
//         });
//     }
//     if (typeof accept_order == "undefined" || accept_order == null || ![true,false].includes(accept_order)) accept_order = user.accept_order
//     else {
//       if (userAuth.role !== 0)
//         return res.status(201).send({
//           data: {},
//           msg: "Bạn không có quyền thực thi",
//           status: false,
//         });
      
//     }
//     if (!share_profit || isNaN(share_profit)) share_profit = user.share_profit
//     else {
//       if (userAuth.role !== 0)
//         return res.status(201).send({
//           data: {},
//           msg: "Bạn không có quyền thực thi",
//           status: false,
//         });
//     }
//     if (status !== false && status !== true) status = user.status
//     if (!balance_wildcore || isNaN(balance_wildcore)) balance_wildcore = user.balance_wildcore
//     else {
//       if (userAuth.role !== 0)
//         return res.status(201).send({
//           data: {},
//           msg: "Bạn không có quyền thực thi",
//           status: false,
//         });
//     }

//     if (!phone) phone = user.phone
//     if (!name) name = user.name
//     if (typeof note == "undefined") note = user.note
//     let match
//     if (userAuth.role == 0) {
//       match = { _id: _id }
//     }
//     else {
//       match = { _id: user._id }
//     }
//     Users.findOneAndUpdate(match, {
//       _id, name, phone, email, balance, share_profit, role, status, balance_wildcore, note, password, accept_order: role == 1 ? accept_order: false
//     }, { returnOriginal: false }).then(doc => {
//       let data = doc.toObject()
//       return res.status(200).send({
//         data: data,
//         msg: "Cập nhật tài khoản thành công",
//         status: true,
//       });
//     }).catch(err => {
//       return res.status(201).send({
//         data: {},
//         msg: "Update tài khoản thất bại: " + err.message,
//         status: false,
//       });

//     })
//   } catch (error) {
//     return res.status(201).send({
//       data: {},
//       msg: "Update tài khoản thất bại: " + error.message,
//       status: false,
//     });
//   }
// }

// exports.register_ctv = async (req, res) => {
//   const { user, body } = req;
//   if (user.role == 0)
//   return res.status(201).send({
//     data: null,
//     msg: "Admin không thể đăng ký CTV",
//     status: false,
//   });
//   if (user.role == 1)
//     return res.status(201).send({
//       data: null,
//       msg: "Bạn đã đăng ký CTV rồi mà!",
//       status: false,
//     });
//   let ctv_fee = await Settings.findOne({ key: "ctv_fee" }).exec()
//   if (!ctv_fee)
//     return res.status(201).send({
//       data: null,
//       msg: "Không tìm thấy cấu hình ctv_fee!",
//       status: false,
//     });
//   if (user.balance < ctv_fee.value) {
//     return res.status(201).send({
//       data: null,
//       msg: "Số dư không đủ để đăng ký CTV",
//       status: false,
//     });
//   }
//   user.role = 1;
//   user.balance = user.balance - ctv_fee.value
//   user.accept_order = false
//   return user.save().then(async (data) => {
//     data = data.toObject()
//     return res.status(200).send({
//       msg: 'Đăng ký thành công! Vui lòng liên hệ admin để được xác nhận',
//       status: true,
//       data: data
//     });
//   }).catch((err) => {
//     return res.status(201).send({
//       msg: "Lỗi đăng ký: " + err.message,
//       status: false,
//       data: null
//     });
//   })
// }
// exports.search_users = async (req, res) => {
//   const { user: userAuth, body } = req
//   if (userAuth.role !== 0)
//     return res.status(201).send({
//       data: [],
//       msg: "Bạn không có quyền thực thi",
//       status: false,
//     });
//   let match
//   if (body.search) {
//     match = {
//       $or: [
//         { name: { $regex: body.search, '$options': 'i' } },
//         { phone: { $regex: body.search, '$options': 'i' } },
//         { username: { $regex: body.search, '$options': 'i' } },
//         { email: { $regex: body.search, '$options': 'i' } },
//       ],
//     }
//   }
//   else {
//     return res.status(201).send({
//       data: [],
//       msg: "Tìm kiếm không hợp lệ",
//       status: false,
//     });
//   }
//   if (typeof body.role !== "undefined" && body.role !== null) match.role = body.role


//   Users.find(match)
//     .sort({ _id: -1 })
//     .select("_id username")
//     .exec((err, doc) => {
//       if (err) {
//         return res.status(201).send({
//           msg: 'Lấy danh sách thất bại :' + err.message,
//           status: false,
//           data: []
//         });
//       }

//       return res.status(200).send({
//         msg: 'Lấy danh sách thành công',
//         status: true,
//         data: doc
//       });

//     });

// };
