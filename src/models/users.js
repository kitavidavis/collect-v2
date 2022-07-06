var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => console.log("MongoDB Connected"))

// user schema,
var UserSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        index: true
    },
    phone: {
        type: String
    },
    job: {
        type: String
    },
    country: {
        type: String
    },
    privacyCheck: {
        type: Boolean
    },
    password: {
        type: String
    },
    company: {
        type: String
    },
    gender: {
        type: String
    },
    county: {
        type: String
    },
    avater: {
        type: String
    }
}, {timestamps: true});

var User = module.exports = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback); 
        });
    });
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByUsername = function(username, callback){
    var query = { username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}