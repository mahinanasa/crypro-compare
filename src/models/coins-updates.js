/* eslint-disable indent */
const { model, Schema } = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate-v2');

const CoinUpdatesSchema = new Schema({
    fromSymbol: {
        type: String,
        required: true,
    },
    toSymbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    hourlyData:{
        type:Array
    }
}, { timestamps: true });

//CoinUpdatesSchema.plugin(mongoosePaginate);
module.exports.CoinUpdatesModel = model('coin-updates', CoinUpdatesSchema);
module.exports.CoinUpdatesSchema = CoinUpdatesSchema;
