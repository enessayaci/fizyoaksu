import { connectToDatabase } from "../../../lib/mongodb";

export default async function getEvents(req, res) {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("events").find({}).toArray(); // Modify as needed
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
