require("dotenv").config();
const express = require("express");
var cors = require("cors")

//mongoose connection
const connectDB = require("./connect");

const userModel = require("./user");

const App = express();
App.use(cors())

// configuration
App.use(express.json());

// route: /
// description: To get all user
// parameter: none
App.get("/", async (req, res) => {
    try{
        const user = await userModel.find();
        return res.json({user});
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
});

// route: /user/type/:type
// description: To get all user based on type
// parameter: type
App.get("/user/type/:type", async (req, res) => {
    try{
        const { type } = req.params;

    const user = await userModel.find({ userType: type });
    
    if(!user){
        return res.json({message: "No User Found"})
    }

    return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
    
})

// route: /user/:_id
// description: To get user based on id
// parameter: _id
App.get("/user/:_id", async (req, res) => {
    try{
        const { _id } = req.params;
    const user = await userModel.findById(_id);
    if(!user){
        return res.json({message:"No user found"});
    }

    return res.json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
    
})

// route: /user/new
// description: To get all user
// parameter: none
// request body: user object
App.post("/user/new", async (req, res) => {
    try{
        const { newUser } = req.body;

    await userModel.create(newUser);
    return res.json({message: "User Created"})
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
    
})

// route: /user/update/list
// description: To get new user
// parameter: _id
// request body: user object
App.put("/user/update/:_id", async (req, res) => {
    try{
        const { _id } = req.params;
    const { userData } = req.body;

    const updateUser = await userModel.findByIdAndUpdate(_id, { $set: userData}, { new: true }
    );

    return res.json({users: updateUser})
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
    
})

// route: /user/delete/:userType
// description: To get new user
// parameter: _id
// request body: none
App.delete("/user/delete/:userType", async (req, res) => {
    try{
        const { userType } = req.params;

        await userModel.findOneAndDelete( { userType } );
    
        return res.json({ message: "user Deleted!"})
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }

})

App.listen(process.env.PORT, () => {
   connectDB()
   .then((data)=>{
       console.log("server is running")
   })
   .catch((error) => {
       console.log(error);
   })
})


