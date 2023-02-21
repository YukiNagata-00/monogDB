const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
//ユーザー登録API
const userRegister =  [
    //バリデーション
    body('username').isLength({min: 1, max: 25 }).withMessage('ユーザー名は１~25文字にしてください'),
    body('email').isEmail().withMessage('正しいメールアドレスを入力してください'),
    body('password').isLength({min: 5, max: 20 }).withMessage('パスワードは5~20文字にしてください'),
    body('passwordConfirmation').isLength({min: 5, max: 20 }).withMessage('確認用パスワードは5~20文字にしてください'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }else{
            return true;
        }
    }),
    body('email').custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (err) {
                    reject(new Error("Server Error"));
                }
                if (Boolean(user)) {
                    reject(new Error("E-mail already in use"));
                }
                resolve(true);
            });
        }
    )}),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    async(req, res) =>{
    const password = req.body.password;
    try{

        //パスワードハッシュ化
        req.body.password = CryptoJS.SHA256(password);
        console.log("wwww1");
        //ユーザーの新規作成
        const user = await User.create(req.body);
        console.log(user);
        console.log("wwww2")
        //jwt
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY,  { expiresIn: '24h' });
        console.log("wwww3")
        return res.status(200).json({user, token});
    }catch(err){
        return res.status(500).json(err);
    }

},]


module.exports = {userRegister};