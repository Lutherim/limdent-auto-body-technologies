import { NextRequest, NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/lib/limdent-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    const email = String(body.email || '').trim();
    const vehicle = String(body.vehicle || '').trim();
    const service = String(body.service || 'Panel Beating').trim();
    const claimType = String(body.claimType || 'Private / Cash').trim();
    const notes = String(body.notes || '').trim();
    const photoName = String(body.photoName || '').trim();

    if (!name || !phone || !vehicle) {
      return NextResponse.json(
        {
          error:
            'Please provide your full name, phone number, and vehicle details.',
        },
        { status: 400 }
      );
    }

    const referenceId = `LD-${Date.now().toString().slice(-6)}`;

    const lines = [
      `Hi ${COMPANY_INFO.name}, I would like to request a repair quotation:`,
      `Reference: ${referenceId}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Vehicle: ${vehicle}`,
      `Service Required: ${service}`,
      `Repair Category: ${claimType}`,
      `Damage Description: ${notes || 'To be assessed at workshop'}`,
      photoName
        ? `Damage Photo Selected: ${photoName} (I will attach this photo in the chat/email)`
        : null,
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
      formattedMessage
    )}`;
    const emailUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      `Quote Request [${referenceId}] - ${vehicle} (${service})`
    )}&body=${encodeURIComponent(formattedMessage)}`;

    return NextResponse.json({
      success: true,
      referenceId,
      formattedMessage,
      whatsappUrl,
      emailUrl,
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to process quote request. Please try again.' },
      { status: 500 }
    );
  }
}
