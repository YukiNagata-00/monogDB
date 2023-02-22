const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const validation = require('../handlers/validatioin');
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
    validation.validate,
    async(req, res) =>{
    const password = req.body.password;
    try{

        //パスワードハッシュ化
        req.body.password = CryptoJS.SHA256(password);
        //ユーザーの新規作成
        const user = await User.create(req.body);
        //jwt
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY,  { expiresIn: '24h' });

        return res.status(200).json({user, token});
    }catch(err){
        return res.status(500).json(err);
    }

},]

//ログインAPI
const userLogin = [
    body('email').isEmail().withMessage('正しいメールアドレスを入力してください'),
    body('password').isLength({min: 5, max: 20 }).withMessage('正しいパスワードを入力してください'),
    validation.validate,

    async(req, res)=>{
        const {email, password} = req.body;
        try{
            //DBからemailが一致するものを探す
            const user = await User.findOne({email: email});
            if(!user){
                res.status(401).json({
                    errors:{
                        param: 'email',
                        message: 'emailが無効です'
                    }
                })
            }
            //passwordチェック
            const hashedPassword = password.toString(CryptoJS.enc.Hex);
            if(password !== hashedPassword){
                res.status(401).json({
                    errors:{
                        param: 'password',
                        message: 'passwordが一致しません'
                    }
                })
            }
            //jwtの発行
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY,  { expiresIn: '24h' });
            console.log('login success');
            return res.status(201).json({user, token});
        
        }catch(err){
            return res.status(500).json(err);
        }
    }
]

module.exports = {userRegister, userLogin};