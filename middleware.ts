import { NextResponse } from 'next/server'

export async function middleware(req: { nextUrl: { pathname: any } }) {
    const { pathname } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect('https://ibcnfts.com/')
    }
    return NextResponse.next()
}