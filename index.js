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
res.send('<h1>hello express from Romeo</h1>')
});
server.get("/api/users",(req,res)=>{
 
 if(!req.body){
     res.status(500).json({error:'The users information could not be retrieved'})
 }
 res.json(users);
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
    if (!newuser.name || !newuser.bio){
        res.status(400).json({error:'need name and bio info'})
    }
    if (newuser){
        users.push(newuser);
        res.status(201).json(newuser);
    }else{
        res.status(500).json({error:"There was an error to the database"})
    }
    
})

server.get("/api/users/:id",(req,res)=>{
    const eachuser = users.find(e=>e.id===(req.params.id));
    if(!eachuser){
        res.status(404).json({message:"The user with the specified ID does not exist."})
    }
    if(!req.body){
        res.status(500).json({error:"The user information could not be retrieved."})
    }
    res.send(eachuser)
})

server.delete("/api/users/:id",(req,res)=>{
    let eachuser = users.find(e=>e.id===(req.params.id));
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
//not working ?
// server.use(function(req,res,next){
//     console.log('middleware is building now');
//     next();
// })

const PORT = 8000;
server.listen(PORT,()=>{console.log(`i am now listening on ${PORT} `)})