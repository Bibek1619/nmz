import { NextResponse } from "next/server";
import getMongoClient from '../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await getMongoClient();
    // ping the server
    await client.db().command({ ping: 1 });
    return NextResponse.json({ ok: true, message: 'MongoDB connected successfully' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
