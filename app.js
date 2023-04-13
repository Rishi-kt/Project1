const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/contactUs');
const port = 80;
}

// define mongoose schema 
const contactSchema = new mongoose.Schema({
   name: String,
   Phone: String,
   Email: String,
   Address: String,
   Description: String
 });

 const Contact = mongoose.model('contact', contactSchema);

// express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }))

// pug specific stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// endpoints
app.get('/', (req, res)=>{
   const params = { }
   res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
   const params = { }
   res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
   var myData = new Contact(req.body);
   myData.save().then(()=>{
      res.send("This item has been saved to database")
   }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
   });

   // res.status(200).render('contact.pug');
})

// start the server 
app.listen(80, ()=>{
    console.log(`the application started succesfully on port ${80}`);
})