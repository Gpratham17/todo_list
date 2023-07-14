const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname+"/date.js");
console.log(date());
let items = [];
let workItems=[];
//let ejs = require("ejs");
// tell the app to use ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", function(req, res) {
  let day = date();

  /*
  var day = "";
  // mon ->1 and sat->6
  if (today.getDay() === 0) {
    day = "Sunday";
  } else if (today.getDay() === 1) {
    day = "Monday";
  } else if (today.getDay() === 2) {
    day = "Tuesday";
  } else if (today.getDay() === 3) {
    day = "Wednesday";
  } else if (today.getDay() === 4) {
    day = "Thrusday";
  } else if (today.getDay() === 5) {
    day = "Friday";
  } else if (today.getDay() === 6) {
    day = "Saturday";
  }
  */
  // res.send("THis is EJS");

  res.render("list", {
    listTitle : day,
    newListItems : items
  });

  // if(today.getDay()===0 || today.getDay()===6){
  //   day = "Weekend";
  //   // res.write("<h1>Yay , it's the weekend</h1>");
  //
  // }
  // // it sees as a final sending method
  //
  // // to send multiple data
  // // use res.write()
  // else{
  //   day = "Weekday";
  //   // res.write("<h1>Yep, it's the working day</h1>");
  //   // res.write("<h2>Continue the work , it is not the holiday</h2>");
  //   // res.send();
  //   // res.sendFile(__dirname+"/index.html");
  //
  // }

});
app.get("/work",function(req,res){
  res.render("list",{
    listTitle:"Work List",
    newListItems:workItems
  });
});
app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
app.post("/",function(req,res){
  // console.log(req.body.newItem);
  item = req.body.newItem;
  if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
  items.push(item);
  res.redirect("/");
}
})
app.listen(3000, function() {
  console.log("server started on port no 3000");
});
