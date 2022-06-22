import { getLoginSession } from "pages/lib/auth";
import { findUser, findUserByUsername } from "pages/lib/user";

export default async function user(req, res) {
    try {
      const session = await getLoginSession(req)
      const user = (session && (await findUserByUsername(session))) ?? null
  
      res.status(200).json({ user })
    } catch (error) {
      res.status(500).end('Authentication token is invalid, please log in')
    }
  }
  