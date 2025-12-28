'use client';

import { useState } from 'react';

export default function OrderForm() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        id: '',
        clothType: '',
        amount: '',
        paymentStatus: 'Pending',
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isEmailTaken, setIsEmailTaken] = useState<boolean | null>(null);
    const [checkingEmail, setCheckingEmail] = useState(false);
    const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);
    const [checkingId, setCheckingId] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            // Clear any previous error messages when a user selects a file
            setMessage('');
        }
    };

    const checkEmail = async (email: string) => {
        if (!email) {
            setIsEmailTaken(null);
            return;
        }

        // Regex validation requested by user
        const isValidFormat = /\S+@\S+\.\S+/.test(email);
        if (!isValidFormat) {
            // If format is invalid, we don't need to check DB. 
            // We can treat it as "not taken" (null) or handle error differently.
            // For now, let's just return to avoid DB call.
            setIsEmailTaken(null);
            return;
        }

        setCheckingEmail(true);
        try {
            const res = await fetch('/api/check-email2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsEmailTaken(Boolean(data.exists));
            } else {
                setIsEmailTaken(null);
            }
        } catch (err) {
            console.error('Email check failed', err);
            setIsEmailTaken(null);
        } finally {
            setCheckingEmail(false);
        }
    };

    const checkId = async (id: string) => {
        if (!id) {
            setIsIdTaken(null);
            return;
        }
        setCheckingId(true);
        try {
            const res = await fetch('/api/check-id2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsIdTaken(Boolean(data.exists));
            } else {
                setIsIdTaken(null);
            }
        } catch (err) {
            console.error('ID check failed', err);
            setIsIdTaken(null);
        } finally {
            setCheckingId(false);
        }
    };

    // ... (Keep your uploadImageToGCS function from the previous step here) ...
    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload image');
        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- VALIDATION LOGIC ---
        // Prevent submission if email is already associated with an order
        if (isEmailTaken) {
            setMessage('This email is already associated with an existing order.');
            return;
        }

        if (isIdTaken) {
            setMessage('This NIC is already associated with an existing order.');
            return;
        }

        // If email check is still running, ask user to wait
        if (checkingEmail) {
            setMessage('Still verifying email — please wait a moment.');
            return;
        }

        if (checkingId) {
            setMessage('Still verifying NIC — please wait a moment.');
            return;
        }

        if (!image) {
            setMessage('Error: You must upload a payment receipt image.');
            return; // Stop here! Do not proceed to upload or submit.
        }

        setLoading(true);
        setMessage('');

        try {
            // 1. Upload Image (Now guaranteed to exist)
            const imagePath = await uploadImageToCloudinary(image);

            // 2. Submit Data
            const response = await fetch('/api/submit-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    imageUrl: imagePath,
                    // Optional: include a client-side timestamp for immediate UI feedback
                    clientTimestamp: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Show immediate local time to the user; server stores authoritative createdAt
                const localTime = new Date().toLocaleString();
                setMessage(`Order placed successfully at ${localTime}`);
                setFormData({ name: '', phoneNumber: '', email: '', id: '', clothType: '', amount: '', paymentStatus: 'Pending' });
                setImage(null);
            } else {
                setMessage('Failed: ' + result.error);
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred during submission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-black">Place New Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... (Other inputs like Name, ClothType, Amount remain the same) ... */}

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black placeholder-gray-400 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black placeholder-gray-400 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => { if (isEmailTaken) setIsEmailTaken(null); handleInputChange(e); }}
                        onBlur={(e) => checkEmail(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black placeholder-gray-400 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />

                    {checkingEmail && <p className="text-sm text-gray-500 mt-1">Checking email...</p>}
                    {isEmailTaken && !checkingEmail && (
                        <p className="text-sm text-red-400 mt-1">This email is already associated with an order.</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">NIC</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={(e) => { if (isIdTaken) setIsIdTaken(null); handleInputChange(e); }}
                        onBlur={(e) => checkId(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black placeholder-gray-400 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {checkingId && <p className="text-sm text-gray-500 mt-1">Checking NIC...</p>}
                    {isIdTaken && !checkingId && (
                        <p className="text-sm text-red-400 mt-1">This NIC is already associated with an order.</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">Cloth Type</label>
                    <input type="text" name="clothType" value={formData.clothType} onChange={handleInputChange} required
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black placeholder-gray-400 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">Amount</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black placeholder-gray-400 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">Payment Status</label>
                    <select name="paymentStatus" value={formData.paymentStatus} onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-white/20 bg-white/5 text-black shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [&>option]:bg-gray-800 [&>option]:text-white">
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>

                {/* File Upload Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">Reference Image <span className="text-red-400">*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required // HTML5 Validation: Browser won't let you submit without this
                        className="mt-1 block w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-black hover:file:bg-blue-700 cursor-pointer"
                    />
                </div>

                <button type="submit" disabled={loading || checkingEmail || isEmailTaken === true || checkingId || isIdTaken === true}
                    className="w-full py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-black bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed transform transition hover:scale-[1.02]">
                    {loading ? 'Processing...' : 'Submit Order'}
                </button>

                {message && <p className={`mt-2 text-center text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
            </form>
        </div>
    );
}