const express = require('express');
const path = require('path');
const app = express();
const User = require("./models/users");
const port = 3000;
const hbs = require('hbs');


require("./db/conn");
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);



app.get("/", (req, res) => {
   res.render("index")
});
app.get("/Users/rakshith/Documents/mernbackend/templates/views/register.hbs", (req, res) => {
   res.render("register")

});
app.get("/Users/rakshith/Documents/mernbackend/templates/views/login.hbs", (req, res) => {
    res.render("login")
}); 
app.get("/Users/rakshith/Documents/mernbackend/templates/views/broker.hbs",(req,res)=>  {
    res.render("broker")
}); 
app.get("/Users/rakshith/Documents/mernbackend/templates/views/education.hbs",(req,res)=>  {
    res.render("education")
});  
app.get("/Users/rakshith/Documents/mernbackend/templates/views/stocks.hbs",(req,res)=>  {
    res.render("stocks")
}); 
app.get("/Users/rakshith/Documents/mernbackend/templates/views/about.hbs",(req,res)=>  {
    res.render("about")
}); 
app.get("/Users/rakshith/Documents/mernbackend/templates/views/market.hbs",(req,res)=>  {
    res.render("market")
}); 



app.post("/users",async (req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const userForDb = new User ({
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })
           const registered= await userForDb.save();
            res.status(201).render("index");
            
            
        }else{
            res.send("INVALID REGISTERATION");
          
        }
    }catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

app.post("/login",async (req,res) =>{
    try{
           const email = req.body.email;
           const password = req.body.password;
           const userEmail= await User.findOne({email:email});
           
        
           
           if(userEmail.password==password){
                  
                 res.status(200).render("index");
                 
           }
           else{ 
                
                res.render("login");
                
            
               
           }
    }catch (error){
        res.status(401).send("Invalid Login details") 
    }
});

app.listen(port, () => {
    console.log('server is running at prt no 3000');
});