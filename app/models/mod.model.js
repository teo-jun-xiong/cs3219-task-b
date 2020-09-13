const mongoose = require('mongoose');

const ModSchema = mongoose.Schema({
    name: String,
    code: String,
    grade: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Mod', ModSchema);