import Iron from '@hapi/iron';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies';

const TOKEN_SECRET = "45b9942ef85da181327f02bd47196304";

export async function setLoginSession(res, session) {
    const createdAt = Date.now()
    const a = JSON.stringify(session);
    const obj = { ...session, createdAt, maxAge: MAX_AGE }
    const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

    setTokenCookie(res, token);
}

export async function getLoginSession(req){
    const token = getTokenCookie(req)

    if(!token) return

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge * 1000

    // Validate the expiration date of the session
    if(Date.now() > expiresAt){
        throw new Error('Session expired')
    }

    return session
}