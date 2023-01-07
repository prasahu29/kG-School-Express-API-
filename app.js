const express= require('express')
 
const app=express();
const cors=require('cors')
app.use(cors());
const cloudinary=require("cloudinary")
app.use(express.json());
// const port =  3000   yeh localhost liye



 
const {Router}=require('express')

const dotenv= require('dotenv')
dotenv.config({path:".env"})


const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload");
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload({useTempFiles: true}));
const web =require('./routes/web.js');
const connectDB = require('./DB/connectDB.js');

app.use(express.static('public'))


 
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// load route
app.use('/api/pn',web)

app.get('/', (req, res) => {
    res.send('Hello kg school gwalior ')
  })



app.listen(port,()=>{
    console.log(`ready KG SCHOOl ${port}`)
})


module.exports=app