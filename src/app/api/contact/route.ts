import { Resend } from "resend";
import type { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("message" in body)
  ) {
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body as ContactBody;

  if (
    typeof name !== "string" || name.trim() === "" ||
    typeof email !== "string" || email.trim() === "" ||
    typeof message !== "string" || message.trim() === ""
  ) {
    return Response.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "kacperdragun01@gmail.com",
    subject: `Nowa wiadomość od ${name.trim()}`,
    html: `
      <h2>Nowa wiadomość z portfolio</h2>
      <p><strong>Imię:</strong> ${name.trim()}</p>
      <p><strong>Email:</strong> ${email.trim()}</p>
      <p><strong>Wiadomość:</strong></p>
      <p>${message.trim()}</p>
    `,
  });

  if (error) {
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ success: true }, { status: 200 });
}
