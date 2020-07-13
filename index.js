//npm init -y (for new json)
//npm i express
//npx gitignore node
//npm i -g nodemon
// "scripts": {
//"server": "nodemon index.js"
//npm run server 
const Joi = require('joi');
const express = require("express");
const server = express();
const shortid = require("shortid");
server.use(express.json());// teach express how to read  json
const users = [{
    id: "a_unique_id", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }]
server.get("/",(req,res)=>{
res.send('<h1>hello express</h1>')
});
server.get("/api/users",(req,res)=>{
 res.json(users)
});
server.post("/api/users",(req,res)=>{
    // const schema = {
    //     name:Joi.string().required(),
    //     bio:Joi.string().required()
    // }
    // const result = Joi.validate(req.body,schema);
    // if(result.error){
    //     res.status(400).send(result.error);
    //     return;
    // }
    const newuser = {
        id:shortid.generate(),
        name:req.body.name,
        bio:req.body.bio
    };
    users.push(newuser);
    res.json(newuser);
})

server.get("/api/users/:id",(req,res)=>{
    const eachuser = users.find(c=>c.id===(req.params.id));
    res.send(eachuser)
})

server.delete("/api/users/:id",(req,res)=>{
    let eachuser = users.find(c=>c.id===(req.params.id));
    // if (!each) return res.status(404).send('the ID not Found');
    const index = users.indexOf(eachuser);
    users.splice(index,1);
    res.send(eachuser);
})

server.put("/api/users/:id",(req,res)=>{
    const index = users.findIndex(e=>e.id=== req.params.id);
    if(index!==-1){
     users[index]
    }else{
        res.status(404).json('not find Id')
    }
    users[index]=req.body;
    res.json(users[index])
})

const PORT = 8000;
server.listen(PORT,()=>{console.log(`i am now listening on ${PORT} `)})