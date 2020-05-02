//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolostDB" ,{ useNewUrlParser: true });

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item" , itemSchema);



app.get("/", function(req, res) {

const day = date.getDate();

Item.find(function(err , items){
  if(err){
    console.log(err)
  } else {
      res.render("list", {listTitle: day, newListItems: items});
    }

});
});

app.post("/dd/:customListName", function(req, res){

const customListName =  req.params.customListName;

});

app.post("/delete", function(req, res){

  const checkdeItemId = req.body.checkbox;

  console.log(checkdeItemId);

Item.findByIdAndRemove(checkdeItemId , function(err){
  if(err){
    console.log(err);
  }
});


  res.redirect("/");

});

app.get("/", function(req, res) {

const day = date.getDate();

Item.find(function(err , items){
  if(err){
    console.log(err)
  } else {
      res.render("list", {listTitle: day, newListItems: items});
    }

});
});

app.post("/", function(req, res){

  const newItem = req.body.newItem;

  const item = new Item({
    name: newItem
  });

  item.save();

  res.redirect("/");

});

app.post("/delete", function(req, res){

  const checkdeItemId = req.body.checkbox;

  console.log(checkdeItemId);

Item.findByIdAndRemove(checkdeItemId , function(err){
  if(err){
    console.log(err);
  }
});


  res.redirect("/");

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
