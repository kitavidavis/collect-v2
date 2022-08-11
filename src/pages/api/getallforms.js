import { getAllForms } from "lib/form";

export default async function getAllSiteForms(req, res){
    const forms = await getAllForms();
    return res.status(200).send({forms: forms});
}