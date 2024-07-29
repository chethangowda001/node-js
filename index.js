const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: false}))

app.use((req, res, next)=>{
    console.log("hello from middleware1");
fs.appendFile("log.txt", `\n${Date.now()}:, ${req.ip}, ${req.method}:, ${req.path}:`, (err, data)=>{
    next();
})
    



    
})


app.use((req, res, next)=>{
    console.log("hello from middleware2");
   
    next();
})



//routes
app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `
                <li>
                    ${user.first_name}
                </li>
            `).join('')}
        </ul>`;
    res.send(html);
});

// rest API
app.get("/api/users",  (req, res)=>{
    res.header("myname","chethan");
    console.log( req.headers);
    return res.json(users)
})

app.route("/api/users/:id").get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find(ids=> ids.id===id);
    return res.json(user);
})
.patch((req, res)=>{
    return res.json({status: "pending"})
})
.delete((req, res)=>{
    return res.json({status: "pending"})
})



app.post("/api/users",   (req, res)=>{
    let body = req.body;
    if(!body || !body.first_name ||!body.last_name || !body.email  || !body.gender || !body.job_title){
       return res.status(400).json
       ("all the feilds are required")
    }
    const newuser = {...body,  id:users.length + 1};
    users.push(newuser)
    console.log("body", body);
    return res.status(201).json({status:"Success" , user: newuser})
})

app.listen(port, ()=> console.log(`"server started the port no is ${port}`));