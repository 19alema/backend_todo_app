const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }))

const mongoose = require("mongoose")
const mongodb = `mongodb+srv://alemaedrick:alema2000@cluster0.prtnmrf.mongodb.net/item-database?retryWrites=true&w=majority`;

const itemModel = require("./modals/items");
mongoose.connect(mongodb).then(() => {
    console.log("Connected successfully")
    app.listen(3000)
}).catch((error) => {
    console.log(error)
})

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.redirect("/get-items" )
})

app.get("/get-items", (req, res) => {
    itemModel.find().then(result => {
        res.render("index", {items:result})
    }).catch(error => {console.log(error)})
})

app.get("/add-item", (req, res) => {
    res.render("add-item")
})
app.post("/items", (req, res) => {
    const item = itemModel(req.body)
    item.save().then(() => {
        res.redirect("/get-items")
    })
})
app.get("/items/:id", (req, res) => {
    const id = req.params.id;
    itemModel.findById(id).then(result => {
        res.render("item-detail", {item:result})
    })
})
app.delete("/items/:id", (req, res) => {
    const id = req.params.id;
    itemModel.findByIdAndDelete(id).then(result => {
        
    })
})
app.use((req, res) => {
    res.render("404")
})