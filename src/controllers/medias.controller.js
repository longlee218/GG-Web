// var path = require('path');
// const fs = require("fs")
// exports.upload = async (req, res) => {
//     const { files, user } = req;
//     try {
//         if(user.role !== 0)
//         {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Không có quyền thực thi",
//                 status: false,
//             });
//         }
//         if (!files) {
//             return res.status(201).send({
//                 data: null,
//                 msg: "Upload không thành công",
//                 status: false,
//             });
//         }
//         return res.status(200).send({
//             data: files[0].filename,
//             msg: `Upload thành công`,
//             status: true,
//         });

//     } catch (err) {
//         // console.log(err.message)
//         return res.status(201).send({
//             data: null,
//             msg: "Upload không thành công: " + err.message,
//             status: false,
//         });
//     }
// };
// exports.delete = async (req, res) => {
//     const { user } = req;
//     const { name } = req.query
//     try {
//         if(user.role !== 0)
//         {
//             return res.status(201).send({
//                 data: name,
//                 msg: "Không có quyền thực thi",
//                 status: false,
//             });
//         }
//         if (!name) {
//             return res.status(201).send({
//                 data: name,
//                 msg: "Xóa ảnh không thành công",
//                 status: false,
//             });
//         }
//         var pathToFile = path.join(__dirname, '../../uploads_abc_xyz/', name) 
//         fs.unlink(pathToFile, function(err) {
//         if (err) {
//             return res.status(201).send({
//                 data: name,
//                 msg: "Xóa ảnh không thành công",
//                 status: false,
//             });
//         } else {
//             return res.status(200).send({
//                 data: name,
//                 msg: `Xóa ảnh thành công`,
//                 status: true,
//             });
//         }
//         })
       

//     } catch (err) {
//         return res.status(201).send({
//             data: name,
//             msg: "Xóa ảnh không thành công",
//             status: false,
//         });
//     }
// };