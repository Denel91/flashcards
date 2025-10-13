import {Geist, Geist_Mono} from "next/font/google";
import Footer from "@/components/Footer";
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
        {children}
        <Footer/>
        </body>
        </html>
    );
}
