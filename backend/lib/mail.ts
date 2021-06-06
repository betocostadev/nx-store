import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeNiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello there!</h2>
      <p>${text}</p>
      <p>NX Store</p>
    </div>
    `;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'account@nx-store.com',
    subject: 'Password reset token',
    html: makeNiceEmail(`Your password reset yoken is here!
      <a href=${process.env.FRONTEND_URL}/reset?token=${resetToken}>Click here to reset</a>
      `),
  })) as MailResponse;

  if (process.env.MAIL_USER.includes('ethereal.mail')) {
    console.log(`Message sent, preview it at: ${getTestMessageUrl(info)}`);
  }
}
