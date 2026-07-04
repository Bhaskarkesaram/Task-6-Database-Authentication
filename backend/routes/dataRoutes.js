const express = require("express");

const router = express.Router();

const Data = require("../models/Data");

const protect =
require("../middleware/authMiddleware");


// =================================
// CREATE DATA (Protected)
// =================================

router.post("/", protect, async(req,res)=>{

    try{

        const data = await Data.create({

            title:req.body.title,

            description:req.body.description,

            createdBy:req.user.id

        });


        res.status(201).json({

            success:true,

            message:"Data Created Successfully",

            data:data

        });


    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

});



// =================================
// GET USER DATA (Protected)
// =================================

router.get("/", protect, async(req,res)=>{

    try{


        const data = await Data.find({

            createdBy:req.user.id

        });


        res.json({

            success:true,

            data:data

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});



// =================================
// SECURE DASHBOARD
// =================================


router.get("/dashboard",protect,(req,res)=>{


    res.json({

        success:true,

        message:"Welcome to Secure Dashboard 🔐",

        user:req.user

    });


});



module.exports = router;