import Teams from '@/components/sections/Teams';
import Navbar from '@/components/layout/Navbar';

export default function TeamsPage() {
    return (
        <main className="w-full bg-black min-h-screen">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <Teams />
            </div>
        </main>
    );
}
