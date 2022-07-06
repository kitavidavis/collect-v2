import { findSpecificUserForms } from "lib/form";
const Form = require('../../models/forms');

export default async function getAllUserForms(req, res) {
    const response = await findSpecificUserForms(req.body);
    return res.status(200).send({forms: response.forms});
}