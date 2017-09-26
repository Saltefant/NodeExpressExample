//Tutorial part 1: https://zellwk.com/blog/crud-express-mongodb/
//Tutorial part 2: https://zellwk.com/blog/crud-express-and-mongodb-2/

const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://AdminUser:password@ds149954.mlab.com:49954/myfirstmongodb', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
})

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
  })

app.get('/Hej', (req, res) => {
    res.send('Hej med dig')
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
})

