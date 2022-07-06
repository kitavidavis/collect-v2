import { createForm } from "lib/form";
const Form = require('../../models/forms');

export default async function createform(req, res) {
    const response = await createForm(req.body);
    return res.status(response.status).send({form: response.form});
}