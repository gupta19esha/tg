import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { createToken } from '@/app/lib/auth';

let dbConnection;

export async function POST(request) {
  try {
    // Reuse DB connection
    if (!dbConnection) {
      dbConnection = await dbConnect();
    }
    
    const { email, password } = await request.json();

    // Quick validation
    if (!email || !password || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // Check existing user with lean() for better performance
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Use lower salt rounds (8 instead of 10)
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create user with minimal fields
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = await createToken({ 
      userId: user._id.toString(),
      email 
    });

    const response = NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
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
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
} 