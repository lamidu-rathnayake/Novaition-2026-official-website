import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        const usersRef = collection(db, "orders");
        const q = query(usersRef, where("email", "==", email));
        const snapshot = await getDocs(q);

        return NextResponse.json({
            success: true,
            exists: !snapshot.empty
        });

    } catch (error) {
        console.error("Error checking email:", error);
        return NextResponse.json(
            { success: false, message: "Failed to check email" },
            { status: 500 }
        );
    }
}
