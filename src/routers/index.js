const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
// const auth_valid = require("../middleware/auth_valid");

// const settings = require("../controllers/settings.controller");
// const users = require("../controllers/users.controller");
// const accounts = require("../controllers/accounts.controller");
// const categorys = require("../controllers/categorys.controller");
// const boosts = require("../controllers/boosts.controller");
// const wheels = require("../controllers/wheels.controller");
// const medias = require("../controllers/medias.controller");
// const items = require("../controllers/items.controller");
// const discounts = require("../controllers/discounts.controller");
// const deposits = require("../controllers/deposits.controller");
const { uuidv4Long, uuidv4Short } = require("../utils/help");
const fs = require('fs');
const UserController = require("../controllers/users.controller");
const { validate } = require("../models/Categorys");
const Validator = require("../middleware/validator");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let patch = `uploads_abc_xyz/`
    if (typeof req.headers.folder !== "undefined" && req.headers.folder !== null)
      patch += `${req.headers.folder}/`
    console.log(patch)
    if (!fs.existsSync(patch)) {
      fs.mkdirSync(patch);
    }
    cb(null, patch);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    let fileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
    let filename = fileName + "_" + uuidv4Short() + ext
    cb(null, filename);
  }

});
const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {     // upload only png and jpg format
      return cb(new Error('Chỉ upload ảnh đuôi png, jpg, jpeg, gif'))
    }
    cb(undefined, true)
  },

});
///////Media
// router.post("/media/upload",  auth, upload.array("files", 50), medias.upload);
// router.post("/media/delete",  auth,  medias.delete);

// router.get('/media/:picture', function (req, res) {
//   var filepath = path.join(__dirname, '../../uploads_abc_xyz/', req.params.picture) 
//   res.sendFile(filepath);
// })
// router.get('/media/:folder/:picture', function (req, res) {
//   var filepath = path.join(__dirname, '../../uploads_abc_xyz/',req.params.folder, req.params.picture) 
//   res.sendFile(filepath);
// })
// ///////Setting
// router.post("/setting/summarys",auth, settings.summarys);
// router.post("/setting/get_pending",auth, settings.get_pending);

// router.post("/setting/set", auth, settings.setting_set);
// router.post("/setting/save", auth, settings.setting_save);

// router.post("/setting/get", auth, settings.setting_get);
// router.post("/setting/server", settings.server);

////////User
router.post("/user/register", Validator.validateRegisterUser, UserController.register);
router.post("/user/login", UserController.login);
router.post("/user/update", UserController.update);
router.post("/user/me", auth, UserController.me);
router.post("/user/logout", auth, UserController.logout);

// router.post("/user/create_payments_wildcore", auth, users.create_payments_wildcore);
// router.post("/user/get_payments_wildcore", auth, users.get_payments_wildcore);
// router.post("/user/approve_payments_wildcore", auth, users.approve_payments_wildcore);
// router.post("/user/delete_payments_wildcore", auth, users.delete_payments_wildcore);
// router.post("/user/update_payments_wildcore", auth, users.update_payments_wildcore);

// router.post("/user/create_payments_withdraw", auth, users.create_payments_withdraw);
// router.post("/user/get_payments_withdraw", auth, users.get_payments_withdraw);
// router.post("/user/approve_payments_withdraw", auth, users.approve_payments_withdraw);
// router.post("/user/delete_payments_withdraw", auth, users.delete_payments_withdraw);
// router.post("/user/update_payments_withdraw", auth, users.update_payments_withdraw);

// router.post("/user/get_users", auth, users.get_users);
// router.post("/user/search_users", auth, users.search_users);

// router.post("/user/register_ctv", auth, users.register_ctv);
// router.post("/user/update_user", auth, users.update_user);
// router.post("/user/change_password", auth, users.change_password);

