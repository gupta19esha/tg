import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { createToken } from '@/app/lib/auth';

let dbConnection;

export async function POST(request) {
  try {
    // Reuse DB connection if exists
    if (!dbConnection) {
      dbConnection = await dbConnect();
    }
    
    const { email, password } = await request.json();

    // Find user and select only needed fields
    const user = await User.findOne({ email }).select('password email');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Use lower salt rounds for bcrypt (8 instead of default 10)
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token with minimal payload
    const token = await createToken({ 
      userId: user._id.toString(),
      email: user.email 
    });

    const response = NextResponse.json(
      { message: 'Logged in successfully' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 