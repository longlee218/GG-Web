// var CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
// const config = require("../../config/auth");
// const { default: axios } = require('axios');
// var request = require('request-promise');
// var fs = require('fs');
// require.extensions['.txt'] = function (module, filename) {
// 	module.exports = fs.readFileSync(filename, 'utf8');
// };
// const path = require('path');

// let ipFile = require("../../data/ip.txt");
// const sleep = require("sleep-promise");
// const { Cookie } = require("tough-cookie");
// const Categorys = require("../models/Categorys");
// const Discounts = require("../models/Discounts");
// const History_Accounts = require("../models/History_Accounts");
// const User = require("../models/Users");
// let ciphers = [
// 	"TLS_AES_128_GCM_SHA256",
// 	"TLS_CHACHA20_POLY1305_SHA256",
// 	"TLS_AES_256_GCM_SHA384"
// ].join(":")

// function uuidv4Long() {
// 	return "4xxx-yxxx-xxxx-xxxyx-xxxx-xxxx".replace(/[xy]/g, function (c) {
// 		var r = (Math.random() * 16) | 0,
// 			v = c == "x" ? r : (r & 0x3) | 0x8;
// 		return v.toString(16);
// 	});
// }
// function uuidv4Short() {
// 	return "4xxx-yxxx-xxxx".replace(/[xy]/g, function (c) {
// 		var r = (Math.random() * 16) | 0,
// 			v = c == "x" ? r : (r & 0x3) | 0x8;
// 		return v.toString(16);
// 	});
// }
// function uuidv4Payment() {
// 	return "TCSxxyxxx".replace(/[xy]/g, function (c) {
// 		var r = (Math.random() * 16) | 0,
// 			v = c == "x" ? r : (r & 0x3) | 0x8;
// 		return v.toString(16).toUpperCase();
// 	});
// }
// function uuidv4Ref() {
// 	return "xyyyxyxxxx".replace(/[xy]/g, function (c) {
// 		var r = (Math.random() * 16) | 0,
// 			v = c == "x" ? r : (r & 0x3) | 0x8;
// 		return v.toString(16).toUpperCase();
// 	});
// }
// function isVietnamesePhoneNumberValid(number) {
// 	return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
// }
// function randomString(string_length) {
// 	var chars = "0123456789";
// 	var randomstring = '';
// 	for (var i = 0; i < string_length; i++) {
// 		var rnum = Math.floor(Math.random() * chars.length);
// 		randomstring += chars[rnum];
// 	}
// 	return "2234" + randomstring;
// }
// const createToken = (username, password, ip, device, code) => {
// 	const data = jwt.sign(
// 		{
// 			data: {
// 				code: code,
// 				username,
// 				ttl: password,
// 				ip,
// 				time: Date.now(),
// 				device
// 			},
// 		},
// 		config.secret,
// 		{ expiresIn: device == "extension" ? "900h" : "900h" }
// 	);
// 	return data;
// };
// function getRandomString(length) {
// 	var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
// 	var result = '';
// 	for (var i = 0; i < length; i++) {
// 		result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
// 	}
// 	return result;
// }
// const curencyFormat = (value) => {
// 	if (value) {
// 		var format = new Intl.NumberFormat("vi-VN", {
// 			style: "currency",
// 			currency: "VND",
// 		});
// 		return format.format(value);
// 	}
// 	else {
// 		return "0 đ"
// 	}
// };
// function stringifyCookies(cookies) {
// 	let cookie = []
// 	cookies.forEach(c => {
// 		let split_c = c.split(";")[0]
// 		let [key, value] = split_c.split("=")
// 		let cookieStr = key + "=" + value
// 		cookie.push(cookieStr)
// 	});
// 	if (cookie.length)
// 		return cookie.join(";") + ";"
// 	else return ""
// }
// const getToken_Cookie_WildStarts = async () => {
// 	var config = {
// 		method: 'get',
// 		url: 'https://sea.wildstats.gg/en/profile/gameid',
// 	};
// 	return axios(config)
// 		.then(function (response) {
// 			const { data, headers } = response;
// 			let token, cookie = null
// 			let csft_token = /name="csrf-token" content="([^"]+)">/gm.exec(data)
// 			if (csft_token.length) {
// 				token = csft_token[1]
// 			}
// 			cookie = stringifyCookies(headers["set-cookie"])
// 			return {
// 				token,
// 				cookie
// 			}
// 		})
// 		.catch(function (error) {
// 			return {
// 				token: null,
// 				cookie: null
// 			}
// 		});

