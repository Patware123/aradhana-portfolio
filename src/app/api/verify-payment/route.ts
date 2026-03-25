import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { google } from 'googleapis';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_TK9DokM3_6e3yYhLwsRJmoNxYBgsZ7USV');
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET || 'WMPNTtGtPd95Ytzzr61YgEex';
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
      calendarBooked: false,
      emailSent: false,
      issues: [] as string[]
    };

    // 2. Google Calendar Booking
    try {
      let auth;
      
      // Method A: OAuth 2.0 Client ID (preferred for personal calendars)
      if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
        auth = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
      } 
      // Method B: Service Account (fallback)
      else if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/calendar.events'],
        });
      }

      if (auth) {
        const calendar = google.calendar({ version: 'v3', auth });

        // Calculate start and end times (Asia/Kolkata timezone offset is +05:30)
        // Ensure parsing works reliably by constructing a strict ISO string
        const startDateTime = new Date(`${bookingDetails.date}T${bookingDetails.time}:00+05:30`);
        
        // Duration logic based on plan
        const durationMinutes = bookingDetails.plan.includes('Basic') ? 45 : 60;
        const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

        // Check for conflicts
        const checkResponse = await calendar.events.list({
          calendarId: 'primary',
          timeMin: startDateTime.toISOString(),
          timeMax: endDateTime.toISOString(),
          singleEvents: true,
        });

        const events = checkResponse.data.items;
        if (events && events.length > 0) {
          throw new Error('Slot already booked. Please contact support to reschedule.');
        }

        // Create the event
        const eventResponse = await calendar.events.insert({
          calendarId: 'primary',
          sendUpdates: 'all', // Important: this triggers native Google calendar invites
          conferenceDataVersion: 1, // Required to auto-generate meet links
          requestBody: {
            summary: `Therapy Session with Aradhana`,
            description: `Client: ${bookingDetails.name}\nConcern: ${bookingDetails.concern}\nPhone: ${bookingDetails.phone}`,
            start: { dateTime: startDateTime.toISOString(), timeZone: 'Asia/Kolkata' },
            end: { dateTime: endDateTime.toISOString(), timeZone: 'Asia/Kolkata' },
            attendees: [
              { email: bookingDetails.email },
              { email: THERAPIST_EMAIL }
            ],
            colorId: '2',
            conferenceData: {
              createRequest: {
                requestId: `meet_${razorpay_order_id}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' }
              }
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 30 },
              ],
            },
          },
        });

        if (eventResponse.data.hangoutLink) {
          bookingDetails.meetLink = eventResponse.data.hangoutLink;
        }

        verificationResult.calendarBooked = true;
      } else {
        // Not throwing error, just logging so we don't break payment flow
        console.warn("Google Calendar credentials missing. Skipping calendar insert.");
        verificationResult.issues.push("Calendar sync skipped (missing credentials)");
      }
    } catch (calError: any) {
      console.error('Calendar Error:', calError);
      verificationResult.issues.push(calError.message || "Failed to book calendar slot");
    }

    // 3. Email Confirmation
    try {
      // Email to Client
      await resend.emails.send({
        from: 'Aradhana Therapy <onboarding@resend.dev>', // Should be a verified domain in prod
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
              ${bookingDetails.meetLink ? `<p><strong>Google Meet Link:</strong> <a href="${bookingDetails.meetLink}">${bookingDetails.meetLink}</a></p>` : `<p><em>Google Meet link will be provided separately.</em></p>`}
            </div>
            
            <p>If you need to reschedule or have questions before the session, please hit reply to this email.</p>
            <p>Looking forward to our session.</p>
            <p>Warm regards,<br/>Aradhana Baghare</p>
          </div>
        `
      });

      // Email to Therapist
      await resend.emails.send({
        from: 'System Notification <onboarding@resend.dev>',
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
          <p><strong>Calendar Sync Status:</strong> ${verificationResult.calendarBooked ? 'Success' : 'Failed/Skipped'}</p>
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
