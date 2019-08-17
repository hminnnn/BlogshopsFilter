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

export default mongoose.model('item', Item, 'data_2019-08-18'); // specifiy collection name