// }
// const checkAccInfo = async (gameid) => {

// 	let ip = getRandomIP()
// 	let tokenCookie = await getToken_Cookie_WildStarts()
// 	const { token, cookie } = tokenCookie
// 	let level = null;
// 	let rank = null;
// 	let totalGame = null;
// 	if (token && cookie) {
// 		var options = {
// 			followAllRedirects: true,
// 			jar: true,
// 			'method': 'POST',
// 			'url': 'https://sea.wildstats.gg/en/profile/gameid',
// 			proxy: 'http://' + ip,
// 			'headers': {
// 				'Cookie': cookie
// 			},
// 			formData: {
// 				'_token': token,
// 				'gameid': gameid
// 			}
// 		};
// 		request(options, function (error, response) {

// 			if (error) {
// 				return {
// 					level,
// 					rank,
// 					totalGame,
// 					status: false,
// 					msg: error.message
// 				}
// 			}
// 			let data = response.body
// 			let regexLv = /<div class="profile-level">Level ([0-9]+)<\/div/gm.exec(data)
// 			if (regexLv && regexLv.length)
// 				level = regexLv[1]

// 			let regexRank = /<div style="margin-bottom:10px;">([a-zA-Z0-9 ]+)<\/div>/gm.exec(data)
// 			if (regexRank && regexRank.length)
// 				rank = regexRank[1]

// 			let regexTotalGame = /totalBattles': "([0-9]+)",/gm.exec(data)
// 			if (regexTotalGame && regexTotalGame.length)
// 				totalGame = regexTotalGame[1]

// 			if (level !== null)
// 				return {
// 					level: Number(level),
// 					rank,
// 					totalGame,
// 					status: true,
// 					msg: "success"
// 				}
// 			else
// 				return {
// 					level,
// 					rank,
// 					totalGame,
// 					status: false,
// 					msg: "Vui lòng thử lại"
// 				}
// 		});
// 	}
// 	else {
// 		return {
// 			level,
// 			rank,
// 			totalGame,
// 			status: false,
// 			msg: "Vui lòng đăng nhập lại hoặc refresh trang"
// 		}
// 	}
// }
// function getRandomIP() {
// 	try {
// 		var lines = ipFile.split('\n');
// 		return lines[Math.floor(Math.random() * lines.length)];
// 	} catch (error) {
// 		return null
// 	}

// }
// const getEmailMessage = async (username, email, type, lastSubject) => {
// 	try {
// 		let url = `https://tmailvip.com/api/messages/${email}/dkz8WyYCw2qiIDJp4bum`
// 		let emailResponse = await axios.get(url).then((response) => { return response }).catch((error) => { return error.response })
// 		const { data: emailMessageList, status } = emailResponse
// 		if (status !== 200) return { status: false, data: null, msg: "Không login được email" };
// 		if (emailMessageList.length > 0) {
// 			let emailItem = emailMessageList[emailMessageList.length - 1];
// 			let emailSubject = emailItem.subject;

// 			console.log(username, email, "Now Subject: " + emailSubject, "Last subject: " + lastSubject)

// 			if (type == "1") {
// 				let emailItem = emailMessageList[emailMessageList.length - 1];
// 				let emailSubject = emailItem.subject;

// 				if (emailSubject !== lastSubject) {
// 					return { status: true, data: emailSubject, msg: "Tìm thấy email" };
// 				}
// 				else return { status: false, data: null, msg: "Không tìm thấy email" };
// 			}
// 			else if (type == "2") {
// 				if (emailMessageList && emailMessageList.length > 2) {
// 					let emailItem = emailMessageList[emailMessageList.length - 1]
// 					let emailSubject = emailItem.subject;
// 					return { status: true, data: emailSubject, msg: "Tìm thấy email" };

