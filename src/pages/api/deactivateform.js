import { deactivateSpecificForm } from "lib/form";

export default async function deactivateForm(req, res) {
    const deactivated = await deactivateSpecificForm(req.body);
    return res.status(200).send({deactivated: true});
}