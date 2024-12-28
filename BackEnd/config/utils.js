import jwt from 'jsonwebtoken';

const generateToken = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn : "7d"
    });
    res.cookie("jwt",token,{
        httpOnly : true,
        maxAge : 7*24*60*60*1000,
        sameSite : "Strict",
        secure : process.env.NODE_ENV !== "development"   
    });
    return token;
};

export default generateToken;