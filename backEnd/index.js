// backEnd custom js
const express =require('express'); // called the express function
const app =express(); //calls  the express method
const bodyParser =require('body-parser'); //cross origin resourse sharing
const cors =require('cors'); //cross origin restriction
const bcrypt =require('bcryptjs');
const mongoose =require('mongoose');
const config =require('./config.json');

const product = require('./products.json');

const port = 3000;

app.use((req,res,next)=>{
  console.log(`${req.method} request ${req.url}`);
  next();
}); //use END

app.use(bodyParser.json()); //calling body parser method
app.use(bodyParser.urlencoded({extended:false})); //using default
app.use(cors()); //calling cors method

app.get('/',(req,res)=> res.send('This is  my message'))

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
//Connecting to mongoDB data
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/School?retryWrites=true&w=majority`,  {useNewUrlParser: true})
.then(()=>console.log('db connected'))
.catch(err=>{
  console.log(`dbConnectionError:${err.message}`);
})
