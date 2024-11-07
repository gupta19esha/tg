import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey);
    
    return token;
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function getUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) return null;
    
    const user = await verifyToken(token.value);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
} 