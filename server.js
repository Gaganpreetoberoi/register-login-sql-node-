var express    =  require("express");
var login =  require('./routes/loginroutes');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
require('./dbconnection');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
});

var router = express.Router();

app.get('/', (req, res) => res.send('ho!'))
//test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
app.post('/register',login.register);
app.post('/login',login.login);
app.listen(8082,()=>{ 
    console.log("Server is Listening At Port 8082")  
})