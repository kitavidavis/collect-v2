import { getAllFormResponse } from "lib/response";

export default async function getResponse(req, res) {
    console.log(req.body);
    const response = await getAllFormResponse(req.body);
    return res.status(200).send({response: response.responses});
}