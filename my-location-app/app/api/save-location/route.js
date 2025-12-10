import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { name, latitude, longitude } = await req.json();

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        await db.collection("locations").insertOne({
            name,
            latitude,
            longitude,
            timestamp: new Date(),
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error("API Error:", err);
        return Response.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
