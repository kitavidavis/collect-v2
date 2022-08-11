import { deleteAllResponse } from "models/response";

export default async function deleteAllFormResponse(req, res) {
    const deleted = await deleteAllResponse(req.body);
    return res.status(200).send({deleted: true});
}