import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phoneNumber, email, id, clothType, amount, address, paymentStatus, imageUrl } = body;

        // Basic validation
        if (!name || !clothType || !amount || !address || !phoneNumber) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Save to Firebase Firestore
        const docRef = await addDoc(collection(db, 'orders'), {
            name,
            phoneNumber,
            email,
            id,
            clothType,
            amount,
            address,
            paymentStatus,
            imageUrl: imageUrl || 'No Image',
            // Use Firestore server timestamp for consistent, authoritative time
            createdAt: serverTimestamp(),
        });

        return NextResponse.json({ success: true, id: docRef.id });

    } catch (error) {
        console.error('Firestore Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save order' },
            { status: 500 }
        );
    }
}
