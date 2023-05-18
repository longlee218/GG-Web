// var https = require('https');
// var fs = require('fs');
// const schedule = require('node-schedule');
// const { momoProcess, acbProcess, techcombankProcess } = require('../controllers/deposits.controller');
// const moment = require("moment");
// const Accounts = require('../models/Accounts');
// const Bluebird = require('bluebird');
// const { deleteFolderRecursive } = require('../utils/help');
// const redisClient = require('../../config/redis');

// var download = async function(url, dest, cb) {
//     try {
//         var file = fs.createWriteStream(dest);
//         https.get(url, function(response) {
//             response.pipe(file);
//             file.on('finish', function() {
//             file.close(cb);  // close() is async, call cb after close completes.
//             });
//         }).on('error', function(err) { // Handle errors
//             fs.unlink(dest); // Delete the file async. (But we don't check the result)
//             if (cb) cb(err.message);
//         });
//     } catch (error) {
//         console.log(error.message)
//     }
  
// };

// const checkSellAcc = async ()=>{
//     try {
//     let accountList = await Accounts.find({
//         $or:[{type: 1}, {type: 2}], $or:[{is_delete_img: false}, {is_delete_img: null}]}).exec()
//     if(accountList.length)
//     {
//         await Bluebird.each(accountList, async account=>{
         
//             let sell_date = account.sell_date
//             if(sell_date)
//             {
//                 let diff = moment().diff(moment(sell_date), "day")

//                 if(diff >= 90)
//                 {
//                     account.is_delete_img = true
                  
//                     account.save()
//                     deleteFolderRecursive(`uploads_abc_xyz/${account.username}/`)
//                 }
              
//             }
        
         
//         })
        
//     }
// } catch (error) {
//     console.log(error.message)
//   }
// }
// exports.scheduleJobs = async function () {
//     schedule.scheduleJob('59 * * * *', async function(){
//         console.log("RUN DOWNLOAD IP")
//         await download("https://proxy.webshare.io/proxy/list/download/xqrekuvcxsovszgfgscdlsmszkgdivpdwbeybumh/-/http/port/direct/", "./data/ip.txt")
//     });
//     schedule.scheduleJob("*/30 * * * * *", async () => {
     
//         let momo_data = await redisClient.get("momo_data")
//         if(momo_data)
//         {
//             const { status } = JSON.parse(momo_data)
//             if(status)
//             {
//                 console.log(`Fetch MOMO ${moment().format("L LTS")}`);
//                 await momoProcess(momo_data)
//             }
                
//         }
//     });
//     schedule.scheduleJob("*/30 * * * * *", async () => {
//         let acb_data = await redisClient.get("acb_data")
//         if(acb_data)
//         {
//             const { status } = JSON.parse(acb_data)
//             if(status)
//             {
//                 console.log(`Fetch ACB ${moment().format("L LTS")}`);
//                 await acbProcess(acb_data)
//             }
                
//         }
//     });
//     schedule.scheduleJob("*/30 * * * * *", async () => {
//         let techcombank_data = await redisClient.get("techcombank_data")
//         if(techcombank_data)
//         {
//             const { status } = JSON.parse(techcombank_data)
//             if(status)
//             {
//                 console.log(`Fetch TECHCOMBANK ${moment().format("L LTS")}`);
//                 await techcombankProcess(techcombank_data)
//             }
                
//         }
//     });
//     schedule.scheduleJob("0 1 * * *", async () => {
//         console.log(`Check Account Img ${moment().format("L LTS")}`);
//         await checkSellAcc()
//     });
// };

