import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library & Tracker",
  description: "A dark, no-nonsense gym companion to log your sets and track workout routines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0e14] text-gray-100 min-h-screen flex flex-col justify-between">
        <WorkoutProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#fff",
                border: "1px solid #374151",
              },
            }}
          />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}