import { activateSpecificForm } from "lib/form";

export default async function activateForm(req, res) {
    const activated = await activateSpecificForm(req.body);
    return res.status(200).send({activated: true});
}