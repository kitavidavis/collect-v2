import { findSpecificUserForm } from "lib/form";
const Form = require('../../models/forms');

export default async function getUserForm(req, res) {
    const response = await findSpecificUserForm(req.body);
    return res.status(200).send({form: response.form})
};