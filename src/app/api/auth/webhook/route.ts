import { onCompleteUserRegistration } from "@/actions/auth";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET || typeof WEBHOOK_SECRET !== "string") {
    throw new Error("Please add a valid CLERK_WEBHOOK_SECRET in .env");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing Svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  console.log("Received payload:", JSON.stringify(payload, null, 2));

  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (evt.type === "user.created") {
    try {
      console.log("Processing user.created event...");
      await onCompleteUserRegistration(
        `${payload?.data?.first_name ?? ""} ${payload?.data?.last_name ?? ""}`,
        payload?.data?.id,
        "user"
      );

      return NextResponse.json(
        { message: "User info inserted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error handling user.created:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: "Unhandled event type" },
    { status: 400 }
  );
  
  return NextResponse.json(200)
}