// 				}
// 				else return { status: false, data: null, msg: "Không tìm thấy email" };
// 			}
// 			else {

// 				let emailItem = emailMessageList[emailMessageList.length - 1]
// 				let emailSubject = emailItem.subject;
// 				return { status: true, data: emailSubject, msg: "Tìm thấy email" };
// 			}
// 		}
// 		else {
// 			return { status: false, data: null, msg: "Chưa có email" };
// 		}
// 	} catch (error) {
// 		return { status: false, data: null, msg: "Lỗi tìm kiếm email: " + error.message };
// 	}

// }
// const getCodeEmail = async (email, lastSubject, username) => {
// 	try {
// 		let index = 0;
// 		let emailMessage = await getEmailMessage(username, email, "1", lastSubject);
// 		while (emailMessage.status == false && index <= 20) {
// 			index = index + 1;
// 			if (index >= 1 && index <= 15) {
// 				emailMessage = await getEmailMessage(username, email, "1", lastSubject);
// 			}
// 			else {
// 				emailMessage = await getEmailMessage(username, email, "2", lastSubject);
// 			}
// 			if (emailMessage.status !== false || index > 20) break;
// 			await sleep(2000)
// 		}
// 		if (emailMessage.status) {
// 			let regexSubject = /: ([0-9]+)/gm.exec(emailMessage.data)
// 			if (regexSubject.length > 1) {
// 				return regexSubject[1];
// 			}
// 			else return false;
// 		}
// 		else
// 			return false;

// 	} catch (error) {
// 		return false
// 	}

// }
// const get_user_riot = async (jar, ip) => {
// 	let requestProxy = request.defaults({
// 		proxy: 'http://' + ip
// 	});

// 	let url = "https://account.riotgames.com/api/account/v1/user"
// 	let options = {
// 		method: 'GET',
// 		url: url,
// 		followAllRedirects: true,
// 		ciphers: ciphers,
// 		jar: jar,
// 		json: true,
// 		resolveWithFullResponse: true,
// 		headers: {
// 			'accept': '*/*',
// 			'referer': 'https://account.riotgames.com/',
// 			'sec-ch-ua-platform': '"Windows"',
// 			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
// 		}
// 	}
// 	return await requestProxy(options)
// 		.then((response) => {
// 			return response
// 		})
// 		.catch((error) => {
// 			if (error.response?.statusCode) return error.response
// 			else return { statusCode: 500, body: error.message }
// 		})
// }
// const change_email_account = async (jar, ip, email, csft_token) => {
// 	let requestProxy = request.defaults({
// 		proxy: 'http://' + ip
// 	});

// 	let url = "https://account.riotgames.com/api/account/v1/user/email"
// 	var optionsLogin = {
// 		method: 'POST',
// 		url: url,
// 		ciphers: ciphers,
// 		jar: jar,
// 		json: true,
// 		resolveWithFullResponse: true,
// 		'headers': {
// 			'Host': 'account.riotgames.com',
// 			'Connection': 'keep-alive',
// 			'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
// 			'Accept': 'application/json',
// 			'csrf-token': csft_token,
// 			'Content-Type': 'application/json',
// 			'sec-ch-ua-mobile': '?0',
// 			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
// 			'sec-ch-ua-platform': '"Windows"',
// 			'Origin': 'https://account.riotgames.com',
// 			'Sec-Fetch-Site': 'same-origin',
// 			'Sec-Fetch-Mode': 'cors',
// 			'Sec-Fetch-Dest': 'empty',
// 			'Referer': 'https://account.riotgames.com/',

// 		},
// 		body: {
// 			email: email,
// 		},

// 	};
// 	let changeEmailResponse = await requestProxy(optionsLogin).then(response => {
// 		return response
// 	}).catch(error => {
// 		if (error.response?.statusCode) return error.response
// 		else return { statusCode: 999, body: error.message }
// 	})
// 	const { statusCode, body } = changeEmailResponse
// 	if (typeof body.message !== 'undefined' && body.message == "email_verification_sent")
// 		return { status: true, data: body, msg: `Thay đổi thành công, vui lòng xác nhận tại ${email}` }

