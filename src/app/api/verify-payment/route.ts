import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'psychsarthi22@gmail.com',
    pass: 'rlhnhkfgqgjorlkd',
  },
});

const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET as string;
const THERAPIST_EMAIL = 'baghare123@gmail.com';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      bookingDetails
    } = data;

    // 1. Verify Payment Signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const verificationResult = {
      paymentVerified: true,
      emailSent: false,
      issues: [] as string[]
    };

    // 2. Email Confirmation
    try {
      // Email to Client
      await transporter.sendMail({
        from: 'Aradhana Therapy <psychsarthi22@gmail.com>',
        to: bookingDetails.email,
        subject: 'Session Confirmed - Aradhana Baghare',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6d5b4b; text-align: center;">Session Confirmed</h2>
            <p>Hi ${bookingDetails.name},</p>
            <p>Your therapy session has been successfully booked and payment is confirmed.</p>
            
            <div style="background: #f7f3ec; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Date:</strong> ${bookingDetails.date}</p>
              <p><strong>Time:</strong> ${bookingDetails.time}</p>
              <p><strong>Plan:</strong> ${bookingDetails.plan}</p>
              <p><strong>Therapist:</strong> Aradhana Baghare</p>
              <p><strong>Google Meet Link:</strong> <a href="https://meet.google.com/qfq-cyha-tok">https://meet.google.com/qfq-cyha-tok</a></p>
            </div>
            
            <p>If you need to reschedule or have questions before the session, please hit reply to this email.</p>
            <p>Looking forward to our session.</p>
            <p>Warm regards,<br/>Aradhana Baghare</p>
          </div>
        `
      });

      // Email to Therapist
      await transporter.sendMail({
        from: 'System Notification <psychsarthi22@gmail.com>',
        to: THERAPIST_EMAIL,
        subject: `New Booking Confirmed: ${bookingDetails.name}`,
        html: `
          <h2>New Session Booking</h2>
          <p><strong>Client:</strong> ${bookingDetails.name}</p>
          <p><strong>Email:</strong> ${bookingDetails.email}</p>
          <p><strong>Phone:</strong> ${bookingDetails.phone}</p>
          <p><strong>Plan:</strong> ${bookingDetails.plan}</p>
          <p><strong>Date:</strong> ${bookingDetails.date}</p>
          <p><strong>Time:</strong> ${bookingDetails.time}</p>
          <p><strong>Concerns:</strong> ${bookingDetails.concern || 'Not specified'}</p>
          <p><strong>Message:</strong> ${bookingDetails.message || 'None'}</p>
          <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
          <p><strong>Google Meet Link:</strong> <a href="https://meet.google.com/qfq-cyha-tok">https://meet.google.com/qfq-cyha-tok</a></p>
        `
      });

      verificationResult.emailSent = true;
    } catch (emailError: any) {
      console.error('Email Error:', emailError);
      verificationResult.issues.push("Failed to trigger confirmation email");
    }

    return NextResponse.json({ 
      success: true, 
      result: verificationResult 
    });

  } catch (error) {
    console.error('Verification Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error processing confirmation' }, { status: 500 });
  }
}
