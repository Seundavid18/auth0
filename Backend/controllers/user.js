const User = require('../model/signupSchema')
const validateUser = require('../validation/userValidation')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()

//SIGN UP 
const signup = async (req, res, next) => {
    const {fullName, username, email} = req.body
    try{

        const {error} = validateUser(req.body)
        if(error) return res.status(200).json({success: false, message: error.details[0].message})

        const userName = await User.findOne({username : username});
        if(userName){
            return res.status(200).json({
                success : false,
                message : "Username is already taken"
            });
        }

        const user = await User.findOne({email : email});
        if(user){
            return res.status(200).json({
                success : false,
                message : "Email already exist"
            });
        }

        

        // Salt Password
        let saltPassword = await bcrypt.genSalt(12)
        // Hash Password
        let securePassword = await bcrypt.hash(req.body.password, saltPassword)
        password = securePassword

        const newUser = await User.create({fullName, username, email, password})
        const saveUser = await newUser.save()
        
        res.status(201).json({
            success: true,
            message: 'successful',
            data: saveUser,
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message:'User not saved'
        })
    }
}

// GET ALL USERS FROM DATABASE
const getAllUser = async (req, res, next) => {
    const users = await User.find({})
    res.status(200).json({
        success: true,
        msg: "successfully retrieved all users from the database",
        data: users
    })
}

// READ ONE USER RECORD FROM THE DATABASE
const getOneUser = async (req, res, next) => {
    const id = req.params.id
    const oneUser = await User.findOne({_id: id})
    res.status(200).json({
        success: true,
        msg: 'successfully retrieved a user record from the database',
        data: oneUser
    })
}

// REMOVE A RECORD FROM THE DATABASE
const deleteUser = async (req, res, next) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        msg: 'successfully deleted a user record from the database',
    })
}


// LOGIN
const login = async (req, res, next) => {
    try{

    const {email, password} = req.body

    // CHECK IF LOGIN FORM IS EMPTY
    if(!email || !password){
        return res.status(200).json({
            success : false,
            message : `Enter your login details`
        })
    }

    // CHECK IF USER EXISTS IN DATABASE
    let users = await User.findOne({email})
    if(!users){
        return res.status(200).json({
            success : false,
            message : `Email Address Not found`
        })
    } 

    // CHECK AND COMPARE PASSWORD
    let isValidPassword = await bcrypt.compare(req.body.password, users.password)
    if (!isValidPassword){
        return res.status(200).json({
            success: false,
            message: 'Incorrect password'
        })
    }


        const token = jwt.sign({id : users._id, name: users.fullName, username: users.username, email: users.email, password: users.password}, process.env.JWT_SECRET, {expiresIn: "1d"});
        const refreshtoken = jwt.sign({id : users._id, name: users.fullName, username: users.username, email: users.email, password: users.password}, process.env.REFRESH_TOKEN, {expiresIn:"1d"});
        users.refrsehtoken = refreshtoken
        await users.save()
        res.status(200).json({
            success : true,
            message : "Successful Login",
            data : users,
            token : token,
            refreshtoken : refreshtoken
        })

    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
}

const protected = (req, res, next) => {
    const {name} = req.user
    const {email} = req.user
    res.status(200).json({
        success : true,
        message : 'This is protected resource for only signed in users',
        greeting : `Welcome to Auh0 Web app ${name}, your email address is ${email}`
        
    })
    res.send()
}



module.exports = {
    signup,
    getAllUser,
    getOneUser,
    deleteUser,
    login,
    protected
}