import { removeTokenCookie } from "pages/lib/auth-cookies";

export default async function logout(req, res) {
    removeTokenCookie(res)
    res.writeHead(302, { Location: '/auth/login' })
    res.end()
  }