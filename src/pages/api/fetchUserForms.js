import { fetchSpecificUserForms } from "lib/form";

export default async function func(req, res) {
    const forms = await fetchSpecificUserForms(req.body);
    return res.status(200).send({forms: forms.forms})
}