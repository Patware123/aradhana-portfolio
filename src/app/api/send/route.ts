import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Provide a dummy key if env var is missing during build
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, concern, date, time, message } = data;

    const emailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update with a verified domain later if available
      to: 'baghare123@gmail.com', // Aradhana's email
      subject: `New Therapy Session Request from ${name}`,
      html: `
        <h2>New Session Request Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Primary Concern:</strong> ${concern}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <br/>
        <h3>Additional Message</h3>
        <p>${message || 'None provided.'}</p>
      `,
    });

    if (emailResponse.error) {
      console.error('Resend Error:', emailResponse.error);
      return NextResponse.json({ error: emailResponse.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: emailResponse.data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
