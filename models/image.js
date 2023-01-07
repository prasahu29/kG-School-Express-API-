const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    images: {

        public_id: {
            type: String,
            
        },
        url: {
            type: String,
            
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, { timestamps: true });

var imagemodel = mongoose.model('image', imageSchema);
module.exports = imagemodel
