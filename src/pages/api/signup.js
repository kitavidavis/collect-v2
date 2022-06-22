import { createUser } from "pages/lib/user";
const User = require('../models/users');

export default async function signup(req, res) {
   const response = await createUser(req.body);
   return res.status(response.code).send({user: response.user})
   
   /*console.log(response);
      if(response.code == 200){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
      } else {
        res.statusCode = 409
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(response));
      } */
  }