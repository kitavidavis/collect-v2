import { findSpecificUserDashboards } from "lib/dashboard";

export default async function getdashboards(req, res) {
    try {
        const response = await findSpecificUserDashboards(req.body);
        return res.status(200).send({dashboards: response});
    } catch(error){
        return res.status(500).send({msg: error.message});
    }
}