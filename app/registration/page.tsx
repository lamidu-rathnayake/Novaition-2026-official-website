'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import QRCode from 'qrcode';
import { pdf, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Register a nice font if needed, otherwise use Helvetica/standard
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Helvetica',
    },
    ticketContainer: {
        width: 400,
        backgroundColor: '#ffffff',
        border: '2pt solid #1f2937',
        borderRadius: 8,
        padding: 24,
        position: 'relative',
    },
    header: {
        borderBottom: '2pt dashed #d1d5db',
        marginBottom: 16,
        paddingBottom: 8,
        alignItems: 'center',
    },
    title: {
        color: '#1f2937',
        fontSize: 24,
        fontWeight: 'extrabold', // Helvetica doesn't support 900 perfectly without registering, using bold
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    subtitle: {
        color: '#6b7280',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 4,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        color: '#9ca3af',
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        color: '#1f2937',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    qrContainer: {
        backgroundColor: '#f9fafb',
        border: '1pt solid #f3f4f6',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrCode: {
        width: 150,
        height: 150,
    },
    footer: {
        marginTop: 16,
        paddingTop: 8,
        borderTop: '1pt solid #e5e7eb',
        alignItems: 'center',
    },
    footerText: {
        color: '#9ca3af',
        fontSize: 10,
        fontStyle: 'italic',
    },
});

const TicketPDF = ({ userData, userId, qrDataUrl }: { userData: UserData, userId: string, qrDataUrl: string }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.ticketContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Event Ticket</Text>
                    <Text style={styles.subtitle}>ADMIT ONE</Text>
                </View>

                <View style={styles.fieldContainer}>
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{userData.name || "Guest"}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>University</Text>
                        <Text style={styles.value}>{userData.university || "Unknown"}</Text>
                    </View>
                </View>

                <View style={styles.qrContainer}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image src={qrDataUrl} style={styles.qrCode} />
                    <Text style={{ ...styles.subtitle, fontFamily: 'Courier' }}>ID: {userId}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Please present this ticket at the entrance.</Text>
                </View>
            </View>
        </Page>
    </Document>
);


type Message = {
    text: string;
    sender: 'chatbot' | 'user';
};

type UserData = {
    name?: string;
    email?: string;
    phone?: string;
    university?: string;
    nic?: string;
    uniqueId?: string;
    attend?: string;
};

type ChatbotProps = {
    onClose?: () => void;
};



const questions = [
    "Hey there! What's your name?",
    "Nice to meet you! What's the best email address for us to reach you at?",
    "Enter your Whatapp Number",
    "What is your university?",
    "Tell me your NIC too"
];

export default function Chatbot({ onClose }: ChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState<UserData>({});
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Initial greeting
        const timer = setTimeout(() => {
            setMessages([{ text: questions[0], sender: 'chatbot' }]);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (userId) {
            // Generate QR Code once we have the User ID
            const timer = setTimeout(() => {
                const canvas = document.getElementById('qr-canvas');
                if (canvas) {
                    QRCode.toCanvas(canvas, userId, { width: 200 }, function (error: unknown) {
                        if (error) console.error(error);
                    });
                }
            }, 100); // slight delay to ensure DOM is ready
            return () => clearTimeout(timer);
        }
    }, [userId]);

    const addBotMessage = (text: string) => {
        setTimeout(() => {
            setMessages(prev => [...prev, { text, sender: 'chatbot' }]);
        }, 800);
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        const userText = inputValue.trim();

        setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
        setInputValue('');

        switch (step) {
            case 0: // Name
                if (userText.length > 1) {
                    setUserData(prev => ({ ...prev, name: userText }));
                    setStep(prev => prev + 1);
                    addBotMessage(questions[1]);
                } else {
                    addBotMessage("Please enter a valid name.");
                }
                break;

            case 1: // Email
                if (/\S+@\S+\.\S+/.test(userText)) {
                    // Check if email exists
                    try {
                        const res = await fetch('/api/check-email1', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: userText })
                        });
                        const data = await res.json();

                        if (data.exists) {
                            addBotMessage("This email is already registered. Please use a different email.");
                        } else {
                            setUserData(prev => ({ ...prev, email: userText }));
                            setStep(prev => prev + 1);
                            addBotMessage(questions[2]);
                        }
                    } catch (error) {
                        console.error("Error checking email:", error);
                        addBotMessage("Sorry, I couldn't verify that email. Please try again.");
                    }
                } else {
                    addBotMessage("That doesn't look like a valid email. Please try again.");
                }
                break;

            case 2:
                if (userText.length >= 10 && /^\d+$/.test(userText)) {
                    setUserData(prev => {
                        return ({ ...prev, phone: userText });
                    });
                    setStep(prev => prev + 1);
                    addBotMessage(questions[3]);
                } else {
                    addBotMessage("Please enter a valid Mobile number.");
                }
                break;

            case 3: // University
                if (userText.length > 2) {
                    setUserData(prev => ({ ...prev, university: userText }));
                    setStep(prev => prev + 1);
                    addBotMessage(questions[4]);
                } else {
                    addBotMessage("Please enter a valid university name.");
                }
                break;

            case 4: // NIC
                if (userText.length >= 10) {
                    // Check ID first
                    try {
                        const res = await fetch('/api/check-id2', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: userText }),
                        });
                        const idCheckData = await res.json();

                        if (idCheckData.exists) {
                            addBotMessage("This NIC is already registered. Please use a different one.");
                            return;
                        }

                        const finalData = { ...userData, nic: userText, attend: "0" };
                        setUserData(finalData);
                        setIsInputDisabled(true);

                        // Send data to backend
                        try {
                            const response = await fetch('/api/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(finalData)
                            });
                            const registerData = await response.json();

                            if (registerData.success) {
                                addBotMessage("Great! Email is processing...");
                                if (registerData.userId) {
                                    setUserId(registerData.userId);
                                }

                            } else {
                                addBotMessage(`Error: ${registerData.message}`);
                                setIsInputDisabled(false);
                            }
                        } catch (error) {
                            console.error('Network error:', error);
                            addBotMessage("Sorry, something went wrong. Please try again.");
                            setIsInputDisabled(false);
                        }
                    } catch (error) {
                        console.error("Error checking NIC:", error);
                        addBotMessage("Error verifying NIC. Please try again.");
                    }
                } else {
                    addBotMessage("Please enter a valid NIC.");
                }
                break;
        }
    };



    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const downloadTicket = async () => {
        if (!userId) return;
        try {
            // Generate QR Code Data URL
            const qrDataUrl = await QRCode.toDataURL(userId, { width: 300, margin: 1 });

            const blob = await pdf(
                <TicketPDF userData={userData} userId={userId} qrDataUrl={qrDataUrl} />
            ).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ticket-${userData.name?.replace(/\s+/g, '_') || 'event'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("Failed to generate PDF ticket. Please try again.");
        }
    };

    return (
        <>
            {/* Main Chat Interface */}
            <div className={`chat-container ${userId ? 'opacity-0 pointer-events-none' : ''}`}>
                {/* Hide chat when ticket is shown to avoid double scrollbars/confusion, 
                or just keep it visible behind. Let's hide it visually or use the overlay to cover it. 
                Actually, simpler: Just keep chat-container structured as is, and render the overlay as a sibling if userId exists.
             */}
                <div className="chat-header">
                    <h3>Register with us!</h3>
                    {onClose && (
                        <button onClick={onClose} className="close-btn" aria-label="Close">
                            &times;
                        </button>
                    )}
                </div>

                <div className="chat-messages" id="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'chatbot' ? 'chatbot-message' : 'user-message'}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type={step === 2 ? "tel" : "text"}
                        id="user-input"
                        placeholder={isInputDisabled ? "Processing..." : "Type your answer..."}
                        autoFocus
                        value={inputValue}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (step === 2) {
                                // Phone: Numbers only
                                if (/^\d*$/.test(val)) {
                                    setInputValue(val);
                                }
                            } else if (step === 0) {
                                // Name: Text and dots only
                                if (/^[a-zA-Z\s.]*$/.test(val)) {
                                    setInputValue(val);
                                }
                            } else {
                                setInputValue(val);
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={isInputDisabled}
                    />
                    <button id="send-btn" onClick={handleSend} disabled={isInputDisabled}>Send</button>
                </div>
            </div>

            {/* Fullscreen Ticket Overlay */}
            {userId && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    overflowY: 'auto' // Allow scrolling
                }}>
                    <div className="w-full max-w-sm bg-white rounded-lg p-4 shadow-2xl animate-in fade-in zoom-in duration-300 m-auto">
                        <h2 className="text-xl font-bold text-green-600 text-center mb-6">Registration Successful!</h2>


                        {/* Ticket Design */}
                        <div id="ticket-container" style={{
                            backgroundColor: '#ffffff',
                            border: '2px solid #1f2937',
                            borderRadius: '0.5rem',
                            padding: '1.5rem',
                            width: '100%',
                            maxWidth: '24rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            position: 'relative',
                            overflow: 'hidden',
                            fontFamily: 'sans-serif'
                        }}>
                            {/* Decorative Circles for Ticket Look */}
                            <div style={{ backgroundColor: '#f3f4f6', position: 'absolute', top: '50%', left: '-0.75rem', width: '1.5rem', height: '1.5rem', borderRadius: '50%' }}></div>
                            <div style={{ backgroundColor: '#f3f4f6', position: 'absolute', top: '50%', right: '-0.75rem', width: '1.5rem', height: '1.5rem', borderRadius: '50%' }}></div>

                            <div style={{ borderBottom: '2px dashed #d1d5db', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                                <h1 style={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '900', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Event Ticket</h1>
                                <p style={{ color: '#6b7280', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.25rem', margin: 0 }}>ADMIT ONE</p>
                            </div>

                            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#9ca3af', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Name</span>
                                    <p style={{ color: '#1f2937', fontSize: '1.125rem', fontWeight: 'bold', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userData.name || "Guest"}</p>
                                </div>
                                <div>
                                    <span style={{ color: '#9ca3af', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>University</span>
                                    <p style={{ color: '#374151', fontWeight: '500', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userData.university || "Unknown"}</p>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '0.5rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <canvas id="qr-canvas"></canvas>
                                <p style={{ color: '#9ca3af', fontSize: '10px', marginTop: '0.5rem', fontFamily: 'monospace', margin: 0 }}>ID: {userId}</p>
                            </div>

                            <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                                <p style={{ color: '#9ca3af', fontSize: '0.75rem', fontStyle: 'italic', margin: 0 }}>Please present this ticket at the entrance.</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 mt-6 w-full">
                        <button
                            onClick={downloadTicket}
                            className="bg-black text-white w-full py-3 rounded-full font-bold shadow-lg hover:scale-[1.02] transition-transform"
                        >
                            Download Ticket
                        </button>
                        <button
                            onClick={() => onClose ? onClose() : router.push('/main')}
                            className="text-gray-500 underline text-sm hover:text-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
