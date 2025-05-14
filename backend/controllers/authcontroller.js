import User from "../models/User.js";



export const register = async (req,res)=>{
    
    const {name,email,password} = req.body;
   try{
    const userExists = await User.findOne({email});
    
    if(userExists){
        return res.status(400).json({message : "User already exists!"});
    }
    const user = await User.create({name,email,password});

    res.status(201).json({ user, message: `User created: succesfully`});
   }catch(error){
    console.log(`${error.message} [Register User failed] [register] `);
    res.status(500).json({message: `${error.message} [Register User failed] [register] `});
   }
    // userSchema.name = user.name;
    // userSchema.email = user.email;
    // userSchema.role = user.role;
    // userSchema.password = user.password;
   
   
}

export const login = async (req,res)=>{
    res.send("Login route called");
}
export const logout = async (req,res)=>{
    res.send("Logout route called");
}

export const getUsers = async (req,res)=>{
    res.send("getUsers route called");
}