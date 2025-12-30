import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID is required" },
                { status: 400 }
            );
        }
        // Check in 'orders' collection (or wherever you store users)
        const usersRef = collection(db, "orders");
        const q = query(usersRef, where("id", "==", id)); // Assuming 'id' is the field name in DB
        const snapshot = await getDocs(q);
        return NextResponse.json({
            success: true,
            exists: !snapshot.empty
        });
    } catch (error) {
        console.error("Error checking ID:", error);
        return NextResponse.json(
            { success: false, message: "Failed to check ID" },
            { status: 500 }
        );
    }
}