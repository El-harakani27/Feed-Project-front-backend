const express =require('express');
const mongoose = require('mongoose');
const path = require('path');
const feedRouter = require('./routes/feeds');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname, 'images')))
const { v4: uuidv4 } = require('uuid');
 

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');  // Make sure 'images' directory exists
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + file.originalname);  // Create unique filename
    }
});

const filterFile = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);  // Reject files that don't match the accepted types
    }
};

app.use(multer({ storage: storage, fileFilter: filterFile }).single('image'))
app.use(authRouter)
app.use(feedRouter)
mongoose.connect('mongodb://0.0.0.0:27017/messages')
.then(result=>{
app.listen(8080,()=>{
    console.log('Server is running on port 3000');
})    
})
.catch(err=>{
    console.log('Error connecting to MongoDB',err);
})
