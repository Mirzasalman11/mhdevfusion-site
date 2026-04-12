import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    // Validate request body
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Debug: Log all environment variables
    console.log('Environment variables check:');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'MISSING');
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

    // Ensure SMTP config exists
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Configure Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // false for 587 (TLS), true for 465 (SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Common email configuration
    const sender = `"${process.env.NEXT_PUBLIC_COMPANY_NAME}" <${process.env.SMTP_USER}>`;


    // 1. Send Admin Notification
    await transporter.sendMail({
      from: sender,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name} - ${service} | MHDEVFUSION`,
      text: `Service: ${service}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\nMessage:\n${message}`,
      html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden; }
                .header { background-color: #2563eb; color: #fff; padding: 20px; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
                .content { padding: 30px 20px; background-color: #ffffff; }
                .field-group { margin-bottom: 20px; }
                .field-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 4px; display: block; }
                .field-value { font-size: 16px; color: #333; font-weight: 500; }
                .message-box { background-color: #f8f9fa; border-left: 4px solid #2563eb; padding: 15px; margin-top: 20px; border-radius: 4px; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e1e1e1; }
                .footer p { margin: 4px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Project Inquiry</h1>
                </div>
                <div class="content">
                  <div class="field-group">
                    <span class="field-label">Client Name</span>
                    <div class="field-value">${name}</div>
                  </div>
                  <div class="field-group">
                    <span class="field-label">Email Address</span>
                    <div class="field-value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
                  </div>
                  <div class="field-group">
                    <span class="field-label">Phone Number</span>
                    <div class="field-value">${phone || '<span style="color:#999">Not provided</span>'}</div>
                  </div>
                  <div class="field-group">
                    <span class="field-label">Company</span>
                    <div class="field-value">${company || '<span style="color:#999">Not provided</span>'}</div>
                  </div>
                  <div class="field-group">
                    <span class="field-label">Service Interest</span>
                    <div class="field-value" style="color: #2563eb; font-weight: 700;">${service}</div>
                  </div>
                  <div class="message-box">
                    <span class="field-label" style="margin-bottom: 8px;">Message</span>
                    <div style="white-space: pre-wrap;">${message}</div>
                  </div>
                </div>
                <div class="footer">
                  <p><strong>${process.env.NEXT_PUBLIC_COMPANY_NAME}</strong></p>
                  <p>${process.env.NEXT_PUBLIC_COMPANY_ADDRESS}</p>
                  <p>${process.env.NEXT_PUBLIC_COMPANY_PHONE}</p>
                  <p style="margin-top: 10px; font-style: italic;">Powered by MHDEVFUSION Agency System</p>
                </div>
              </div>
            </body>
            </html>
          `,
    });

    // 2. Send User Confirmation
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: `We received your message! | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
      text: `Hi ${name},\n\nThank you for reaching out to ${process.env.NEXT_PUBLIC_COMPANY_NAME}. We have received your inquiry regarding ${service} and will get back to you shortly.\n\nBest regards,\nThe Team`,
      html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden; }
                .header { background-color: #2563eb; color: #fff; padding: 30px 20px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
                .content { padding: 40px 30px; background-color: #ffffff; text-align: center; }
                .content p { font-size: 16px; margin-bottom: 20px; color: #555; }
                .btn { display: inline-block; padding: 12px 24px; color: #ffffff !important; text-decoration: none; border-radius: 50px; font-weight: 600; margin: 10px 5px; }
                .btn-primary { background-color: #2563eb; }
                .btn-whatsapp { background-color: #25D366; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e1e1e1; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Thank You!</h1>
                </div>
                <div class="content">
                  <p>Hi <strong>${name}</strong>,</p>
                  <p>Thank you for contacting <strong>${process.env.NEXT_PUBLIC_COMPANY_NAME}</strong>. We have received your inquiry regarding <strong>${service}</strong>.</p>
                  <p>Our team is reviewing your details and will get back to you within 24 hours.</p>
                  
                  <div style="margin-top: 20px;">
                    <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://mhdevfusion.vercel.app'}" class="btn btn-primary">Visit Our Website</a>
                    <a href="https://wa.me/923396411668" class="btn btn-whatsapp">Chat on WhatsApp</a>
                  </div>
                </div>
                <div class="footer">
                  <p><strong>${process.env.NEXT_PUBLIC_COMPANY_NAME}</strong></p>
                  <p>${process.env.NEXT_PUBLIC_COMPANY_ADDRESS}</p>
                </div>
              </div>
            </body>
            </html>
          `
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }

}
