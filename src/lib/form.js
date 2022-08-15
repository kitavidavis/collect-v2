const Form = require('../models/forms');

export function createForm(obj){
    return new Promise((resolve, reject) => {
        let newForm = new Form({
            title: obj.title,
            form_id: obj.form_id,
            user_id: obj.user_id,
            description: obj.description,
            color: obj.color,
            background: obj.background,
            headerfont: obj.headerfont,
            header_image: obj.header_image,
            headersize: obj.headersize,
            questionfont: obj.questionfont,
            textfont: obj.textfont,
            textsize: obj.textsize,
            question: obj.question,
            collect_email_address: obj.collect_email_address,
            allow_response_editing: obj.allow_response_editing,
            limit_to_one_response: obj.limit_to_one_response,
            show_progress_bar: obj.show_progress_bar,
            shuffle_question_order: obj.shuffle_question_order,
            confirmation_message: obj.confirmation_message,
            show_link_to_submit_another_response: obj.show_link_to_submit_another_response,
            active: true
        });

        Form.createForm(newForm, function(err, form) {
            if(err) throw err;

            if(form){
                resolve({form: form, status: 200});
            }
        });
    });
}

export async function findSpecificUserForm({ form_id }) {
    return new Promise((resolve, reject) => {
        Form.getFormByFormId(form_id, function(err, form) {
            if(err) throw err;

            if(form) {
                resolve({form: form});
            } else {
                resolve({form: null})
            }
        });
    })
}

export async function fetchSpecificUserForms({username}){
    return new Promise((resolve, reject) => {
        Form.fetchFormsByUsername(username, function(err, forms){
            if(err) throw err;
            console.log(forms)
            resolve({forms: forms});
        })
    })
}

export async function findSpecificUserForms({ user_id }) {
    return new Promise((resolve, reject) => {
        Form.getFormByUsername(user_id, function(err, forms) {
            if(err) throw err;

            if(forms) {
                
                resolve({forms: forms});
            } else {
                resolve({forms: null});
            }
        })
    })
}

export async function deleteSpecificForm({ form_id }) {
    return new Promise((resolve, reject) => {
        Form.deleteForm(form_id, function(err, form){
            if(err) throw err;

            if(form){
                resolve({done: true});
            }
        })
    })
}

export async function deactivateSpecificForm({ form_id }) {
    return new Promise((resolve, reject) => {
        Form.deactivateForm(form_id, function(err, form) {
            if(err) throw err;

            if(form){
                resolve({done: true})
            }
        })
    })
}

export async function activateSpecificForm({ form_id }) {
    return new Promise((resolve, reject) => {
        Form.activateForm(form_id, function(err, form){
            if(err) throw err;

            if(form){
                resolve({done: true});
            }
        })
    })
}

export async function getAllForms(){
    return new Promise((resolve, reject) => {
        Form.getAllForms(function(err, forms){
            if(err){
                throw err;
            }

            if(forms){
                resolve({forms: forms.length});
            }
        })
    })
}