// 	else {
// 		return { status: false, data: null, msg: body?.message + " " + "Vui lòng thử lại" }
// 	}
// }
// const change_password_account = async (jar, ip, password, old_password, csft_token) => {
// 	let requestProxy = request.defaults({
// 		proxy: 'http://' + ip
// 	});

// 	let url = "https://account.riotgames.com/api/account/v1/user/password"
// 	var optionsLogin = {
// 		method: 'PUT',
// 		url: url,
// 		ciphers: ciphers,
// 		jar: jar,
// 		json: true,
// 		resolveWithFullResponse: true,
// 		'headers': {
// 			'Host': 'account.riotgames.com',
// 			'Connection': 'keep-alive',
// 			'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
// 			'Accept': 'application/json',
// 			'csrf-token': csft_token,
// 			'Content-Type': 'application/json',
// 			'sec-ch-ua-mobile': '?0',
// 			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
// 			'sec-ch-ua-platform': '"Windows"',
// 			'Origin': 'https://account.riotgames.com',
// 			'Sec-Fetch-Site': 'same-origin',
// 			'Sec-Fetch-Mode': 'cors',
// 			'Sec-Fetch-Dest': 'empty',
// 			'Referer': 'https://account.riotgames.com/',
// 		},
// 		body: {
// 			password: password,
// 			currentPassword: old_password
// 		},

// 	};
// 	let changePasswordResponse = await requestProxy(optionsLogin).then(response => {
// 		return response
// 	}).catch(error => {
// 		if (error.response?.statusCode) return error.response
// 		else return { statusCode: 999, body: error.message }
// 	})
// 	const { body } = changePasswordResponse
// 	if (typeof body.message !== 'undefined' && body.message == "password_updated")
// 		return { status: true, data: body, msg: "Thay đổi thành công" }

// 	else {
// 		return { status: false, data: null, msg: body?.message + " " + "Vui lòng thử lại" }
// 	}
// }
// const change_riot_id_account = async (jar, ip, game_name, tag_line, csft_token) => {
// 	let requestProxy = request.defaults({
// 		proxy: 'http://' + ip
// 	});
// 	var options = {
// 		method: 'POST',
// 		url: 'https://account.riotgames.com/api/riot-id?email_locale=en_US',
// 		ciphers: ciphers,
// 		jar: jar,
// 		json: true,
// 		resolveWithFullResponse: true,
// 		'headers': {
// 			'accept': 'application/json',
// 			'content-type': 'application/json',
// 			'csrf-token': csft_token,
// 			'origin': 'https://account.riotgames.com',
// 			'referer': 'https://account.riotgames.com/',
// 			'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
// 			'sec-ch-ua-mobile': '?0',
// 			'sec-ch-ua-platform': '"Windows"',
// 			'sec-fetch-dest': 'empty',
// 			'sec-fetch-mode': 'cors',
// 			'sec-fetch-site': 'same-origin',
// 			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
// 		},
// 		body: {
// 			"game_name": game_name,
// 			"tag_line": tag_line
// 		}
// 	};
// 	let response = await requestProxy(options).then(response => {
// 		return response
// 	}).catch(error => {
// 		if (error.response?.statusCode) return error.response
// 		else return { statusCode: 999, body: error.message }
// 	})
// 	const { body, statusCode } = response
// 	if (typeof body.active !== 'undefined' && body.active == true)
// 		return { status: true, data: body, msg: "Thay đổi thành công" }
// 	else {
// 		return { status: false, data: null, msg: body?.errorCode }
// 	}

// }
// const loginRiot = async (username, password, email) => {
// 	try {
// 		let url = "https://auth.riotgames.com/api/v1/authorization"
// 		var jar = request.jar()
// 		let lastEmailSubject = await getEmailMessage(username, email, "3", 0);
// 		if (lastEmailSubject.status == false) {
// 			console.log(username, email, "Không login được email")
// 			return { status: false, data: null, msg: "Không login được email" }
// 		}

