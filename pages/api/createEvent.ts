// pages/api/createRecord.js
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const data = req.body; // Data sent in POST request

        // Validation or transformation of data can be done here
      console.log("data: ", data);
      
      const conflicts = await checkForEventConflicts(data.start, data.end)

      if (conflicts) {
        res.status(409).json({ message: "Record conflicts with others", data: conflicts });
        return
      }

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

async function checkForEventConflicts(newEventStart: Date, newEventEnd: Date) {
  const { db } = await connectToDatabase();
  const events = await db.collection('events').find({
    $and: [
      { start: { $lt: newEventEnd } },
      { end: { $gt: newEventStart } }
    ]
  }).toArray();

  if (events.length > 0) {
    console.log('Conflict detected with the following events:', events);
    return events; // There is a conflict
  } else {
    console.log('No conflicts detected.');
    return false; // No conflicts
  }
}

