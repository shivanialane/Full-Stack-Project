const request = require("request")
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./ServiceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

var express = require('express')
var app = express()  
app.set('view engine', 'ejs');
 
app.get('/', function (req, res) {  
var a= []
db.collection('learnsmart').get().then((docs)=>{
docs.forEach(doc => {
a.push({})
});
})
res.render("htm")
})

app.get('/signup', function (req, res) {  
res.render("signup")  
})
app.get('/ml', function (req, res) {  
res.render("ml")  
})
app.get('/ai', function (req, res) {  
res.render("ai")  
})
app.get('/iot', function (req, res) {  
res.render("iot")  
})
app.get('/cs', function (req, res) {  
res.render("cs")  
})
app.get('/ds', function (req, res) {  
res.render("ds")  
})
app.get('/fs', function (req, res) {  
res.render("fs")  
})
app.get('/cc', function (req, res) {  
res.render("cc")  
})
app.get('/robo', function (req, res) {  
res.render("robo")  
})

app.get('/login', function (req, res) {  
res.render("login")
})

app.get('/signupSubmit', function (req, res) {
console.log(req.query.name);
console.log(req.query.email);
console.log(req.query.username);
console.log(req.query.password);

db.collection('learnsmart')
.add({
name:req.query.name,
email:req.query.email,
username:req.query.username,
password:req.query.password
})
.then(() =>
{
res.render("htm")
});

});
app.get('/contactSubmit', function (req, res) {
console.log(req.query.name);
console.log(req.query.email);
console.log(req.query.number);
console.log(req.query.message);

db.collection('contact')
.add({
name:req.query.name,
email:req.query.email,
number:req.query.number,
message:req.query.message
})
.then(() =>
{
res.render("contact")
});

});
app.get('/loginSubmit', function (req, res) {
var user = req.query.username;
var pswd = req.query.password;
db.collection('learnsmart').where('username','==', user).where('password','==', pswd).get().then((docs)=>{
      if(docs.size>0){
            res.render("htm")
       }else{
        res.render("invalid")
       }
        });
 });

app.listen(4001);