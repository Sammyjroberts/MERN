/**
 * Created by deanroberts on 8/9/17.
 */
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: String,
    number: String
});
module.exports = mongoose.model('Contact', contactSchema);
