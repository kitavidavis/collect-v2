import { deleteSpecificForm } from "lib/form";

export default async function deleteForm(req, res) {
    const deleted = await deleteSpecificForm(req.body);
    return res.status(200).send({deleted: true});
};