import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '../../../models/Order'; // Adjust path if needed, or we just rely on mongoose.models

// Quick database connection checker
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { cart, totalAmount, paymentMethod } = body;

    // Save the exact order to your MongoDB!
    const newOrder = await Order.create({
      items: cart,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      // If it's COD, they haven't paid yet!
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid', 
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error("Order Save Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// This allows the Admin Dashboard to fetch all orders
export async function GET() {
  try {
    await connectDB();
    // Fetch all orders and sort them by newest first (-1)
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}