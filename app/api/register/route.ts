import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, university, nic, attend } = body;

        // Basic Validation
        if (!name || !email || !university || !nic) {
            return NextResponse.json(
                { success: false, message: "All fields (Name, Email, University, NIC) are required." },
                { status: 400 }
            );
        }

        const usersRef = collection(db, "users");

        // Check for duplicate Email
        const emailQuery = query(usersRef, where("email", "==", email));
        const emailSnapshot = await getDocs(emailQuery);
        if (!emailSnapshot.empty) {
            return NextResponse.json(
                { success: false, message: "This email is already registered." },
                { status: 400 }
            );
        }

        // Check for duplicate NIC
        const nicQuery = query(usersRef, where("nic", "==", nic));
        const nicSnapshot = await getDocs(nicQuery);
        if (!nicSnapshot.empty) {
            return NextResponse.json(
                { success: false, message: "This NIC is already registered." },
                { status: 400 }
            );
        }

        // 1. Save to Firebase Firestore
        // add a 'createdAt' timestamp so we know when they registered
        const docRef = await addDoc(usersRef, {
            name,
            email,
            phone,
            university,
            nic,
            attend,
            createdAt: new Date().toISOString()
        });
        console.log("User saved with ID: ", docRef.id);

        // 2. Send Email via Resend
        // can use the user's name in the email body for a personal touch
        const emailData = await resend.emails.send({
            from: 'cit-24-02-0125@sltc.ac.lk', // Use the testing domain or your verified domain
            to: email,
            subject: 'Registration Confirmed!',
            html: `
        <h1>Welcome, ${name}!</h1>
        <p>You have successfully registered for the event.</p>
        <p><strong>University:</strong> ${university}</p>
        <p>We will see you there!</p>
      `
        });

        if (emailData.error) {
            console.error("Email failed:", emailData.error);
            // return success because the registration (DB save) worked
        }

        return NextResponse.json({
            success: true,
            message: "Registration and Email sent!",
            userId: docRef.id
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}