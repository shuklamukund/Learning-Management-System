import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';
import {nanoid} from 'nanoid';



const isLoggedIn=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new AppError('unauthenticated,please login again'),401)
    }
          // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  console.log('req.user>before>>',req.user);
  req.user = decoded;
console.log('req.user>after',req.user);

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
};

//sessionId
const userSession=async(req,res,next)=>{
  const {token}=req.cookies;

  if(!token){
    return next();
  } 

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const sessionId=nanoid();
  if(!decoded.sessionId || decoded.sessionId==sessionId){
    next();
   
  }else{
    req.user.sessions=[];
    return next(new AppError('Session Logged out'),401);

  }


}
    





// Middleware to check if user is admin or not
const authorizeRoles = (...role) =>
  async (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
}

const authorizeSubscribers =async(req,res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  const user=await User.findById(req.user.id);
  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
}
export {
  isLoggedIn,
  userSession,
  authorizeRoles,
  authorizeSubscribers
};