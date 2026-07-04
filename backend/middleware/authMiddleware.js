const jwt = require("jsonwebtoken");


const protect = (req,res,next)=>{


    let token;


    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){


        try{


            token =
            req.headers.authorization.split(" ")[1];


            const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


            req.user = decoded;


            next();


        }

        catch(error){


            res.status(401).json({

                success:false,

                message:"Token verification failed"

            });


        }

    }


    if(!token){


        res.status(401).json({

            success:false,

            message:"Access denied. No token"

        });


    }


};


module.exports = protect;