import { createResponse } from "lib/response";

export default async function createresponse(req, res) {
    const r = await createResponse(req.body);
    return res.status(200).send({response: r.response});
}