// ///////Account
// router.post("/account/add_account", auth, accounts.add_account);
// router.post('/account/change_account_info', function(req, res, next){
//     res.setTimeout(300 * 1000, function(){
//         return res.status(200).send({
//           status:false,
//           msg:"Hệ thống đang thay đổi thông tin tài khoản, vui lòng chờ",
//           data: req.body
//         })
//     });
//     next();
//   }, auth_valid, accounts.change_account_info)
// router.post("/account/update_account", auth, accounts.update_account);
// router.post("/account/add_account_random", auth, accounts.add_account_random);
// router.post("/account/delete_account", auth, accounts.delete_account);
// router.post("/account/get_accounts_by_admin", auth, accounts.get_accounts_by_admin);
// router.post("/account/get_accounts_owner", auth, accounts.get_accounts_owner);
// router.post("/account/buy_account", auth, accounts.buy_account);
// router.post("/account/get_accounts", accounts.get_accounts);

// router.post("/account/get_historys", auth, accounts.get_historys);
// router.post("/account/delete_history", auth, accounts.delete_history);
// router.post("/account/search_account", auth, accounts.search_account);
// router.post("/account/get_account_price", auth, accounts.get_account_price);
// router.post("/account/get_account_info", auth, accounts.get_account_info);
// router.post("/account/change_owner", auth, accounts.change_owner);



// //////Boosting
// router.post("/boost/buy_boost", auth, boosts.buy_boost);
// router.post("/boost/update_boost", auth, boosts.update_boost);
// router.post("/boost/get_boost", auth, boosts.get_boost);
// router.post("/boost/apply_boost", auth, boosts.apply_boost);
// router.post("/boost/get_boost_price", auth, boosts.get_boost_price);

// //////Wheel
// router.post("/wheel/add_wheel", auth, wheels.add_wheel);
// router.post("/wheel/update_wheel", auth, wheels.update_wheel);
// router.post("/wheel/play", auth, wheels.play);
// router.post("/wheel/delete_wheel", auth, wheels.delete_wheel);
// router.post("/wheel/get_wheels", auth, wheels.get_wheels);
// router.post("/wheel/get_wheels_user", wheels.get_wheels_user);
// router.post("/wheel/get_historys", auth, wheels.get_historys);
// router.post("/wheel/search_wheel", auth, wheels.search_wheel);

// //////Item
// router.post("/item/add_item", auth, items.add_item);
// router.post("/item/update_item", auth, items.update_item);
// router.post("/item/delete_item", auth, items.delete_item);
// router.post("/item/buy_item", auth, items.buy_item);
// router.post("/item/search_item", auth, items.search_item);
// router.post("/item/get_items", auth, items.get_items);
// router.post("/item/get_items_user", items.get_items_user);

// router.post("/item/get_historys", auth, items.get_historys);
// router.post("/item/delete_history", auth, items.delete_history);
// router.post("/item/update_history", auth, items.update_history);
// router.post("/item/get_item_price", auth, items.get_item_price);

// router.post("/item/get_item_price_type", items.get_item_price_type);
// router.post("/item/add_item_price_type", auth, items.add_item_price_type);
// router.post("/item/update_item_price_type", auth, items.update_item_price_type);
// router.post("/item/delete_item_price_type", auth, items.delete_item_price_type);

// //////Discount
// router.post("/discount/add_discount", auth, discounts.add_discount);
// router.post("/discount/update_discount", auth, discounts.update_discount);
// router.post("/discount/delete_discount", auth, discounts.delete_discount);
// router.post("/discount/get_discounts", auth, discounts.get_discounts);

// ////Category
// router.post("/category/create_category", auth, categorys.create_category);
// router.post("/category/update_category", auth, categorys.update_category);
// router.post("/category/delete_category", auth, categorys.delete_category);
// router.post("/category/get_categorys", auth, categorys.get_categorys);
// router.post("/category/get_categorys_user", categorys.get_categorys_user);

// ////Deposit
// router.post("/deposit/create_deposit", auth, deposits.create_deposit);
// router.post("/deposit/get_deposits", auth, deposits.get_deposits);
// router.post("/deposit/delete_deposit", auth, deposits.delete_deposit);
// router.post("/deposit/update_deposit", auth, deposits.update_deposit);

// router.post("/deposit/card_callback", deposits.card_callback);


module.exports = router;
