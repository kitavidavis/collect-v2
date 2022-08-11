import { getAllResponses } from "lib/response";

export default async function getAllSiteResponse(req, res){
    const responses = await getAllResponses();
    return res.status(200).send({responses: responses});
}