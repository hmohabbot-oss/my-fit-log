"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, ArrowDown } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const handleScrollToLibrary = () => {
    const element = document.getElementById("library");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* ১. হিরো / ব্যানার সেকশন */}
      <section className="bg-[#12161f] border border-gray-800/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-5">
          <span className="text-xs font-bold tracking-widest text-[#ccff00] uppercase">
            Workout Library
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Train with intent. <br /> Log every set.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div>
            <button
              onClick={handleScrollToLibrary}
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-xl hover:bg-[#b8e600] transition-colors cursor-pointer text-sm tracking-wide"
            >
              BROWSE WORKOUTS
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ডানদিকের ব্যানার ইমেজ */}
        <div className="w-full max-w-sm flex justify-center">
          <Image
            src="/banner.png"
            alt="Workout Banner"
            width={380}
            height={380}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* ২. The Library সেকশন */}
      <section id="library" className="space-y-6 pt-4">
        <div>
          <h2 className="text-2xl font-black uppercase text-white tracking-wider">
            THE LIBRARY
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#141822] h-80 rounded-2xl animate-pulse border border-gray-800/60" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => {
              const categories = workout.muscleGroups || workout.category || [];
              const calories = workout.caloriesBurned ?? workout.calories ?? 0;

              return (
                /* পুরো কার্ডটি এখন একটি Link হিসেবে কাজ করবে */
                <Link
                  key={workout.id}
                  href={`/workout/${workout.id}`}
                  className="bg-[#141822] border border-gray-800/70 hover:border-gray-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 group cursor-pointer block"
                >
                  {/* ইমেজ */}
                  <div className="relative h-48 w-full bg-[#1b212f] flex items-center justify-center overflow-hidden">
                    <Image
                      src={workout.image || "/banner.png"}
                      alt={workout.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  {/* কার্ড কনটেন্ট */}
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      {/* ক্যাটাগরি / বডি পার্টস ব্যাজ */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-extrabold text-white text-base tracking-wide uppercase line-clamp-1 group-hover:text-[#ccff00] transition-colors">
                        {workout.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {workout.equipment}
                      </p>
                    </div>

                    {/* স্ট্যাটাস রো (Figma অনুযায়ী শুধুমাত্র ৩টি স্ট্যাট থাকবে, আলাদা বাটন ছাড়া) */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-800/70 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Flame className="w-3.5 h-3.5 text-gray-400" />
                        {calories} kcal
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Star className="w-3.5 h-3.5 text-gray-400" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}