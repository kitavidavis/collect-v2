import { findSpecificDashboard } from "lib/dashboard";

export default async function getdashboard(req, res){
    try {
        const response = await findSpecificDashboard(req.body);

        return res.status(200).send({dashboard: response})
    } catch(error){
        return res.status(500).send({msg: error.message});
    }
}