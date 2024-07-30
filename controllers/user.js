const express = require("express")

const User = require("../models/user")

async function handleGetAllUserById(req, res){
    const allDbUser = await User.find({})
    res.header("myname", "chethan");
    console.log(req.headers);
    return res.json(allDbUser);
};


async function handleGetUserById(req, res){
// const id = Number(req.params.id);
        // if (!id) {
        //     return res.status(400).json({ status: "no user present" });
        // }
        // const user = users.find(user => user.id === id);

        allDbUser = await User.findById(req.params.id)
        return res.json(allDbUser || { error: "User not found" });
}


async function handleUpdateGetUserById(req , res){
    const allDbUser = await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})
    return res.json({ status: "Success" });
}



async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id)
            return res.json({ status: "pending" });
        };



async function handleCreateUser(req, res){
    let body = req.body;
    if (!body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // const newUser = { ...body, id: users.length + 1 };
    // users.push(newUser);

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    //     if (err) {
    //         console.error("Failed to update user data:", err);
    //         return res.status(500).json({ error: "Internal Server Error" });
    //     }
    //     console.log("New user added:", newUser);
    //     return res.status(201).json({ status: "Success", user: newUser });
    // });
try {
const result = await User.create({
    firstName : body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,

});
console.log("result", result);
return res.status(201).json({status : "suscesss"})
} catch (err){
    console.error("Error Creating user",err);
    return res.status(401).json({ error: "ffaild to create user"})
}
};



module.exports= {
    handleGetAllUserById,
    handleGetUserById,
    handleUpdateGetUserById,
    handleDeleteUserById,
    handleCreateUser,
}
