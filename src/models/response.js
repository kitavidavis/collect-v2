var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, ()  => console.log("Mongodb connected"));

// response schema
var ResponseSchema = mongoose.Schema({
    response: {
        type: Object
    },
    response_id: {
        type: String,
        index: true
    },
    form_id: {
        type: String
    }
}, {timestamps: true});

var Response = module.exports = mongoose.models.responses || mongoose.model('responses', ResponseSchema);

module.exports.createResponse = function(newResponse, cb) {
    newResponse.save(cb);
}

module.exports.getResponseByResponseId = function(response_id, cb) {
    var query = {response_id: response_id};
    Response.findOne(query, cb);
}

module.exports.getResponseById = function(id, cb){
    Response.findOne(id, cb);
}

module.exports.getAllFormResponse = function(form_id, cb) {
    var query = {form_id: form_id};
    Response.find(query, cb);
}

module.exports.deleteResponse = function(response_id, cb){
    var query = {response_id: response_id};
    Response.deleteOne(query, cb);
}

module.exports.deleteAllResponse = function(form_id, cb){
    var query = {form_id: form_id};
    Response.deleteMany(query, cb);
};