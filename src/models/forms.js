var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => console.log("MongoDB Connected"))

// form schema,
var FormSchema = mongoose.Schema({
    title: {
        type: String
    },
    form_id: {
        type: String,
        index: true
    },
    user_id: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    background: {
        type: String
    },
    headerfont: {
        type: String
    },
    headersize: {
        type: String
    },
    questionfont: {
        type: String
    },
    textfont: {
        type: String
    },
    textsize: {
        type: String
    },
    question: {
        type: Object
    },
    collect_email_address: {
        type: Boolean
    },
    allow_response_editing: {
        type: Boolean
    },
    limit_to_one_response: {
        type: Boolean
    },
    show_progress_bar: {
        type: Boolean
    },
    shuffle_question_order: {
        type: Boolean
    },
    confirmation_message: {
        type: String
    },
    show_link_to_submit_another_response: {
        type: Boolean
    },
    active: {
        type: Boolean
    }

}, {timestamps: true});

var Form = module.exports = mongoose.models.forms || mongoose.model('forms', FormSchema );

module.exports.createForm = function(newForm, cb) {
    newForm.save(cb);
};

/**
 * Get form by specific custom form id
 * @param {*} formId 
 * @param {*} cb 
 */

module.exports.getFormByFormId = function(formId, cb) {
    var query = {form_id: formId};
    Form.findOne(query, cb);
}

/**
 * Get form by mongodb id
 * @param {*} id 
 * @param {*} cb 
 */

module.exports.getFormById = function(id, cb) {
    Form.findById(id, cb);
}

/**
 * Returns all forms for a particular user
 * @param {*} user_id 
 * @param {*} cb 
 */

module.exports.getFormByUsername = function(user_id, cb) {
    var query = {user_id: user_id};
    Form.find(query, cb);
};

module.exports.deleteForm = function(form_id, cb) {
    var query = {form_id: form_id};
    Form.deleteOne(query, cb);
}

module.exports.deleteAllUserForm = function(username, cb) {
    var query = {username: username};
    Form.deleteMany(query, cb);
}

module.exports.deactivateForm = function(form_id, cb) {
    Form.getFormByFormId(form_id, function(err, form) {
        if(err) throw err;

        if(form) {
            form.active = false;
            form.save(cb);
        }
    });
}

module.exports.activateForm = function(form_id, cb) {
    Form.getFormByFormId(form_id, function(err, form) {
        if(err) throw err;

        if(form){
            form.active = true;
            form.save(cb);
        }
    });
}

