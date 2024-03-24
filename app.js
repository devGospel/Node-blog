require('dotenv').config();
const express = require('express')
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');



// Connect to Database 
const connectDB = require('./server/config/db')
connectDB()

const isActiveRoute = require('./server/helpers/routeHelpers');
// const collection  = require('./server/models/Post');


   
const app = express()
const PORT = 3000;


const store = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/BLOG_DB',
    // mongoUrl: 'mongodb+srv://gospel:regX1aDbCYwZnOfQ@cluster0.capnoqm.mongodb.net/blog',
    collection: "blogSessions"
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true, 
    cookie: { maxAge: 3600}

    // Date.now() - 30 * 24 * 60 * 60 * 1000
       
})); 

app.use(express.urlencoded({ extended: true} ));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))




app.use(express.static('public'));

 
// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute;
 
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))


app.listen(PORT, () => {
    console.log('App listening on the port '+ PORT);
}); 