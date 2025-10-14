import {Geist, Geist_Mono} from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Flashcards",
    description: 'Studia diritto con flashcards interattive',
};

export default function RootLayout({children}) {
    return (
        <html lang="it">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 4000,
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
            }}
        />
        {children}
        <Footer/>
        </body>
        </html>
    );
}
