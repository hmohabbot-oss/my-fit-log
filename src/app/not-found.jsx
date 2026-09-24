import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <Dumbbell className="w-16 h-16 text-[#ccff00] animate-bounce" />
      <h1 className="text-6xl font-black text-white">404</h1>
      <h2 className="text-xl font-bold uppercase tracking-wide text-gray-200">
        Page Not Found
      </h2>
      <p className="text-sm text-gray-400 max-w-sm">
        The workout routine or page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 bg-[#ccff00] text-black font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-[#b8e600] transition-colors uppercase tracking-wider"
      >
        Back to Library
      </Link>
    </div>
  );
}