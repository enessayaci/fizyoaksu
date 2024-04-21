// pages/api/createRecord.js
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const data = req.body; // Data sent in POST request

        // Validation or transformation of data can be done here
        console.log("data: ", data);

      // Insert new record into the 'records' collection
      const response = await db.collection("events").insertOne(data);
       const insertedEvent: CalendarEventResponse = {
         _id: response.insertedId,
         ...data
       };
      // Send success response
      res.status(201).json({ message: "Record created", data: insertedEvent });
    } catch (error) {
      console.error("Database insertion error:", error);
      res.status(500).json({ message: "Failed to create record" });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
