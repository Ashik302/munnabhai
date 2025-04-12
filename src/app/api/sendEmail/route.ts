import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { data } = await req.json(); // Parse JSON from request
    console.log("Received data:", data);

    // Defensive check
    const services = Array.isArray(data?.services) ? data.services : [];

    const servicesHtml = services.map(
      (s: any) =>
        `<tr>
          <td style="border: 1px solid #ccc; padding: 8px;">${s.title}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${s.plan}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${s.numberOfPersons}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Rs. ${s.price}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Rs. ${s.price * s.numberOfPersons}</td>
        </tr>`
    ).join("");

    const invoiceTable = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ccc; padding: 8px;">Service</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Plan</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Persons</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Price</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Total</th>
          </tr>
        </thead>
        <tdata>
          ${servicesHtml}
        </tdata>
      </table>
    `;

    const consumerMessage = `
      <h2>Appointment Confirmation</h2>
      <p>Hello ${data.username},</p>
      <p>Your booking has been confirmed.</p>
      <p><strong>Payment Status:</strong> ${data.trans_status}</p>
      ${invoiceTable}
      <p><strong>Total:</strong> Rs. ${data.totalPrice}</p>
      <p><strong>Branch:</strong> ${data.branch}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p>We’ll contact you if we need to adjust your schedule due to other appointments.</p>
    `;

    const ownerMessage = `
      <h2>New Appointment Booking</h2>
      <p><strong>Name:</strong> ${data.username}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Branch:</strong> ${data.branch}</p>
      <p><strong>Payment Status:</strong> ${data.trans_status}</p>
      ${invoiceTable}
      <p><strong>Total:</strong> Rs. ${data.totalPrice}</p>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: data.email,
    //   subject: "Booking Confirmation",
    //   html: consumerMessage,
    // });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mk6969635@gmail.com",
      subject: "New Appointment Booking",
      html: ownerMessage,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: String(error) },
      { status: 500 }
    );
  }
}
