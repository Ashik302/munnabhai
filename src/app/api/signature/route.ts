import crypto from "crypto"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { total_amount, transaction_uuid, product_code } = await req.json();

  const payload = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const secretKey = process.env.ESEWA_SECRET_KEY!;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(payload)
    .digest("base64");

  return NextResponse.json({ signature, total_amount, transaction_uuid, product_code });
}
