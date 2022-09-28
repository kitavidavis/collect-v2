import { createDashboard } from "lib/dashboard";

export default async function createdashboard(req, res) {
    try {
        const response = await createDashboard(req.body);
        return res.status(200).send({msg: "ok"});
    } catch(error){
        return res.status(500).send({msg: error.message});
    }
}