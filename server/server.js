let express=require('express');
let mongoose=require('mongoose');
let bcrypt=require('bcrypt');
let cors=require('cors')
let regusermodel=require('./models/registermodel.js');
let jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

let app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

mongoose.connect('mongodb://localhost:27017/auth')
.then(()=>{
    console.log("Database connected!");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on the port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err);
})

//requests:-
app.post('/register',async (req,res)=>{
    let {name,email,password}=req.body;
    let hashedpassword=await bcrypt.hash(password,10);
    try{
        let user=await regusermodel.create({name,email,password:hashedpassword})
        res.status(200).json({value:true});
    }
    catch(err){
        res.status(500).json({message:"User not saved in the Database"})
    }
})

app.post('/login',async (req,res)=>{
    let {email,password}=req.body;
    console.log(req.body);
    
    try{
        let user=await regusermodel.findOne({email});
        if(!user)
        {
            res.status(404).json({message:"User doesn't Exists!"})
        }
        else{
            let ismatch=await bcrypt.compare(password,user.password);        
            if(!ismatch)
            {
                res.status(404).json({message:"Check the password!"})     
            }
            else{
                let token=jwt.sign({email},process.env.Secret_key,{expiresIn:'30s'})
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    maxAge: 120000
                });
                console.log(token);
                res.status(200).json({valid:true,message:"Token is provided successfully!"});
            }
        }
    }
    catch(err)
    {
        res.status(404).json({message:"Email doesn't exists!"})
    }
})
let verifyuser = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    let yestoken = req.cookies.token;
    if (!yestoken) {
        return res.status(401).json({ message: "There is no token!", valid: false });
    }
    jwt.verify(yestoken, process.env.Secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token verification failed!", valid: false });
        } else {
            req.user = decoded.email;
            next();
        }
    });
};

app.get('/dashboard', verifyuser, (req, res) => {
    return res.status(200).json({ valid: true, message: "authorized" });
});
