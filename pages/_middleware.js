import { getToken } from "next-auth/jwt";
import {NextResponse} from 'next/server'

export async function middleware(req){
    const token = await getToken({req, secret:process.env.JWT_SECRET})
    const {pathname} = req.nextUrl

    // allow the requests if the following is true
    // 1. the token exists
    // 2. a request for next-auth session & provider fetching
    if(pathname.includes('/api/auth') || token){
        return NextResponse.next()
    }

    // redirect to login if they dont have token and requesting protected route
    if(!token && pathname !== '/login'){
        return NextResponse.redirect('/login')
    }
}