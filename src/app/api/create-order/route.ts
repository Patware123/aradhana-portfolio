import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});

// Server-side pricing source of truth
const PLAN_PRICING: Record<string, number> = {
  'Basic Session (₹500)': 500,
  'Standard Session (₹800)': 800,
};

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    if (!plan || !PLAN_PRICING[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const amountInINR = PLAN_PRICING[plan];
    const amountInPaise = amountInINR * 100;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      amount: amountInPaise,
      currency: order.currency
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
