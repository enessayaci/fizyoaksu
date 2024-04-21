// pages/api/data.js
import { connectToDatabase } from "../../../lib/mongodb";

export default async function getEventsWithDoctorId(req, res) {
  try 
  {
      const { doctorId } = req.query
      console.log("doctorId: ", doctorId);
    const { db } = await connectToDatabase();
      const data = await db.collection("events").find({ doctorId: doctorId }).toArray(); // Modify as needed
      console.log("data:  ", data);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
