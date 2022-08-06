import { serialize, parse } from "cookie";

const TOKEN_NAME = "geopsy-collect";

export const MAX_AGE = 60 * 60 * 24 * 30 // 1 month

export function setTokenCookie(res, token){
    const cookie = serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date (Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })

    res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res){
    const cookie = serialize(TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req){
    //For API Routes, we dent need to parse the cookies.
    if(req.cookies) return req.cookies

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie
    return parse(cookie || '')
}

export function getTokenCookie(req){
    const cookies = parseCookies(req)
    return cookies[TOKEN_NAME]
}