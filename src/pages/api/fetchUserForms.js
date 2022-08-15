import { fetchSpecificUserForms } from "lib/form";

export default async function func(req, res) {
    console.log(1)
    const forms = await fetchSpecificUserForms(req.body);
    return res.status(200).send({forms: forms.forms})
}