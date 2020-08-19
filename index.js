const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/Product');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then((res) => {
  app.listen(port);
  console.log(`Server on port ${port}`);
  console.log('Connected to DB');
})
  .catch(err => console.log(err));


// View engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  Product.find()
    .then(result => {
      res.render('index', {name: 'Christian', title: 'Home', products: result});
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/', (req, res) => {
  const product = new Product(req.body);

  product.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;

  Product.findByIdAndUpdate(id, {$set: {done: true}})
    .then(result => {
      res.json({redirect: '/'});
    })
    .catch(err => {
      console.log(err);
    })
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/'});
    })
    .catch(err => {
      console.log(err);
    })
});