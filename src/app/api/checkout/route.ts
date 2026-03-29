import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import Order from '../../../models/Order'; // Bring in our Database blueprint!

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

// Quick database connection checker
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function POST(req: Request) {
  try {
    await connectDB(); // 1. Connect to the database!
    
    const body = await req.json();
    // 2. Grab the new customer data we just sent from the frontend
    const { cart, totalAmount, customerName, customerEmail } = body;

    // 3. NEW: Save the order to MongoDB FIRST!
    await Order.create({
      items: cart,
      totalAmount: totalAmount,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid', // We assume it's paid once they go to Stripe
      customerName: customerName,
      customerEmail: customerEmail,
    });

    // 4. Now, translate the cart for Stripe just like before
    const lineItems = cart.map((item: any) => {
      const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''));
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: priceNumber * 100, 
        },
        quantity: 1,
      };
    });

    // 5. Generate the secure checkout page
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
    
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}