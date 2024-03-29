const Response = require('../models/response');

export function createResponse(obj) {
    console.log(obj);
    return new Promise((resolve, reject) => {
        let newResponse = new Response({
            response: obj.response,
            response_id: obj.response_id,
            form_id: obj.form_id
        });

        Response.createResponse(newResponse, function(err, response) {
            if(err) throw err;

            if(response) {
                resolve({response: response, status: 'ok'});
            }
        });
    });
}

export async function findSpecificResponse({response_id}) {
    return new Promise((resolve, reject) => {
        Response.getResponseByResponseId(response_id, function(err, response) {
            if(err) throw err;

            if(response) {
                resolve({response: response});
            } else {
                resolve({response: null});
            }
        });
    })
}

export async function getAllFormResponse({form_id}){
    return new Promise((resolve, reject) => {
        Response.getAllFormResponse(form_id, function(err, responses) {
            if(err) throw err;

            if(responses) {
                console.log(responses);
                resolve({responses: responses});
            }
        });
    });
}

export async function getAllResponses(){
    return new Promise((resolve, reject) => {
        Response.getAllResponses(function(err, responses){
            if(err) throw err;

            if(responses){
                resolve({responses: responses.length});
            }
        })
    })
}