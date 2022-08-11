import { getAllUsers } from "lib/user";

export default async function getAllSiteUsers(req, res){
    const users = await getAllUsers();
    
    return res.status(200).send({users: users});
}