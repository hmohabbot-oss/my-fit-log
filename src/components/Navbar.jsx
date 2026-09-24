"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = useWorkout();

  return (
    <header className="w-full bg-[#0d1117] border-b border-gray-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/*  */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} className="object-contain" priority />
          <span className="font-black text-xl tracking-wider text-white">FITLOG</span>
        </Link>

        {/*    */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === "/"
                ? "bg-[#1f2937] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === "/my-plan"
                ? "bg-[#1f2937] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
              }`}
          >
            My Plan
          </Link>
        </nav>

        {/*   (  /my-plan  ) */}
        <Link href="/my-plan" className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs">
              {todayPlan.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
            <span>Saved</span>
            <span className="border border-gray-600 text-gray-300 w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {savedWorkouts.length}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}