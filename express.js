var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/'));

// app.get("/css/*",function(req,res){
  // res.sendfile('app'+req.path);
// });
// app.get("/js/*",function(req,res){
  // res.sendfile('app'+req.path);
// });
// app.get("/img/*",function(req,res){
  // res.sendfile('app'+req.path);
// });
// app.get("/pages/*",function(req,res){
  // res.sendfile('app'+req.path);
// });
// app.get('*',function(req,res){
  // res.sendfile('index.html');
// });


app.listen(3000);
console.log('Listening on port 3000');