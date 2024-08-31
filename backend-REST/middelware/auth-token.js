const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const token = req.get('Authorization').split(' ')[1];
    let decodeToken
    try{
    decodeToken = jwt.verify(token,'secretKey');
    }catch(e){
        console.log(e)
    }
    req.userId = decodeToken.userId
    next()
}