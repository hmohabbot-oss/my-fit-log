"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Bookmark } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToTodayPlan, addToSaved, todayPlan, savedWorkouts } = useWorkout();

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error("Failed to load workout details:", err);
      } finally {
        setLoading(false);
      }
    }
    getDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00]" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Workout not found</h2>
        <Link href="/" className="text-[#ccff00] hover:underline text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to library
        </Link>
      </div>
    );
  }

  const isInPlan = todayPlan.some((item) => item.id === workout.id);
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to workouts
      </Link>

      <div className="bg-[#12161f] border border-gray-800/80 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* বাঁয়ের কলাম: ইমেজ */}
        <div className="relative w-full h-80 sm:h-[450px] bg-[#1a202c] rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* ডানের কলাম: বিবরণ ও স্পেক্স */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-black uppercase text-white tracking-wide">
              {workout.name}
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              {workout.description}
            </p>

            {/* ক্যাটাগরি */}
            <div className="flex flex-wrap gap-2">
              {workout.category?.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#243314] text-[#ccff00] text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* কী-স্পেক্স টেবিল */}
            <div className="bg-[#181d29] rounded-xl p-4 border border-gray-800/80 divide-y divide-gray-800/80 text-xs">
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Equipment</span><span className="font-semibold text-white">{workout.equipment}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Difficulty</span><span className="font-semibold text-white">{workout.difficulty || "Intermediate"}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Sets</span><span className="font-semibold text-white">{workout.sets || 4}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Reps</span><span className="font-semibold text-white">{workout.reps || "6-8"}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Duration</span><span className="font-semibold text-white">{workout.duration} min</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Calories</span><span className="font-semibold text-white">{workout.calories} kcal</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 uppercase">Rating</span><span className="font-semibold text-white">{workout.rating}</span></div>
            </div>

            {/* ইনস্ট্রাকশন */}
            {workout.instructions && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-black uppercase text-white tracking-wider">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                  {Array.isArray(workout.instructions)
                    ? workout.instructions.map((step, i) => <li key={i}>{step}</li>)
                    : <li>{workout.instructions}</li>}
                </ol>
              </div>
            )}
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => addToTodayPlan(workout)}
              disabled={isInPlan}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${isInPlan
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                }`}
            >
              <PlusCircle className="w-4 h-4" />
              {isInPlan ? "In Today's Plan" : "Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isSaved}
              className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${isSaved
                  ? "border-gray-800 text-gray-600 cursor-not-allowed"
                  : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Bookmark className="w-4 h-4" />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}