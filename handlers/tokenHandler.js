const JWT = require("jsonwebtoken");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        try {
            const decodedToken = await JWT.verify(bearerToken, process.env.TOKEN_SECRET_KEY);
            const user = await User.findById(decodedToken.id);
            if (!user) {
                res.status(401).json({
                    errors:{
                        param: 'authentication',
                        message: 'ユーザーが存在しません'
                    }
                });
            }
            req.user = user;
            next();
        } catch (err) {
            res.status(401).json({
                errors:{
                    param: 'authentication',
                    message: '認証エラーが発生しました'
                }
            });
        }
    } else {
        res.status(401).json({
            errors:{
                param: 'authentication',
                message: 'トークンがありません'
            }
        });
    }
};



