import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, topic, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure Nodemailer with user's Gmail App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "delightcherubino@gmail.com",
        pass: "uznc kpul niws kzgo",
      },
    });

    // 1. Notification Email sent to Delight Cherubino
    const mailOptionsToAdmin = {
      from: `"Portfolio Contact Form" <delightcherubino@gmail.com>`,
      to: "delightcherubino@gmail.com",
      replyTo: email,
      subject: `🚀 New Contact Inquiry from ${name} [${topic || "General"}]`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #FB6C00;">New Portfolio Connection Request</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Topic / Interest:</strong> ${topic || "General Inquiry"}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #FB6C00; border-radius: 4px;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <br/>
          <p style="font-size: 12px; color: #888;">Sent directly via delightcherubino.com Stepper Wizard</p>
        </div>
      `,
    };

    // 2. Automatic Thank-You Confirmation Email sent to the visitor
    const mailOptionsAutoResponder = {
      from: `"Delight Cherubino" <delightcherubino@gmail.com>`,
      to: email,
      subject: `Thank you for connecting with Delight Cherubino!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e1e1e; max-width: 600px; border: 1px solid #eee; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 16px; border-b: 1px solid #f0f0f0;">
            <h2 style="color: #FB6C00; margin: 0;">Delight Cherubino</h2>
            <p style="color: #666; font-size: 13px; margin-top: 4px;">President, Neoteric AI Association | AI & ML Engineer</p>
          </div>

          <div style="padding-top: 20px; line-height: 1.6; font-size: 14px;">
            <p>Hi <strong>${name}</strong>,</p>

            <p>Thank you for reaching out through my portfolio website! I have received your message regarding <strong>"${topic || "General Inquiry"}"</strong>.</p>

            <p>I appreciate your interest in connecting. I will review your note and respond back to this email address (<a href="mailto:${email}">${email}</a>) as soon as possible.</p>

            <div style="margin: 20px 0; padding: 14px; background-color: #fff8f0; border-left: 4px solid #FB6C00; border-radius: 6px; font-size: 13px;">
              <strong>Your Note Summary:</strong><br/>
              <em>"${message}"</em>
            </div>

            <p>Best regards,<br/>
            <strong>Delight Cherubino</strong><br/>
            <span style="font-size: 12px; color: #777;">Ramco Institute of Technology | <a href="https://github.com/Cherubinoo" style="color: #FB6C00;">GitHub</a></span></p>
          </div>
        </div>
      `,
    };

    // Send both emails asynchronously
    await Promise.all([
      transporter.sendMail(mailOptionsToAdmin),
      transporter.sendMail(mailOptionsAutoResponder),
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully!" });
  } catch (err: any) {
    console.error("Failed to send emails via Nodemailer:", err);
    return NextResponse.json(
      { error: "Failed to send email", details: err?.message || err },
      { status: 500 }
    );
  }
}
