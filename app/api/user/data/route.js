import dbConnect from '@/config/db';
import User from '@/Models/User';
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(request) {
   try{
    const {userId} = getAuth(request)

    await dbConnect();
    const user =  await User.findById(userId)

    if(!user){
        return NextResponse.json({ success:false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
   }
   catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
   }
    
}
