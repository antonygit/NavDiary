const express=require('express');
const routes=require('./routes/api.js');
var parser=require('body-parser');
var mongoose=require('mongoose');

const app=express();

mongoose.connect('mongodb://localhost/templates');
var db=mongoose.connection;
mongoose.Promise=global.Promise;
console.log("Mongoose connection "+mongoose.connection.readyState);


app.use(parser.urlencoded({ extended: true}));
app.use(parser.json());

app.use(express.static('view'));
app.use("/profile",routes);

app.listen("8040",function(){
  console.log("Running...");
});