// 		let ip = getRandomIP()
// 		if (!ip) {
// 			console.log(username, email, "Không lấy được proxy")
// 			return { status: false, data: null, msg: "Không lấy được proxy" }
// 		}

// 		let requestProxy = request.defaults({
// 			proxy: 'http://' + ip
// 		});
// 		var optionsCookie = {
// 			method: 'POST',
// 			url: url,
// 			followAllRedirects: true,
// 			ciphers: ciphers,
// 			jar: jar,
// 			json: true,
// 			resolveWithFullResponse: true,
// 			'headers': {
// 				'Host': 'auth.riotgames.com',
// 				'Connection': 'keep-alive',
// 				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
// 				'Accept': '*/*',
// 				'Referer': 'https://auth.riotgames.com/login',
// 				'Content-Type': 'application/json'

// 			},
// 			body: { "acr_values": "urn:riot:gold", "client_id": "accountodactyl-prod", "redirect_uri": "https://account.riotgames.com/oauth2/log-in", "response_type": "code", "scope": "openid email profile riot://riot.atlas/accounts.edit riot://riot.atlas/accounts/password.edit riot://riot.atlas/accounts/email.edit riot://riot.atlas/accounts.auth riot://third_party.revoke riot://third_party.query riot://forgetme/notify.write riot://riot.authenticator/auth.code riot://riot.authenticator/authz.edit riot://rso/mfa/device.write" },
// 		};
// 		let cookieResponse = await requestProxy(optionsCookie).then(response => {
// 			return response
// 		}).catch(error => {
// 			if (error.response?.statusCode) return error.response
// 			else return { statusCode: 500, body: error.message }
// 		})

// 		let { body: dataCookie, statusCode: statusCookie } = cookieResponse;
// 		if (statusCookie !== 200) {
// 			console.log(username, email, "Lấy cookie thất bại")

// 			return { status: false, data: null, msg: "Lấy cookie thất bại"}
// 		}
// 		console.log(username, email, "Lấy thành công Cookie")
// 		var optionsLogin = {
// 			method: 'PUT',
// 			url: url,
// 			followAllRedirects: true,
// 			ciphers: ciphers,
// 			jar: jar,
// 			json: true,
// 			resolveWithFullResponse: true,
// 			'headers': {
// 				'Host': 'auth.riotgames.com',
// 				'Connection': 'keep-alive',
// 				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
// 				'Accept': '*/*',
// 				'Referer': 'https://auth.riotgames.com/login',
// 				'Content-Type': 'application/json'
// 			},
// 			body: {
// 				type: "auth",
// 				username: username,
// 				password: password,
// 			},

// 		};
// 		let loginResponse = await requestProxy(optionsLogin).then(response => {
// 			return response
// 		}).catch(error => {
// 			if (error.response?.statusCode) return error.response
// 			else return { statusCode: 500, body: error.message }
// 		})
// 		let { body: dataLogin, statusCode: statusAccount } = loginResponse
// 		if (statusAccount !== 200) {
// 			console.log(username, email, "Không thể đăng nhập - Sai username hoặc mật khẩu")
// 			return { status: false, data: null, msg: "Không thể đăng nhập - Sai username hoặc mật khẩu" }
// 		}
// 		if (dataLogin.error)
// 			return { status: false, data: dataLogin, msg: dataLogin.error }
// 		let urlLogin = null
// 		console.log(username, email, "Login thành công, tiến hành lấy code")
// 		if (dataLogin.type == "multifactor") /// verify Email
// 		{
// 			if (dataLogin.multifactor.method == "email") {
// 				let emailAccount = dataLogin.multifactor.email
// 				if (email.substr(0, 3) !== emailAccount.substr(0, 3)) {
// 					console.log(username, email, `Email của tài khoản đã bị thay đổi ${emailAccount}`)
// 					return { status: false, data: null, msg: `Email của tài khoản đã bị thay đổi ${emailAccount}` }
// 				}
// 				let code = await getCodeEmail(email, lastEmailSubject.data, username);
// 				if (code) {
// 					console.log(username, email, "Tìm thấy code", code)
// 					let optionLoginCode = {
// 						method: 'PUT',
// 						url: url,
// 						followAllRedirects: true,
// 						ciphers: ciphers,
// 						jar: jar,
// 						json: true,
// 						resolveWithFullResponse: true,
// 						headers: {
// 							'Host': 'auth.riotgames.com',
// 							'Connection': 'keep-alive',
// 							'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
// 							'Accept': '*/*',
// 							'Referer': 'https://auth.riotgames.com/login',
// 							'Content-Type': 'application/json'
// 						},
// 						body: {
// 							type: "multifactor",
// 							code: code,
// 							rememberDevice: false,
// 						},
// 					}
// 					var loginViaCodeResponse = await requestProxy(optionLoginCode)
// 						.then((response) => {
// 							return response
// 						})
// 						.catch((error) => {
// 							if (error.response?.statusCode) return error.response
// 							else return { statusCode: 500, body: error.message }
// 						})

