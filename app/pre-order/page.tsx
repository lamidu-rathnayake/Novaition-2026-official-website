'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone) ? null : 'Phone number must be 10 digits and start with 07 (e.g., 07XXXXXXXX)';
};

const validateNIC = (nic: string) => {
    // Old NIC: 9 digits + V/X (case insensitive)
    // New NIC: 12 digits
    const oldNicRegex = /^\d{9}[vVxX]$/;
    const newNicRegex = /^\d{12}$/;

    if (oldNicRegex.test(nic) || newNicRegex.test(nic)) {
        return null;
    }
    return 'Invalid NIC format (e.g., 123456789V or 199912345678)';
};

const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Please enter a valid email address';
};

export default function OrderForm() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        email: '',
        id: '',
        clothType: '',
        // Initialize amount as string to allow empty state control
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
    const [isClothTypeOpen, setIsClothTypeOpen] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = null;

        if (name === 'phoneNumber') {
            error = validatePhoneNumber(value);
        } else if (name === 'id') {
            error = validateNIC(value);
        } else if (name === 'email') {
            error = validateEmailFormat(value);
            if (!error) checkEmail(value); // Only check availability if format is valid
        } else if (name === 'id') { // Redundant but keeping structure if needed for others
            if (!validateNIC(value)) checkId(value);
        }

        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setMessage('');
            // Clear image error
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.image;
                return newErrors;
            });
        }
    };

    const checkEmail = async (email: string) => {
        if (!email) {
            setIsEmailTaken(null);
            return;
        }

        const error = validateEmailFormat(email);
        if (error) {
            setIsEmailTaken(null);
            return; // let handleBlur set the error message
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

        // Run all validations
        const phoneError = validatePhoneNumber(formData.phoneNumber);
        const nicError = validateNIC(formData.id);
        const emailError = validateEmailFormat(formData.email);

        const newErrors: { [key: string]: string } = {};
        if (phoneError) newErrors.phoneNumber = phoneError;
        if (nicError) newErrors.id = nicError;
        if (emailError) newErrors.email = emailError;

        // Required field validations
        if (!formData.name.trim()) newErrors.name = 'Full Name is required';
        if (!formData.address.trim()) newErrors.address = 'Delivery Address is required';
        if (!formData.clothType) newErrors.clothType = 'Please select a cloth size';
        if (!formData.amount || parseInt(formData.amount) < 1) newErrors.amount = 'Quantity must be at least 1';
        if (!image) newErrors.image = 'Payment receipt image is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setMessage('Please fix the errors in the form before submitting.');
            return;
        }

        if (isEmailTaken) {
            setMessage('This email is already associated with an existing order.');
            return;
        }

        if (isIdTaken) {
            setMessage('This NIC is already associated with an existing order.');
            return;
        }

        if (checkingEmail || checkingId) {
            setMessage('Still verifying details — please wait a moment.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const imagePath = await uploadImageToCloudinary(image!);

            const response = await fetch('/api/submit-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    imageUrl: imagePath,
                    clientTimestamp: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (result.success) {
                const localTime = new Date().toLocaleString();
                setMessage(`Order placed successfully at ${localTime}`);
                setFormData({ name: '', phoneNumber: '', address: '', email: '', id: '', clothType: '', amount: '', paymentStatus: 'Pending' });
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
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center py-20 px-4 md:px-0">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-lime/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] opacity-20"></div>
            </div>


            <div className="relative z-10 w-full max-w-6xl page-container">

                {/* Header Section */}
                <div className="text-center mb-12 flex flex-col items-center">
                    <div className="relative w-48 h-24 mb-6">
                        <Image
                            src="/navbar-logo.png"
                            alt="Novaition Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    {/* Changed font-display to font-sans */}
                    <h1 className="text-5xl md:text-7xl font-bold font-sans uppercase tracking-wider text-white drop-shadow-sm mb-4">
                        Pre-Order Now
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl mx-auto">
                        Secure your exclusive merchandise. Fill out the details below to complete your order.
                    </p>
                </div>


                <div className="bg-muted backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Personal Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Name */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your name"
                                    /* Changed font-display to font-sans */
                                    className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 font-sans ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'}`}
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                    placeholder="07XXXXXXXX"
                                    /* Changed font-display to font-sans */
                                    className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 font-sans ${errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'}`}
                                />
                                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phoneNumber}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => { if (isEmailTaken) setIsEmailTaken(null); handleInputChange(e); }}
                                        onBlur={(e) => { handleBlur(e); }}
                                        required
                                        placeholder="you@example.com"
                                        /* Changed font-display to font-sans */
                                        className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 font-sans ${errors.email || isEmailTaken ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'
                                            }`}
                                    />
                                    {checkingEmail && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 animate-pulse">Checking...</span>}
                                </div>
                                {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                                {isEmailTaken && <p className="text-xs text-red-500 mt-1 ml-1">Email already in use.</p>}
                            </div>

                            {/* NIC */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">NIC Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="id"
                                        value={formData.id}
                                        onChange={(e) => { if (isIdTaken) setIsIdTaken(null); handleInputChange(e); }}
                                        onBlur={(e) => { handleBlur(e); if (!validateNIC(e.target.value)) checkId(e.target.value); }}
                                        required
                                        placeholder="National ID"
                                        /* Changed font-display to font-sans */
                                        className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 font-sans ${errors.id || isIdTaken ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'
                                            }`}
                                    />
                                    {checkingId && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 animate-pulse">Checking...</span>}
                                </div>
                                {errors.id && <p className="text-xs text-red-500 mt-1 ml-1">{errors.id}</p>}
                                {isIdTaken && <p className="text-xs text-red-500 mt-1 ml-1">NIC already used.</p>}
                            </div>

                        </div>

                        {/* Address - Full width */}
                        <div className="space-y-2">
                            {/* Changed font-display to font-sans */}
                            <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Delivery Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                placeholder="Your full delivery address"
                                /* Changed font-display to font-sans */
                                className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 resize-none font-sans ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'}`}
                            />
                            {errors.address && <p className="text-xs text-red-500 mt-1 ml-1">{errors.address}</p>}
                        </div>


                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">

                            {/* Cloth Type */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Cloth Type</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsClothTypeOpen(!isClothTypeOpen)}
                                        /* Changed font-display to font-sans */
                                        className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-1 transition-all duration-300 font-sans text-left flex justify-between items-center ${errors.clothType ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'}`}
                                    >
                                        <span className={formData.clothType ? "text-white" : "text-gray-500"}>
                                            {formData.clothType || "Select Size"}
                                        </span>
                                        <svg className={`w-5 h-5 transition-transform duration-300 ${isClothTypeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isClothTypeOpen && (
                                        <div className="absolute z-50 w-full mt-2 bg-near-black border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl">
                                            {["Small", "Medium", "Large", "Extra Large"].map((size) => (
                                                <div
                                                    key={size}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, clothType: size }));
                                                        setIsClothTypeOpen(false);
                                                        // Clear error
                                                        setErrors(prev => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.clothType;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    /* Changed font-display to font-sans */
                                                    className="px-4 py-3 text-white text-lg hover:bg-primary hover:text-black transition-colors duration-200 cursor-pointer font-sans"
                                                >
                                                    {size}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.clothType && <p className="text-xs text-red-500 mt-1 ml-1">{errors.clothType}</p>}
                            </div>

                            {/* Amount */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Quantity</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                    required
                                    min="1"
                                    placeholder="1"
                                    /* Changed font-display to font-sans */
                                    className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 font-sans ${errors.amount ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-lime focus:ring-lime'}`}
                                />
                                {errors.amount && <p className="text-xs text-red-500 mt-1 ml-1">{errors.amount}</p>}
                            </div>

                            {/* Reference Image */}
                            <div className="space-y-2">
                                {/* Changed font-display to font-sans */}
                                <label className="text-sm uppercase tracking-widest text-lime font-bold ml-1 font-sans">Payment Receipt</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                        /* Changed font-display to font-sans */
                                        className={`w-full bg-black/40 text-base text-gray-400 tracking-wider file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:text-black file:bg-primary hover:file:bg-white file:transition-colors file:cursor-pointer cursor-pointer border rounded-xl p-2 font-sans ${errors.image ? 'border-red-500' : 'border-white/10'}`}
                                    />
                                    {errors.image && <p className="text-xs text-red-500 mt-1 ml-1">{errors.image}</p>}
                                </div>
                            </div>

                        </div>

                        {/* Submit Actions */}
                        <div className="pt-8 flex flex-col items-center gap-4">
                            <button
                                type="submit"
                                disabled={loading || checkingEmail || isEmailTaken === true || checkingId || isIdTaken === true}
                                /* Changed font-display to font-sans */
                                className="w-full md:w-auto px-12 py-4 bg-lime text-black font-bold uppercase tracking-widest text-lg rounded-full bg-primary hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(191,237,7,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-sans"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing
                                    </span>
                                ) : 'Confirm Order'}
                            </button>

                            {message && (
                                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {message}
                                </div>
                            )}

                            <div className="mt-4">
                                <Link href="/" className="text-gray-500 hover:text-lime transition-colors text-sm uppercase tracking-wider border-b border-transparent hover:border-lime pb-1">
                                    Return to Home
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}