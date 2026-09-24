"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown, Dumbbell } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan"); // "plan" or "saved"
  const [sortBy, setSortBy] = useState("Duration");

  const {
    todayPlan,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    toggleMarkAsDone,
  } = useWorkout();

  // অ্যাক্টিভ ট্যাবের ডেটা
  const currentList = activeTab === "plan" ? todayPlan : savedWorkouts;

  // ডায়নামিক স্ট্যাটাস মেট্রিক্স ক্যালকুলেশন
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned ?? curr.calories) || 0),
    0
  );

  // সর্টিং লজিক
  const sortedList = [...currentList].sort((a, b) => {
    const durA = Number(a.duration) || 0;
    const durB = Number(b.duration) || 0;
    const calA = Number(a.caloriesBurned ?? a.calories) || 0;
    const calB = Number(b.caloriesBurned ?? b.calories) || 0;
    const ratA = Number(a.rating) || 0;
    const ratB = Number(b.rating) || 0;

    if (sortBy === "Duration") return durB - durA;
    if (sortBy === "Calories") return calB - calA;
    if (sortBy === "Rating") return ratB - ratA;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* হেডার */}
      <div>
        <h1 className="text-3xl font-black uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* ১. ডায়নামিক মেট্রিক্স কার্ড (Top Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#12161f] border border-gray-800/80 rounded-2xl p-6 sm:p-8">
        <div>
          <span className="text-xs font-semibold text-gray-400 block mb-1">
            Exercises
          </span>
          <span className="text-4xl font-black text-[#ccff00]">
            {totalExercises}
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 block mb-1">
            Minutes
          </span>
          <span className="text-4xl font-black text-white">
            {totalMinutes}
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 block mb-1">
            Calories
          </span>
          <span className="text-4xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* ২. ট্যাব ও Sort By ড্রপডাউন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* ট্যাব সুইচিং */}
        <div className="bg-[#12161f] p-1 rounded-xl border border-gray-800/80 inline-flex w-fit">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "plan"
                ? "bg-[#1f2937] text-white shadow"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "saved"
                ? "bg-[#1f2937] text-white shadow"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By ড্রপডাউন */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-gray-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#12161f] border border-gray-800/80 text-xs text-white rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-gray-600 cursor-pointer font-semibold"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ৩. লিস্ট অথবা এম্পটি স্টেট */}
      {sortedList.length === 0 ? (
        <div className="bg-[#12161f] border border-dashed border-gray-800 rounded-3xl py-24 px-4 text-center space-y-4">
          <Dumbbell className="w-12 h-12 text-gray-600 mx-auto stroke-1" />
          <h2 className="text-lg font-black uppercase text-white tracking-wider">
            NOTHING HERE YET
          </h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-extrabold text-xs px-6 py-2.5 rounded-full hover:bg-[#b8e600] transition-colors uppercase tracking-wider"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout) => {
            const calories = workout.caloriesBurned ?? workout.calories ?? 0;

            return (
              <div
                key={workout.id}
                className={`bg-[#12161f] border ${workout.done
                    ? "border-green-800/60 bg-[#121c1f]"
                    : "border-gray-800/80"
                  } rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all`}
              >
                {/* লেফট সাইড: থাম্বনেইল ও ইনফো */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-20 h-16 sm:w-24 sm:h-20 bg-[#1b212f] rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={workout.image || "/banner.png"}
                      alt={workout.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1">
                    <h3
                      className={`font-black uppercase text-sm sm:text-base ${workout.done
                          ? "line-through text-gray-500"
                          : "text-white"
                        }`}
                    >
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-400">{workout.equipment}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />{" "}
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Flame className="w-3.5 h-3.5 text-gray-400" />{" "}
                        {calories} kcal
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Star className="w-3.5 h-3.5 text-gray-400" />{" "}
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* রাইট সাইড: অ্যাকশন বাটনসমূহ */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="bg-[#1f2937] hover:bg-gray-700 text-xs font-semibold px-4 py-2 rounded-lg text-gray-200 transition-colors"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done বাটন (শুধুমাত্র Today's Plan ট্যাবে থাকবে) */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => toggleMarkAsDone(workout.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer ${workout.done
                          ? "bg-green-700 text-white"
                          : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                        }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      {workout.done ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  {/* Remove (X) বাটন */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}