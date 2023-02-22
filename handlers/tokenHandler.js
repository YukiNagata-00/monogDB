const JWT = require("jsonwebtoken");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const User = require('../models/User');

const tokenDecode = (req) =>{
    const bearHeader = req.headers['authorization'];
    if(bearHeader){
        const bearer = bearHeader.split(" ")[1];
        try{
            //渡されたJSTをデコード
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        }catch(err){
            return false;
        }
    }else{
        return false;
    }
}

//jwt検証
exports.verifyToken =  async(req, res, next) =>{
    const tokenDecoded = tokenDecode(req);

    if(tokenDecoded){
        //jwtと一致するユーザーを代入
        const user = await User.findById(tokenDecoded.id);
        if(!user){
            return res.status(401).json('権限がありません');
        }

        req.user = user;
        next();
    }else{
        return res.status(401).json('権限がありません');
    }

}