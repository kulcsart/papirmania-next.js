import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Minden mező kitöltése kötelező' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Érvénytelen email cím' },
        { status: 400 }
      );
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'Papírmania Weboldal <noreply@papirmania.hu>',
      to: 'darmos.marianna@gmail.com',
      subject: `Új üzenet: ${name}`,
      html: `
        <h2>Új kapcsolatfelvételi űrlap</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Üzenet:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    return NextResponse.json(
      { success: true, message: 'Üzenet sikeresen elküldve!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email küldési hiba:', error);
    return NextResponse.json(
      { error: 'Hiba történt az üzenet küldése közben' },
      { status: 500 }
    );
  }
}
