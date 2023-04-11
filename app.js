var bodyparser = require('body-parser')
var express = require('express')
var sql = require('mysql')
var app = express()
app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

var con = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"rak1"
})

con.connect(function(err){
    if (err) throw err;
    console.log("connected");
})

app.listen(7000);
console.log("listening");

app.use(express.static(__dirname+'/'))

app.get("/",function(req,res){
    con.query("select * from stud",function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})

app.post("/insert",function(req,res){
    sname = req.body.name;
    sub = req.body.sub;
    console.log(sname);
    con.query("insert into stud(name,sub) values("+sql.escape(sname)+","+sql.escape(sub)+")",function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})

app.put("/update/:id",function(req,res){
    id = req.params.id;
    sname = req.body.name;
    sub = req.body.sub;
    con.query("update stud set name="+sql.escape(sname)+",sub="+sql.escape(sub),function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }

    })
})

app.delete("/delete/:id",function(req,res){
    id = req.params.id;
    con.query("delete from stud where id="+sql.escape(id),function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})
//npm init
//npm i express
//npm i -g nodemon
//node filename