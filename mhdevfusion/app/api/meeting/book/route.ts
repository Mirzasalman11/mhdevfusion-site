import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      company, 
      meetingAbout, 
      meetingType, 
      dateTime, 
      duration 
    } = body;

    // Validate request body
    if (!name || !email || !phone || !meetingAbout || !meetingType || !dateTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Debug: Log environment variables
    console.log('=== BOOKING API DEBUG ===');
    console.log('Google Calendar Environment variables check:');
    console.log('GOOGLE_CALENDAR_CLIENT_ID:', process.env.GOOGLE_CALENDAR_CLIENT_ID ? '***' : 'MISSING');
    console.log('GOOGLE_CALENDAR_CLIENT_SECRET:', process.env.GOOGLE_CALENDAR_CLIENT_SECRET ? '***' : 'MISSING');
    console.log('GOOGLE_CALENDAR_REFRESH_TOKEN:', process.env.GOOGLE_CALENDAR_REFRESH_TOKEN ? '***' : 'MISSING');
    console.log('Received booking data:', body);

    // Parse the meeting date and time
    const meetingDateTime = new Date(dateTime);
    const endTime = new Date(meetingDateTime.getTime() + duration * 60000); // Add duration in minutes

    // Create Google Calendar event
    let calendarEvent = null;
    if (process.env.GOOGLE_CALENDAR_CLIENT_ID && process.env.GOOGLE_CALENDAR_CLIENT_SECRET) {
      try {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CALENDAR_CLIENT_ID,
          process.env.GOOGLE_CALENDAR_CLIENT_SECRET
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
        });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const event = {
          summary: `Meeting with ${name} - ${meetingType}`,
          description: `
Meeting Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Company: ${company || 'Not specified'}
- Meeting Type: ${meetingType}
- Duration: ${duration} minutes

About the meeting:
${meetingAbout}
          `,
          start: {
            dateTime: meetingDateTime.toISOString(),
            timeZone: 'Asia/Karachi',
          },
          end: {
            dateTime: endTime.toISOString(),
            timeZone: 'Asia/Karachi',
          },
          attendees: [
            { email: process.env.ADMIN_EMAIL },
            { email: email },
          ],
          conferenceData: {
            createRequest: {
              requestId: `meeting-${Date.now()}`,
              conferenceSolutionKey: {
                type: 'hangoutsMeet'
              }
            }
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', 'minutes': 24 * 60 }, // 1 day before
              { method: 'popup', 'minutes': 10 }, // 10 minutes before
            ],
          },
        };

        console.log('Creating Google Calendar event...');
        calendarEvent = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
          conferenceDataVersion: 1,
        });

        console.log('Calendar event created successfully:', calendarEvent.data);
        console.log('Event ID:', calendarEvent.data.id);
        console.log('Event link:', calendarEvent.data.htmlLink);
      } catch (calendarError: any) {
        console.error('=== GOOGLE CALENDAR ERROR ===');
        console.error('Error details:', calendarError);
        console.error('Error message:', calendarError.message);
        console.error('Error code:', calendarError.code);
        console.error('Error status:', calendarError.status);
        
        // Continue with email sending even if calendar fails
      }
    }

    // Send email notifications
    console.log('=== SENDING EMAIL NOTIFICATIONS ===');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);
    console.log('SMTP User:', process.env.SMTP_USER);
    console.log('Admin Email:', process.env.ADMIN_EMAIL);
    console.log('User Email:', email);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
    });

    const sender = `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.SMTP_USER}>`;

    // 1. Send Admin Notification
    const adminMailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Meeting Scheduled</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .meeting-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .detail-value {
            font-weight: 500;
            color: #212529;
            font-size: 15px;
            text-align: right;
            max-width: 60%;
        }
        .about-section {
            margin: 25px 0;
        }
        .about-section h3 {
            color: #495057;
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        .about-content {
            background-color: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 15px;
            color: #495057;
            font-size: 14px;
            line-height: 1.6;
        }
        .calendar-link {
            display: inline-block;
            background-color: #667eea;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s ease;
        }
        .calendar-link:hover {
            background-color: #5a67d8;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer h4 {
            color: #495057;
            font-size: 18px;
            margin-bottom: 8px;
        }
        .footer p {
            color: #6c757d;
            font-size: 14px;
            margin: 4px 0;
        }
        .footer .brand {
            color: #667eea;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Meeting Scheduled</h1>
            <p>A client has booked a meeting with your team</p>
        </div>
        <div class="content">
            <div class="meeting-details">
                <div class="detail-row">
                    <span class="detail-label">Client Name</span>
                    <span class="detail-value">${name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email Address</span>
                    <span class="detail-value">${email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone Number</span>
                    <span class="detail-value">${phone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Company</span>
                    <span class="detail-value">${company || 'Not specified'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Meeting Type</span>
                    <span class="detail-value">${meetingType.charAt(0).toUpperCase() + meetingType.slice(1)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">${meetingDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time</span>
                    <span class="detail-value">${meetingDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} (${Intl.DateTimeFormat().resolvedOptions().timeZone})</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration</span>
                    <span class="detail-value">${duration} minutes</span>
                </div>
            </div>
            
            <div class="about-section">
                <h3>About the Meeting</h3>
                <div class="about-content">
                    ${meetingAbout}
                </div>
            </div>
            
            ${calendarEvent ? `
            <a href="${calendarEvent.data.htmlLink}" class="calendar-link">
                View in Google Calendar
            </a>
            ` : ''}
        </div>
        <div class="footer">
            <h4>${process.env.NEXT_PUBLIC_COMPANY_NAME}</h4>
            <p>${process.env.NEXT_PUBLIC_COMPANY_ADDRESS || ''}</p>
            <p>${process.env.NEXT_PUBLIC_COMPANY_PHONE || ''}</p>
            <p style="margin-top: 15px; font-size: 12px; color: #6c757d;">
                This email was sent from your booking system
            </p>
        </div>
    </div>
</body>
</html>`;

    await transporter.sendMail({
      from: sender,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Meeting Scheduled: ${name} - ${meetingType} | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
      html: adminMailHtml
    });

    // 2. Send User Confirmation
    const userMailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meeting Confirmed</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-message {
            text-align: center;
            margin-bottom: 30px;
        }
        .welcome-message h2 {
            color: #28a745;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .welcome-message p {
            color: #6c757d;
            font-size: 16px;
        }
        .meeting-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .detail-value {
            font-weight: 500;
            color: #212529;
            font-size: 15px;
            text-align: right;
            max-width: 60%;
        }
        .calendar-link {
            display: inline-block;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s ease;
        }
        .calendar-link:hover {
            background-color: #218838;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer h4 {
            color: #495057;
            font-size: 18px;
            margin-bottom: 8px;
        }
        .footer p {
            color: #6c757d;
            font-size: 14px;
            margin: 4px 0;
        }
        .footer .brand {
            color: #28a745;
            font-weight: 700;
        }
        .meet-link {
            display: inline-block;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 0;
            font-size: 14px;
        }
        .meet-link:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Meeting Confirmed! </h1>
            <p>Your meeting has been successfully scheduled</p>
        </div>
        <div class="content">
            <div class="welcome-message">
                <h2>Hi ${name},</h2>
                <p>Thank you for scheduling a meeting with ${process.env.NEXT_PUBLIC_COMPANY_NAME}!</p>
            </div>
            
            <div class="meeting-details">
                <div class="detail-row">
                    <span class="detail-label">Meeting Type</span>
                    <span class="detail-value">${meetingType.charAt(0).toUpperCase() + meetingType.slice(1)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">${meetingDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time</span>
                    <span class="detail-value">${meetingDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} (${Intl.DateTimeFormat().resolvedOptions().timeZone})</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration</span>
                    <span class="detail-value">${duration} minutes</span>
                </div>
            </div>
            
            ${calendarEvent ? `
            <div style="text-align: center; margin: 30px 0;">
                <a href="${calendarEvent.data.htmlLink}" class="calendar-link">
                    Add to Google Calendar
                </a>
                ${calendarEvent.data.hangoutLink ? `
                <br><br>
                <a href="${calendarEvent.data.hangoutLink}" class="meet-link">
                    Join Google Meet
                </a>
                ` : ''}
            </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6c757d; font-size: 16px;">
                    We look forward to speaking with you soon!
                </p>
            </div>
        </div>
        <div class="footer">
            <h4>${process.env.NEXT_PUBLIC_COMPANY_NAME}</h4>
            <p>${process.env.NEXT_PUBLIC_COMPANY_ADDRESS || ''}</p>
            <p>${process.env.NEXT_PUBLIC_COMPANY_PHONE || ''}</p>
            <p style="margin-top: 15px; font-size: 12px; color: #6c757d;">
                This email was sent from your booking system
            </p>
        </div>
    </div>
</body>
</html>`;

    await transporter.sendMail({
      from: sender,
      to: email,
      subject: `Meeting Confirmed! | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
      html: userMailHtml
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Meeting scheduled successfully!',
      calendarEvent: calendarEvent ? {
        id: calendarEvent.data.id,
        htmlLink: calendarEvent.data.htmlLink
      } : null
    });

  } catch (error) {
    console.error('Meeting booking error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule meeting. Please try again later.' },
      { status: 500 }
    );
  }
}
