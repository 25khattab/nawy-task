import { connectDB } from "@/utility/connect-db";
import { ObjectId } from "mongodb";
const password = process.env.db_passowrd as string;
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const db = await connectDB();
  const _id = new ObjectId(id);
  const data = await db
    .collection("apartment")
    .findOne({ _id })
  return Response.json(data);
}
