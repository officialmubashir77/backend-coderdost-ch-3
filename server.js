const products = require('./products.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// express json body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan third party middleware
const morgan = require('morgan');
app.use(morgan('default'));

// static files serve in express
app.use(express.static('public'));

// app.use((req, res, next) => {
//   // console.log("middleware");
//   console.log(req.method , req.ip);
//   next();
// })

//auth simple middlware
const auth = (req, res, next) => {
  // console.log(req.query);
  // if (req.query.password == 123) {
  //   next();
  // } else {
  //   res.status(401).json({ message: 'Unauthorized' });
  // }


  // console.log(req.query);
  if (req.body.password == 123) {
    //send res.send
    res.status(200).json({ message: 'Authenticated' });
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


// home route res.send 
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });


// dynamic product route 
app.get('/products/:id', (req, res) => {
  console.log(req.params);
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


// API and Endpoint 
// type get 
app.get('/', auth, (req, res) => {
  res.json({ type: "GET" });
});

// type POst
app.post('/', auth, (req, res) => {
  res.json({ type: "POST" });
});

// type PUT
app.put('/', (req, res) => {
  res.json({ type: "PUT" });
});

// type DELETE
app.delete('/', (req, res) => {
  res.json({ type: "DELETE" });
});

// type Patch
app.patch('/', (req, res) => {
  res.json({ type: "PATCH" });
});


// products route 
app.get('/products', (req, res) => {
  res.json(products).res.status(200);
});


// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
