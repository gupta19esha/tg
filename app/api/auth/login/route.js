import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { createToken } from '@/app/lib/auth';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();


    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token
    const token = await createToken({ 
      userId: user._id.toString(), // Convert ObjectId to string
      email: user.email 
    });


    // Create response
    const response = NextResponse.json(
      { message: 'Logged in successfully' },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Error logging in: ' + error.message },
      { status: 500 }
    );
  }
} 