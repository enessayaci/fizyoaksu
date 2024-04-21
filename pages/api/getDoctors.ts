// pages/api/data.js
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
    try {
        const { db } = await connectToDatabase();
        const data = await db.collection("doctors").find({}).toArray(); // Modify as needed
        res.status(200).json(data);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
}
