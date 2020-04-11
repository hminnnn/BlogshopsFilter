const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('./models/item');
const dotenv = require('dotenv').config()

const app = express();
const router = express.Router();

var sortby = { 'dateCrawled': -1, 'crawlCount': 1 }

app.use(cors());
app.use(bodyParser.json());

if (dotenv.error) {
    throw dotenv.error
}

//console.log("dotenv.parsed:", dotenv.parsed)


const uri = process.env.DB_URI;
//     const MongoClient = require('mongodb').MongoClient;
//     const client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//       const collection = client.db("test").collection("devices");
//       // perform actions on the collection object
//       client.close();
//     });
//     uri = environment.DB_URI;

console.log(process.env.DB_URI)


// mongoose.connect('mongodb://127.0.0.1:27017/blogshopscrapy'); 
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Express server is established!')
})

app.get('/', function (req, res) {
    res.send("Hello world! Blogshopscombinedbackend");
});

// get all
router.route('/getAllItems').get((req, res) => {
    console.log("getting!:", req);
    item.find().sort(sortby).exec((err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    })
});

// get all from one shop
router.route('/getAllFromShop/:shopNameValue').get((req, res) => {
    console.log("getting ", req.params.shopNameValue)
    console.log("HELELELELEL??")

    Item.find({ shopNameValue: req.params.shopNameValue },
    ).sort(sortby).exec((err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    })
});

// get specific item types from multiple shops
router.route('/getTypesFromShops/:shopNames/:itemTypes').get((req, res) => {
    console.log("getting", req.params.shopNames, "from", req.params.itemTypes)
    let shopnames = "";
    if (req.params.shopNames.indexOf('&') > -1) {
        shopnames = req.params.shopNames.split('&');
    } else {
        shopnames = [req.params.shopNames];
    }
    console.log(shopnames)
    let itemTypes = "";
    if (req.params.itemTypes.indexOf('&') > -1) {
        itemTypes = req.params.itemTypes.split('&');
    } else {
        itemTypes = [req.params.itemTypes];
    }
    console.log(itemTypes)
    Item.find({
        shopNameValue: { "$in": shopnames },
        itemType: { "$in": itemTypes },
    }).sort(sortby).exec((err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    });
});


app.use('/', router);


// app.get('/', (req,res) => res.send('Hello World!'));
app.listen(8080, () => console.log('Express server is running on port 8080'));
