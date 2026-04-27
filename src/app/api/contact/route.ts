import type { NextRequest } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  // Narrow the unknown body before accessing fields
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

  // Validate — all fields must be non-empty strings
  if (
    typeof name !== "string" || name.trim() === "" ||
    typeof email !== "string" || email.trim() === "" ||
    typeof message !== "string" || message.trim() === ""
  ) {
    return Response.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  // TODO: plug in email transport (Resend / Nodemailer) once the domain is ready
  console.log("[contact] New message:", { name: name.trim(), email: email.trim(), message: message.trim() });

  return Response.json({ success: true }, { status: 200 });
}
