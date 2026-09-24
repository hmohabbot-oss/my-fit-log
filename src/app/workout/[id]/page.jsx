"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Bookmark, Check } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00]" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Workout not found</h2>
        <Link href="/" className="text-[#ccff00] hover:underline text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to library
        </Link>
      </div>
    );
  }

  const isInPlan = todayPlan.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));
  const categories = workout.muscleGroups || workout.category || [];
  const calories = workout.caloriesBurned ?? workout.calories ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to library
      </Link>

      <div className="bg-[#12161f] border border-gray-800/80 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/*  :  */}
        <div className="relative w-full h-80 sm:h-[480px] bg-[#1a202c] rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/*  :    */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-black uppercase text-white tracking-wide">
              {workout.name}
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              {workout.description}
            </p>

            {/*  /    */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* -  */}
            <div className="bg-[#181d29] rounded-xl p-4 border border-gray-800/80 divide-y divide-gray-800/80 text-xs mt-4">
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Equipment</span>
                <span className="font-semibold text-white">{workout.equipment}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Difficulty</span>
                <span className="font-semibold text-white">{workout.difficulty || "Intermediate"}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Sets</span>
                <span className="font-semibold text-white">{workout.sets || 4}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Reps</span>
                <span className="font-semibold text-white">{workout.reps || "6-8"}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Duration</span>
                <span className="font-semibold text-white">{workout.duration} min</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Calories</span>
                <span className="font-semibold text-white">{calories} kcal</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 uppercase font-medium">Rating</span>
                <span className="font-semibold text-white">{workout.rating}</span>
              </div>
            </div>

            {/*  */}
            {workout.instructions && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-black uppercase text-white tracking-wider">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-400 leading-relaxed">
                  {Array.isArray(workout.instructions)
                    ? workout.instructions.map((step, i) => <li key={i}>{step}</li>)
                    : <li>{workout.instructions}</li>}
                </ol>
              </div>
            )}
          </div>

          {/*   */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => addToTodayPlan(workout)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-[0.98]"
            >
              {isInPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Added to Today&apos;s Plan
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Add to today&apos;s plan
                </>
              )}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all cursor-pointer"
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