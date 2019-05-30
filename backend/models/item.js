import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Item = new Schema({
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

});

export default mongoose.model('item', Item, 'blogshopdata'); // specifiy collection name