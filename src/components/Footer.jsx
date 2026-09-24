import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0d13] border-t border-gray-800/60 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog Logo" width={22} height={22} className="object-contain" />
          <span className="font-extrabold text-sm tracking-wider text-white">FITLOG</span>
        </div>
        <p className="text-xs text-gray-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}