// 					const { statusCode: statusLoginCode, body: dataLoginCode } = loginViaCodeResponse
// 					console.log(username, email, "Lấy thành công URL, tiến hành login")
// 					if (statusLoginCode !== 200) {
// 						console.log(username, email, "Không thể đăng nhập - Sai code email")
// 						return { status: false, data: null, msg: "Không thể đăng nhập - Sai code email" }
// 					}
// 					if (dataLoginCode.type == "error" || dataLoginCode.error !== undefined) {
// 						console.log(username, email, "Không thể đăng nhập - Sai code email")
// 						return { status: false, data: null, msg: "Không thể đăng nhập - Sai code email" }
// 					}
// 					urlLogin = dataLoginCode.response.parameters.uri;
// 				}
// 				else {
// 					console.log(username, email, "Không lấy được email code")
// 					return { status: false, data: null, msg: "Không lấy được email code" }
// 				}
// 			}
// 			else {
// 				console.log(username, email, "Account có 2FA")
// 				return { status: false, data: null, msg: "Account 2FA" }
// 			}

// 		}
// 		else {
// 			urlLogin = dataLogin.response.parameters.uri;
// 		}
// 		if (urlLogin == null) {
// 			console.log(username, email, "Không thể đăng nhập, không lấy được url đăng nhập")
// 			return { status: false, data: null, msg: "Không thể đăng nhập, không lấy được url đăng nhập" }
// 		}

// 		let optionLoginUrl = {
// 			method: 'GET',
// 			url: urlLogin,
// 			followAllRedirects: true,
// 			ciphers: ciphers,
// 			jar: jar,
// 			followRedirect: true,
// 			resolveWithFullResponse: true,
// 			headers: {
// 				'accept': '*/*',
// 				'referer': 'https://account.riotgames.com/',
// 				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
// 			}
// 		}
// 		await requestProxy(optionLoginUrl)
// 		let userResponse = await get_user_riot(jar, ip)
// 		const { statusCode: statusUser, body: dataUser } = userResponse
// 		if (statusUser !== 200) {
// 			console.log(username, email, "Đăng nhập thất bại, lấy thông tin account không thành công")
// 			return { status: false, data: null, msg: "Đăng nhập thất bại, lấy thông tin account không thành công" }
// 		}
// 		else {
// 			console.log(username, email, "Lấy thông tin user thành công")
// 			let optionCsrf = {
// 				method: 'GET',
// 				url: "https://account.riotgames.com/",
// 				ciphers: ciphers,
// 				jar: jar,
// 				resolveWithFullResponse: true,
// 				headers: {
// 					'accept': '*/*',
// 					'referer': 'https://account.riotgames.com/',
// 					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
// 				}
// 			}
// 			let csfrResponse = await requestProxy(optionCsrf)
// 				.then((response) => {
// 					return response
// 				})
// 				.catch((error) => {
// 					if (error.response?.statusCode) return error.response
// 					else return { statusCode: 500, body: error.message }
// 				})
// 			const { statusCode: statusCsrf, body: dataCsrf } = csfrResponse
// 			if (statusCsrf !== 200) {
// 				console.log(username, email, "Không lấy được csrf token")
// 				return { status: false, data: null, msg: "Không lấy được csrf token" }
// 			}
// 			let regexCsrf = /'csrf-token' content='([a-zA-Z0-9-_.]+)' \/>/gm.exec(dataCsrf)
// 			if (regexCsrf.length > 1) {
// 				console.log(username, email, "Lấy thành công csrf token")
// 				return { status: true, data: dataUser, csrf_token: regexCsrf[1], msg: "Login thành công", jar, ip }
// 			}
// 			else {
// 				console.log(username, email, "Không lấy được csrf token")
// 				return { status: false, data: null, msg: "Không lấy được csrf token" }
// 			}

