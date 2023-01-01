require('dotenv').config()
const express=require('express');
const bodyParser = require('body-parser');
const app=express()




app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/question',require('./routes/Question-Route'))
app.use('/quiz',require('./routes/Quiz-Route'))

const mongoose=require('mongoose');
const port=process.env.PORT;
mongoose.connect(process.env.db)
.then((result)=>{
  app.listen(port,()=>{
    console.log('connect db')
    console.log( `the sever run in ${port}`);
  })
})
.catch((err)=>{
  console.log(err);
});


