import { EmailContact } from '@/MyComponents/email-contact';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY as string);

/* eslint-disable */
export async function POST(req: any) {
  // Need to check if the mothod comming in is POST
  if (req.method === 'POST') {
    const content = await req.json()
    const { name, email, service, projectDetails } = content;
  try {
    const { data, error } = await resend.emails.send({
      from: 'CWA Template Website <mailer@codewithali.com>',
      to: ['blazehunterhp@gmail.com', 'aalibrahimi0@gmail.com'], // Enter Client Email Here
      subject: 'New Message Incoming',
      react: EmailContact({ name, email, service, projectDetails }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
}