// 		}
// 	} catch (error) {
// 		return { status: false, data: null, msg: error.message }
// 	}

// }
// const get_rank_name = (rank) => {
// 	rank = rank.split("_")
// 	let result = ""
// 	switch (rank[0]) {
// 		case "iron":
// 			result = "Sắt";
// 			break;
// 		case "bronze":
// 			result = "Đồng";
// 			break;
// 		case "silver":
// 			result = "Bạc";
// 			break;
// 		case "gold":
// 			result = "Vàng";
// 			break;
// 		case "platinum":
// 			result = "Bạch kim";
// 			break;
// 		case "emerald":
// 			result = "Lục bảo";
// 			break;
// 		case "diamon":
// 			result = "Kim cương";
// 			break;
// 		case "master":
// 			result = "Cao thủ";
// 			break;
// 		case "grandmaster":
// 			result = "Đại cao thủ";
// 			break;
// 		default: result = "Thách đấu"
// 	}
// 	if (rank[1]) result = `${result} ${rank[1]}`
// 	return result

// }
// const getPaymentPrice = async (category_id, discount_code, price_before, payment_type, user, userRef) => {
// 	// console.log({category_id, discount_code, price_before, payment_type, user, userRef})
// 	let price = price_before
// 	let note = ""
// 	let discount_id = null
// 	let discount_type = 0
// 	if (category_id) {
// 		let category = await Categorys.findOne({ _id: category_id }).exec()
// 		if (category) {
// 			if (category.discount !== null && category.discount !== 0) {
// 				price = price - ((price / 100) * category.discount)
// 				note = `Bạn nhận được giảm giá danh mục ${category.discount}%. `
// 			}
// 		}
// 	}
// 	if (discount_code) {
// 		const discount_data = await Discounts.findOne({
// 			discount_code: discount_code,
// 		}).exec();
// 		// console.log(user)
// 		const discount_ref = await History_Accounts.findOne({ user: user._id, discount_ref: discount_code })
	
// 		if (!discount_data && discount_ref)
// 			return {
// 				data: price,
// 				status: false,
// 				message: "Mã giảm giá không hợp lệ hoặc đã sử dụng",
// 				note,
// 				discount_id,
// 				discount_type
// 			};
// 		if(discount_data)
// 		{
// 			discount_type = 0
// 			discount_id = discount_data._id
// 			if (
// 				new Date(discount_data.start_date) <= new Date() &&
// 				new Date(discount_data.end_date) >= new Date()
// 			) {
// 				////Mã km hết số lượng
// 				if (discount_data.amount <= 0)
// 					return {
// 						data: price,
// 						status: false,
// 						message: "Mã giảm giá này đã hết số lượng sử dụng",
// 						note,
// 						discount_id,
// 						discount_type
// 					};
// 				else if (discount_data.type !== 3 && discount_data.type !== payment_type) {
// 					return {
// 						data: price,
// 						status: false,
// 						message: `Mã giảm giá ${discount_code} không thể áp dụng cho ${payment_type == 0 ? "mua account" : payment_type == 1 ?
// 							"mua skin/item" : "cày thuê"}`,
// 						note,
// 						discount_id,
// 						discount_type
// 					};
// 				}
// 				else if (!discount_data.status) {
// 					return {
// 						data: price,
// 						status: false,
// 						message: `Mã giảm giá ${discount_code} đang tạm ngưng sử dụng`,
// 						note,
// 						discount_id,
// 						discount_type
// 					};
// 				}
// 				///// GET PRICE
// 				else {
// 					// Giảm %
// 					if (discount_data.discount_type == 0) {
// 						price = price - (price * discount_data.value / 100);
// 						note = note + `Giảm giá code: ${discount_data.discount_code} - ${discount_data.value}%. `;
// 					}
// 					// Giảm tiền
// 					else {
// 						price = price - discount_data.value;
// 						note = note + `Giảm giá code: ${discount_data.discount_code} - ${curencyFormat(discount_data.value)}`;
// 					}
	
