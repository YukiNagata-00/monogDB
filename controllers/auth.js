const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const validation = require('../handlers/validatioin');
const tokenHandler = require('../handlers/tokenHandler');
const  fetchInstance  = require('./fetchInstance.js');
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
        });
    }),
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
                return res.status(401).json({
                    errors:{
                        param: 'email',
                        message: 'emailが無効です'
                    }
                })
            }

            const password = CryptoJS.SHA256(req.body.password).toString();
            if (user.password !== password) {
                return res.status(401).json({ errors: [{ msg: 'メールアドレスが正しくありません。' }] });
            }
            //jwtの発行
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY,  { expiresIn: '24h' });
            console.log('login success');
            return res.status(201).json({user, token});
        
        }catch(err){
            return res.status(500).json({
                errors:{
                    param: 'database',
                    message: 'データベースエラーが発生しました'
                }
            });
        }
    }
]

//JWT認証API
const verifyToken =[tokenHandler.verifyToken, (req, res)=>{
    return res.status(201).json({user: req.user});
}]
//add 1 loginCount
const updateLoginCount = async (req, res) =>{
    try{
        const userId = req.body.userId;
        const user = await User.findById(userId);
        console.log(user);
        user.loginCount +=1;
        await user.save();
        res.status(200);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
//DBの「learningCount」に+10
const updateLearningCount = async (req, res) =>{
    try{
        const userId = req.body.userId;
        const user = await User.findById(userId);
        console.log(user);
        user.learningCount += 10;
        await user.save();
        res.status(200);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//ユーザー情報編集
const updateUserInfo = [
    //バリデーション
    body('username').isLength({min: 1, max: 25 }).withMessage('ユーザー名は１~25文字にしてください'),
    body('email').isEmail().withMessage('正しいメールアドレスを入力してください'),
    body('email2')
    .optional()
    .custom((value, { req }) => {
        if (value && !validator.isEmail(value)) {
        throw new Error('正しいメールアドレスを入力してください');
        }
        return true;
    }).withMessage('正しいメールアドレスを入力してください'),
    (req, res, next) => {
        if (req.body.newPassword) {
            body('newPassword').isLength({min: 5, max: 20 }).withMessage('パスワードは5~20文字にしてください')(req, res, next);
        } else {
            next();
        }
    },
    body('email').custom(async (value, { req }) => {
        try {
            const user = await User.findById(req.body.userId);
            if (user.email === value) {
                return true;
            }
            const userWithEmail = await User.findOne({ email: value });
            if (userWithEmail && userWithEmail._id.toString() !== req.body.userId) {
                throw new Error('このメールアドレスはすでに使われています');
            }
            return true;
        } catch (err) {
            console.log(err)
            throw new Error('Server Errore', err);
        }
    }).withMessage('このメールアドレスはすでに使われています'),
    validation.validate,
    async (req, res) => {
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
    try {
        //現在のパスワードがあっているかチェック
            const user = await User.findById(req.body.userId);
            const currentPasswordHash = CryptoJS.SHA256(currentPassword).toString();
        if (currentPasswordHash !== user.password) {
            return res.status(401).json({ message: '現在のパスワードがまちがっています' });
        }
        // 新しいパスワードをハッシュ化
        const newPasswordHash = CryptoJS.SHA256(newPassword).toString();
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email, 
                email2: req.body.email2,
                password: newPasswordHash,
            },
        });
        // JWT token
        const token = jwt.sign({ id: updatedUser._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' });
        return res.status(200).json({ user: updatedUser, token });
    } catch (err) {
        return res.status(500).json(err);
    }
    },
];



module.exports = {userRegister,
    userLogin, 
    verifyToken,
    updateLoginCount,
    updateLearningCount,
    updateUserInfo
};