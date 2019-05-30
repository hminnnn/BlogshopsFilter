import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Item from './models/item'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/blogshopscrapy'); 
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Express server is established!')
})

// get all
router.route('/getAllItems').get((req,res) => {
    console.log("getting!")
    Item.find((err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    });
});

// get all from one shop
router.route('/getAllFromShop/:shopNameValue').get((req,res) => {
    console.log("getting ", req.params.shopNameValue)

    Item.find({shopNameValue: req.params.shopNameValue},
        (err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    });
});

// get specific item type from multiple shops
router.route('/getTypesFromShops/:shopNames/:itemTypes').get((req,res) => {
    console.log("getting",req.params.shopNames,"from",req.params.itemTypes)
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
            shopNameValue: {"$in": shopnames}, 
            itemType: {"$in" : itemTypes} 
        }, (err, items) => {
            if (err)
                console.log(err);
            else
                res.json(items);
        });
});


app.use('/', router);


// app.get('/', (req,res) => res.send('Hello World!'));
app.listen(4000, () => console.log('Express server is running on port 4000'));