// 					return {
// 						data: price < 0 ? 0 : price,
// 						status: true,
// 						message: "Lấy giá thành công",
// 						note: note,
// 						discount_id,
// 						discount_type
// 					};
// 				}
// 			}
// 			///Mã KM ko hợp lệ
// 			else {
// 				if (new Date(discount_data.start_date) > new Date()) {
// 					return {
// 						data: price,
// 						status: false,
// 						message: "Chương trình giảm giá này chưa được bắt đầu",
// 						note,
// 						discount_id,
// 						discount_type
// 					};
	
// 				} else if (new Date() > new Date(discount_data.end_date)) {
// 					return {
// 						data: price,
// 						status: false,
// 						message: "Mã giảm giá này đã hết hạn sử dụng",
// 						note,
// 						discount_id,
// 						discount_type
// 					};
// 				} else
// 					return {
// 						data: price,
// 						status: false,
// 						message: "Mã giảm giá không hợp lệ",
// 						note,
// 						discount_id,
// 						discount_type
// 					};
// 			}
// 		}
// 		else
// 		{
// 			discount_id = discount_code
// 			discount_type = 1
// 			if(!userRef)
// 			{
// 				return {
// 					data: price,
// 					status: false,
// 					message: `Mã giảm giá ${discount_code} không tồn tại hoặc đã được sử dụng`,
// 					note,
// 					discount_id,
// 					discount_type
// 				};
// 			}
// 			if (payment_type !== 0) 
// 				return {
// 					data: price,
// 					status: false,
// 					message: `Mã giảm giá ${discount_code} chỉ áp dụng cho mua account`,
// 					note,
// 					discount_id,
// 					discount_type
// 				};
			
// 			price = price - (price / 100 * userRef.share_profit)
// 			note = note + `Giảm giá code: ${discount_code} - 5%.`;
// 			return {
// 				data: price,
// 				status: true,
// 				message: `Lấy giá thành công`,
// 				note,
// 				discount_id,
// 				discount_type
// 			};
			
// 		}

// 	}
// 	////Không có mã KM
// 	else {
// 		return {
// 			data: price < 0 ? 0 : price,
// 			status: true,
// 			message: "Lấy giá thành công",
// 			note,
// 			discount_id,
// 			discount_type
// 		};
// 	}
// };
// const deleteFolderRecursive = function (directoryPath) {
// 	if (fs.existsSync(directoryPath)) {
// 		fs.readdirSync(directoryPath).forEach((file, index) => {
// 			const curPath = path.join(directoryPath, file);
// 			if (fs.lstatSync(curPath).isDirectory()) {
// 				// recurse
// 				deleteFolderRecursive(curPath);
// 			} else {
// 				// delete file
// 				fs.unlinkSync(curPath);
// 			}
// 		});
// 		fs.rmdirSync(directoryPath);
// 	}
// };

// module.exports = {
// 	uuidv4Short,
// 	isVietnamesePhoneNumberValid,
// 	createToken,
// 	uuidv4Payment,
// 	uuidv4Long,
// 	uuidv4Ref,
// 	getRandomString,
// 	curencyFormat,
// 	stringifyCookies,
// 	checkAccInfo,
// 	loginRiot,
// 	change_email_account,
// 	change_password_account,
// 	change_riot_id_account,
// 	get_rank_name,
// 	getPaymentPrice,
// 	randomString,
// 	deleteFolderRecursive
// };


