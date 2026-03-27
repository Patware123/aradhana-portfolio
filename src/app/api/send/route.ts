import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'psychsarthi22@gmail.com',
    pass: 'rlhnhkfgqgjorlkd',
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, concern, date, time, message } = data;

    const emailResponse = await transporter.sendMail({
      from: 'Portfolio Contact <psychsarthi22@gmail.com>',
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

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
