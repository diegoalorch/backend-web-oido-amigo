
const jw_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const secret = "oido_amigo-secret-access-token";
const refreshTokenSecret = "oido_amigo-refresh-secret-access-token";

const checkTokenPsicologo = (req, res, next)=>{
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const token = bearerToken;
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json({
                    success:0,
                    message:"Invalid token"
                });
            }else{
                    var decoded = jwt_decode(token);
                    if(decoded.usuario.idrol!='1'){
                    return res.status(400).json({
                        success: false,
                        message: 'Unauthorized Token'
                    });
                    }else{
                        next();
                        
                    }
            } 
            
        });
    }else{
        res.status(401).json({
            success:0,
            message: "Access denied unautorized user"
        });
    }
}

module.exports={
    checkTokenPsicologo
}