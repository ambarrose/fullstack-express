// backEnd custom js
const express = require('express'); // called the express function
const app = express(); //calls  the express method
const bodyParser = require('body-parser'); //cross origin resourse sharing
const cors = require('cors'); //cross origin restriction
const bcrypt =require('bcryptjs');
const mongoose = require('mongoose');
const config = require('./config.json');
const product = require('./products.json');
const Product = require('./models/products.js');

const port = 3000;

app.use((req,res,next)=>{
  console.log(`${req.method} request ${req.url}`);
  next();
}); //use END

app.use(bodyParser.json()); //calling body parser method
app.use(bodyParser.urlencoded({extended:false})); //using default
app.use(cors()); //calling cors method

app.get('/',(req,res)=> res.send('This is  my message'))

//Connecting to mongoDB data
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/Sample?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log('db connected'))
.catch(err=>{
  console.log(`dbConnectionError:${err.message}`);
})

// CRUD METHOD using POSTMAN
//post method to CREATE a document in mongodb
app.post('/addProduct',(req,res)=>{
  const dbProduct = new Product({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.imageUrl
  });
  //save to database and notify the user
  dbProduct.save().then(result=>{
    res.send(result);
  }).catch(err=>res.send(err));
})

//RETREIVE objects from the database
app.get('/allProductFromDB',(req,res)=>{
  Product.find().then(result=>{
    res.send(result);
  })
})

//patch to UPDATE the details of the objects
app.patch('/updateProduct/:id',(req,res)=>{
  const idParam = req.params.id;
  Product.findById(idParam,(err,product)=>{
    if(product['user_id'] == req.body.userId){
      const updateProduct = {
        name: req.body.name,
        price: req.body.price,
        image_url: req.body.imageURL
      };
      Product.updateOne({_id:idParam}, updateProduct).then(result=>{
        res.send(result);
      }).catch(err=> res.send(err));
    } else{
      res.send('error: product not found')
    }
  })
})
//DELETE product form the data base
app.delete('/deleteProduct/:id',(req,res)=>{
  const idParam = req.params.id;
  Product. findOne({_id:idParam},(err,product)=>{
    if(product){
      Product.deleteOne({_id:idParam},err=>{
        res.send('deleted');
      });
    } else {
      res.send('not found');
    }//else
  }).catch(err=> res.send(err));
})//delete
//CRUD method end

// get method to access data from products.json
// routing to the endpoint
app.get('/allProducts', (req,res,)=>{
  res.json(product);
})
//shows product data
app.get('/products/p=:id',(req,res)=>{
  const idParam = req.params.id;
  for (let i =0; i<product.length; i++){ //let = es6 version of es5 var
  if (idParam.toString() === product[i].id.toString()){
    res.json(product[i]);
    }
  }
})

// Listening to 3000 port
app.listen(port,()=>console.log(`My fullstack app is listening on port ${port}`))
