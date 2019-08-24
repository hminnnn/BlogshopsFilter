const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    baseUrl: {
        type:String
    },
    pageName: {
        type:String
    },
    itemName: {
        type:String
    },
    itemPrice: {
        type:String
    },
    itemType: {
        type:Array
    },
    itemUrl: {
        type:String
    },
    itemImageUrl: {
        type:String
    },
    crawlCount: {
        type:Number
    },
    dateCrawled: {
        type:String
    }

});

// export default mongoose.model('item', Item, 'data'); // specifiy collection name
var Item = mongoose.model('item', ItemSchema, 'data');
module.exports = Item;