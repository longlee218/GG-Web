const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const User = require("../models/Users");
const help = require("../utils/help")


const auth = async (req, res, next) => {
 
  try {
    const access_token = req.header("Authorization").replace("Bearer ", "");
    if (!access_token) {
      return res.status(401).send({
        data: { user: {}, token: null },
        msg: "Đã hết phiên đăng nhập. Vui lòng đăng nhập lại",
        status: false,
      });
    }
  
    let check = jwt.verify(access_token, config.secret);
    if (!check)
      return res.status(401).send({
        data: { user: {}, token: null },
        msg: "Đã hết phiên đăng nhập. Vui lòng đăng nhập lại",
        status: false,
      });
    let user = {}
    // var clientIp =  requestIp.getClientIp(req);  
   
    if(check.data.device == "web")
    {
      user = await User.findOne({user_name: check.data.user_name, code_web: check.data.code, ip_web: check.data.ip}).exec();
    }
    else if(check.data.device == "extension")
    {
      user = await User.findOne({user_name: check.data.user_name, code_extension: check.data.code, ip_extension: check.data.ip}).exec();
    }
    else {
      return res.status(401).send({
        data: { user: {}, token: null },
        msg: "Đăng nhập thất bại, thông tin không hợp lệ",
        status: false,
      });
    }
    if (user) {
      if(!user.status)
      {
        return res.status(201).send({
          data: {},
          msg: "Tài khoản của bạn hiện đang tạm khóa. Vui lòng liên hệ Admin",
          status: false,
        });
      }
      req.user = user;
      req.token = access_token;
      req.device = check.data.device
      next();
    } else {
      let user = await User.findOne({user_name: check.data.user_name}).exec();
      user.code_extension = check.data.device == "extension" ? help.uuidv4Short() : user.code_extension
      user.code_web = check.data.device == "web" ? help.uuidv4Short() : user.code_web
      user.ip_extension = check.data.device == "extension" ? req.clientIp : user.ip_extension
      user.ip_web = check.data.device == "web" ? req.clientIp : user.ip_web
      user.save();
      return res.status(401).send({
        data: { user: {}, token: null },
        msg: "Đã hết phiên đăng nhập. Vui lòng đăng nhập lại",
        status: false,
      });
    }
  } catch (error) {
    return res.status(401).send({
      data: { user: {}, token: null },
      msg: "Đã hết phiên đăng nhập. Vui lòng đăng nhập lại.",
      status: false,
    });
  }
};

module.exports = auth;
