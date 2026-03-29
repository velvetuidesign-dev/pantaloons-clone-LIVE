import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { action, email, password, name, phone, address } = body;

    // --- SIGN UP LOGIC ---
    if (action === 'signup') {
      // 1. Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'Email already in use!' }, { status: 400 });
      }

      // 2. Encrypt the password (Bank-level security)
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3. Save the new user
      const newUser = await User.create({ 
        name, email, password: hashedPassword, phone, address 
      });
      
      return NextResponse.json({ 
        success: true, 
        user: { id: newUser._id, name, email, phone, address } 
      });
    } 
    
    // --- LOG IN LOGIC ---
    if (action === 'login') {
      // 1. Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: 'User not found!' }, { status: 404 });
      }

      // 2. Check if password matches the encrypted one
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ error: 'Incorrect password!' }, { status: 400 });
      }

      // 3. Success! Send user data back
      return NextResponse.json({ 
        success: true, 
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address } 
      });
    }

  } catch (error: any) {
    console.error("Auth Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}