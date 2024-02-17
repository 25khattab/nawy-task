import { connectDB } from "@/utility/connect-db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function GET() {
  const db = await connectDB();
  const data = await db.collection("apartment").find().toArray();
  return Response.json(data);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const schema = z.object({
    price: z.number().min(1),
    bathrooms: z.number().min(1),
    bedrooms: z.number().min(1),
    apartmentArea: z.number().min(1),
    location: z.object({
      longitude: z.number(),
      latitude: z.number(),
      area: z.string().min(1),
      city: z.string().min(1),
    }),
  });

  const response = schema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json(
      { error: { message: "Invalid request", errors } },
      { status: 400 }
    );
  }
  const db = await connectDB();
  const data = await db.collection("apartment").insertOne(body);
  return Response.json(data);
}
