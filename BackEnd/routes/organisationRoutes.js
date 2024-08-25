const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const Organisation = require("../models/Organisation")
const { v4: uuidv4 } = require("uuid");


router.get("/", auth, async (req, res) => {
    try {
        const organisation = await Organisation.find()
        return res.status(200).json({status: "succes", message: "Succesfully gotten organisations", data: {organisation} })
    } catch (err) {
        console.log(err);
        res
        .status(500)
        .json({
            status: "server error",
            message: "server error",
            statusCode: 500,
        });
    }
});

router.get("/:orgId", auth , async (req,res) => {
    try{
        const organisation = await Organisation.findById(req.params.orgId)
        if(!organisation){
        return res.status(404).json({
            status: "Organisation not found",
            message: "Can Not find User",
            errorCode: 404,
        })
        }
        return res.status(200).json({status: "succes", message: "Succesfully gotten organisations", data: {organisation} })  
    }catch(err){
        console.log(err);
        res
        .status(500)
        .json({
            status: "server error",
            message: "server error",
            statusCode: 500,
        });
    }
})

router.post("/", auth, async (req,res) => {
    try{
        const {name, description} = req.body
        if(!name){
            return res.status(404).json({
                status: "Please enter name",
                message: "Name not found",
                errorCode: 404,
        })}

        const org = new Organisation({
            orgId: uuidv4(),
            name: name,
            description: description
        })

        await org.save()
        return res.status(200).json({status: "succes", message: "Succesfully created organisation", data: {org} })
    }catch(err){
        console.log(err);
        res
        .status(500)
        .json({
            status: "server error",
            message: "server error",
            statusCode: 500,
        });
    }
})



module.exports = router;
