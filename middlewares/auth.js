const  jwt  = require("jsonwebtoken");
const auth=(req,res,next)=>{
   try {
      console.log(req.headers.authorization.length)
    const token=req.headers.authorization.split(" ")[1];//getting token from frontend
    const isCustomAuth=token.length<500;//cheking if token is generated by custom jwt auth or GOOGLE auth

    let decodedData;

    if(token&&isCustomAuth){//for custom-token
      decodedData=jwt.verify(token,'5rWxwIu3suMAoqH0kWMSriq92d76zKbGW84Djo0_vdE');
      req.userId=decodedData?.id;
      console.log(req.userId)
    }
    else{//for google-token
       decodedData=jwt.decode(token);
       req.userId=decodedData?.sub;//sub is the unique id per user
    }
      next();//we put auth in routes...next() method will be called after
      // above middleware auth logic successfully fullfilled
      //for ex-->when user want to like post he/she has to get through the auth middleware logic.
      
   } catch (error) {
    console.log(error)
   }
}
module.exports=auth