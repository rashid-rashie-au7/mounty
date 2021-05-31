const express = require('express');
const bodyParser = require('body-parser');
require('./src/config/db');

const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//*********Set Static Files */
//static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));
app.use('/img',express.static(__dirname+'public/img'));

//*******Set template Engine */
app.set('views', './src/views');
app.set('view engine', 'ejs');

//********Set Routes */

const userRouter =  require('./src/routes/userRouter');

app.use("/",userRouter);


//******Port Listening */
app.listen(port,() => {
    console.log("Listening on ",port)
})